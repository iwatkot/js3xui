import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import ApiFields from './ApiFields.js';

/**
 * Base class for the XUI API. Contains common methods for making requests.
 */
class BaseApi {
    /**
     * Creates an instance of BaseApi.
     * @param {string} host - The host URL
     * @param {string} username - The username for authentication
     * @param {string} password - The password for authentication
     * @param {string|null} [token=null] - Optional authentication token
     * @param {boolean} [useTlsVerify=true] - Whether to verify TLS certificates
     * @param {string|null} [customCertificatePath=null] - Path to custom certificate
     * @param {*} [logger=null] - Optional logger instance
     * @param {CookieJar} [sharedCookieJar=null] - Optional shared cookie jar
     * @param {*} [sharedAxiosInstance=null] - Optional shared axios instance
     */
    constructor(
        host,
        username,
        password,
        token = null,
        useTlsVerify = true,
        customCertificatePath = null,
        logger = null,
        sharedCookieJar = null,
        sharedAxiosInstance = null
    ) {
        this._host = host.replace(/\/$/, ''); // Remove trailing slash
        this._username = username;
        this._password = password;
        this._token = token;
        this._useTlsVerify = useTlsVerify;
        this._customCertificatePath = customCertificatePath;
        this._maxRetries = 3;
        this.logger = logger || console; // Default to console if no logger provided
        
        // Use shared instances if provided, otherwise create new ones
        if (sharedCookieJar && sharedAxiosInstance) {
            this.cookieJar = sharedCookieJar;
            this.axiosInstance = sharedAxiosInstance;
        } else {
            // Initialize cookie jar for better cookie handling
            this.cookieJar = new CookieJar();
            this.axiosInstance = wrapper(axios.create({
                jar: this.cookieJar,
                withCredentials: true
            }));
        }
    }
    /**
     * Makes HTTP requests with automatic retry logic and error handling.
     * @param {string} method - HTTP method (GET, POST, etc.)
     * @param {string} url - Full URL to make the request to
     * @param {Object} [headers={}] - HTTP headers to include
     * @param {Object} [options={}] - Additional request options
     * @returns {Promise<Object>} Promise resolving to axios response object
     * @throws {Error} Throws error if request fails after all retries
     */
    async _requestWithRetry(method, url, headers = {}, options = {}) {
        this.logger.log(`${method.toUpperCase()} request to ${url}...`);
        
        for (let retry = 1; retry <= this._maxRetries; retry++) {
            try {
                const axiosConfig = {
                    method: method.toLowerCase(),
                    url: url,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        ...headers
                    },
                    httpsAgent: this._customCertificatePath ? 
                        new (await import('https')).Agent({ ca: this._customCertificatePath }) : 
                        undefined,
                    rejectUnauthorized: this._useTlsVerify,
                    timeout: 30000,
                    validateStatus: function (status) {
                        return status < 500; // Accept any status less than 500
                    },
                    jar: this.cookieJar,
                    withCredentials: true,
                    ...options
                };

                const response = await this.axiosInstance(axiosConfig);
                
                await this._checkResponse(response);
                return response;
                
            } catch (error) {
                // Create a cleaner error object instead of dumping the whole axios response
                const cleanError = {
                    message: error.message,
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    code: error.code
                };
                
                if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                    if (retry === this._maxRetries) {
                        const simpleError = new Error(`${error.code}: ${error.message}`);
                        simpleError.originalError = cleanError;
                        throw simpleError;
                    }
                    this.logger.warn(
                        `Request to ${url} failed: ${error.message}, retry ${retry} of ${this._maxRetries}`
                    );
                    await this._sleep(1000 * (retry + 1));
                } else {
                    const simpleError = new Error(`HTTP ${cleanError.status}: ${cleanError.message}`);
                    simpleError.originalError = cleanError;
                    throw simpleError;
                }
            }
        }
        
        throw new Error(`Max retries exceeded with no successful response to ${url}`);
    }

    /**
     * Validates the API response format and checks for success status.
     * @param {Object} response - Axios response object
     * @param {Object} response.data - Response data containing API fields
     * @returns {Promise<void>} Promise that resolves if response is valid
     * @throws {Error} Throws error if response indicates failure
     */
    async _checkResponse(response) {
        const responseJson = response.data;
        
        const status = responseJson[ApiFields.SUCCESS];
        const message = responseJson[ApiFields.MSG];
        
        if (!status) {
            throw new Error(`Response status is not successful, message: ${message}`);
        }
    }

    /**
     * Utility method to pause execution for a specified duration.
     * @param {number} ms - Number of milliseconds to sleep
     * @returns {Promise<void>} Promise that resolves after the specified delay
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Constructs a complete URL by combining the host with an endpoint.
     * @param {string} endpoint - API endpoint path
     * @returns {string} Complete URL for the API request
     */
    _url(endpoint) {
        return `${this._host}/${endpoint}`;
    }

    /**
     * Makes a POST request to the specified URL.
     * @param {string} url - URL to send the POST request to
     * @param {Object} [headers={}] - HTTP headers to include
     * @param {Object} [data={}] - Data to send in the request body
     * @param {Object} [options={}] - Additional request options
     * @returns {Promise<Object>} Promise resolving to axios response object
     * @throws {Error} Throws error if request fails
     */
    async _post(url, headers = {}, data = {}, options = {}) {
        return this._requestWithRetry('post', url, headers, { 
            data: data, 
            ...options 
        });
    }

    /**
     * Makes a GET request to the specified URL.
     * @param {string} url - URL to send the GET request to
     * @param {Object} [headers={}] - HTTP headers to include
     * @param {Object} [options={}] - Additional request options
     * @returns {Promise<Object>} Promise resolving to axios response object
     * @throws {Error} Throws error if request fails
     */
    async _get(url, headers = {}, options = {}) {
        return this._requestWithRetry('get', url, headers, { 
            ...options
        });
    }

    /**
     * Authenticates with the XUI API and establishes a session.
     * @param {string|null} [twoFactorCode=null] - Optional two-factor authentication code
     * @returns {Promise<void>} Promise that resolves when login is successful
     * @throws {Error} Throws error if login fails or no session cookie is received
     */
    async login(twoFactorCode = null) {
        const endpoint = "login";
        const headers = {};
        
        const url = this._url(endpoint);
        const data = {
            username: this._username,
            password: this._password
        };
        
        if (twoFactorCode !== null) {
            data.twoFactorCode = String(twoFactorCode);
        }
        
        if (this._token !== null) {
            data.loginSecret = this._token;
        }
        
        this.logger.log(`Logging in with username: ${this._username}`);
        
        await this._post(url, headers, data);
    }
}

export default BaseApi;