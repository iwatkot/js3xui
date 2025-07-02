/**
 * Constants for API fields used in the XUI API.
 * These fields are used to standardize the keys in API responses.
 */
class ApiFields {
    static SUCCESS = "success";
    static MSG = "msg";
    static OBJ = "obj";
    static CLIENT_STATS = "clientStats";
    static NO_IP_RECORD = "No IP Record";
    static GET = "GET";
    static POST = "POST";
}

/**
 * Common cookie names used by XUI API for session management.
 */
const COOKIE_NAMES = ["3x-ui", "session"];

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
     */
    constructor(
        host,
        username,
        password,
        token = null,
        useTlsVerify = true,
        customCertificatePath = null,
        logger = null
    ) {
        this._host = host.replace(/\/$/, ''); // Remove trailing slash
        this._username = username;
        this._password = password;
        this._token = token;
        this._useTlsVerify = useTlsVerify;
        this._customCertificatePath = customCertificatePath;
        this._maxRetries = 3;
        this._session = null;
        this._cookieName = null;
        this.logger = logger || console; // Default to console if no logger provided
    }

    async _requestWithRetry(method, url, headers = {}, options = {}) {
        const axios = await import('axios');
        this.logger.log(`${method.toUpperCase()} request to ${url}...`);
        
        for (let retry = 1; retry <= this._maxRetries; retry++) {
            try {
                const { skipCheck = false, ...requestOptions } = options;
                
                const axiosConfig = {
                    method: method.toLowerCase(),
                    url: url,
                    headers: {
                        ...headers
                    },
                    httpsAgent: this._customCertificatePath ? 
                        new (await import('https')).Agent({ ca: this._customCertificatePath }) : 
                        undefined,
                    rejectUnauthorized: this._useTlsVerify,
                    timeout: 30000,
                    withCredentials: true,
                    ...requestOptions
                };

                // Add cookies if available
                if (Object.keys(this.cookies).length > 0) {
                    const cookieString = Object.entries(this.cookies)
                        .map(([name, value]) => `${name}=${value}`)
                        .join('; ');
                    axiosConfig.headers['Cookie'] = cookieString;
                }

                const response = await axios.default(axiosConfig);
                
                if (skipCheck) {
                    return response;
                }
                
                await this._checkResponse(response);
                return response;
                
            } catch (error) {
                if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                    if (retry === this._maxRetries) {
                        throw error;
                    }
                    this.logger.warn(
                        `Request to ${url} failed: ${error.message}, retry ${retry} of ${this._maxRetries}`
                    );
                    await this._sleep(1000 * (retry + 1));
                } else {
                    throw error;
                }
            }
        }
        
        throw new Error(`Max retries exceeded with no successful response to ${url}`);
    }

    async _checkResponse(response) {
        const responseJson = response.data;
        
        const status = responseJson[ApiFields.SUCCESS];
        const message = responseJson[ApiFields.MSG];
        
        if (!status) {
            throw new Error(`Response status is not successful, message: ${message}`);
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    _url(endpoint) {
        return `${this._host}/${endpoint}`;
    }

    async _post(url, headers = {}, data = {}, options = {}) {
        const { isLogin = false, ...otherOptions } = options;
        
        if (!isLogin && !this._session) {
            throw new Error("Before making a POST request, you must use the login() method.");
        }
        
        return this._requestWithRetry('post', url, headers, { 
            data: data, 
            ...otherOptions 
        });
    }

    async _get(url, headers = {}, options = {}) {
        const { isLogin = false, ...otherOptions } = options;
        
        if (!isLogin && !this._session) {
            throw new Error("Before making a GET request, you must use the login() method.");
        }
        
        return this._requestWithRetry('get', url, headers, otherOptions);
    }

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
        
        const response = await this._post(url, headers, data, { isLogin: true });
        const cookie = this._getCookie(response);
        
        if (!cookie) {
            throw new Error("No session cookie found, something wrong with the login...");
        }
        
        this.logger.log(`Session cookie successfully retrieved for username: ${this._username}`);
        this._session = cookie;
    }

    _getCookie(response) {
        for (const cookieName of COOKIE_NAMES) {
            const setCookieHeader = response.headers['set-cookie'];
            if (!setCookieHeader) continue;
            
            for (const cookie of setCookieHeader) {
                if (cookie.startsWith(`${cookieName}=`)) {
                    this.logger.log(`Session cookie found: ${cookieName}`);
                    this._cookieName = cookieName;
                    return cookie.split(';')[0].split('=')[1]; // Extract just the value
                }
            }
        }
        return null;
    }

    get cookies() {
        if (!this._session || !this._cookieName) {
            return {};
        }
        return { [this._cookieName]: this._session };
    }
}

export default BaseApi;
export { ApiFields }; 