import InboundApi from './api/ApiInbound.js';
import ClientApi from './api/ApiClient.js';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';

/**
 * This class provides a high-level interface to interact with the XUI API.
 * Access to the client, inbound, and database APIs is provided through this class.
 */
class Api {
    /**
     * Creates an instance of Api.
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
        // Create shared cookie jar and axios instance
        this.cookieJar = new CookieJar();
        this.axiosInstance = wrapper(axios.create({
            jar: this.cookieJar,
            withCredentials: true
        }));
        
        // Create API instances and pass the shared cookie jar and axios instance
        this.client = new ClientApi(
            host, username, password, token, useTlsVerify, customCertificatePath, logger,
            this.cookieJar, this.axiosInstance
        );
        this.inbound = new InboundApi(
            host, username, password, token, useTlsVerify, customCertificatePath, logger,
            this.cookieJar, this.axiosInstance
        );
    }
    /**
     * Logs in to the XUI API and establishes a session.
     * @param {string|null} [twoFactorCode=null] - Optional two-factor authentication code
     * @returns {Promise<void>} Promise that resolves when login is complete
     */
    async login(twoFactorCode = null) {
        await this.inbound.login(twoFactorCode);
    }
}

export default Api;