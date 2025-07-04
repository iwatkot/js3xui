import InboundApi from './api/ApiInbound.js';
import ClientApi from './api/ApiClient.js';
import DatabaseApi from './api/ApiDatabase.js';
import ServerApi from './api/ApiServer.js';
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
     * @param {boolean} [useTlsVerify=true] - Whether to verify TLS certificates
     * @param {string|null} [customCertificatePath=null] - Path to custom certificate
     * @param {*} [logger=null] - Optional logger instance
     */
    constructor(
        host,
        username,
        password,
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
            host, username, password, useTlsVerify, customCertificatePath, logger,
            this.cookieJar, this.axiosInstance
        );
        this.inbound = new InboundApi(
            host, username, password, useTlsVerify, customCertificatePath, logger,
            this.cookieJar, this.axiosInstance
        );
        this.database = new DatabaseApi(
            host, username, password, useTlsVerify, customCertificatePath, logger,
            this.cookieJar, this.axiosInstance
        );
        this.server = new ServerApi(
            host, username, password, useTlsVerify, customCertificatePath, logger,
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
    /**
     * Returns the instance of the Client API if the require environment variables are set.
     * List of required environment variables:
     * - `XUI_API_HOST`: The host URL for the XUI API
     * - `XUI_API_USERNAME`: The username for authentication
     * - `XUI_API_PASSWORD`: The password for authentication
     * 
     * List of optional environment variables:
     * - `TLS_VERIFY`: Whether to verify TLS certificates (default: true)
     * - `TLS_CERT_PATH`: Path to a custom TLS certificate (default: null)
     * 
     * @param {Object} [logger=null] - Optional logger instance to use for logging
     * @returns {ClientApi} The Client API instance
     * @throws {Error} If the required environment variables are not set
     * 
     * @example
     * 
     * process.env.XUI_API_HOST = 'https://your-host.com';
     * process.env.XUI_API_USERNAME = 'your-username';
     * process.env.XUI_API_PASSWORD = 'your-password';
     * 
     * const api = Api.fromEnv();
     * await api.login();
     */
    static fromEnv (logger = null) {
        const host = process.env.XUI_API_HOST;
        const username = process.env.XUI_API_USERNAME;
        const password = process.env.XUI_API_PASSWORD;

        // Check the first three required environment variables.
        if (!host || !username || !password) {
            throw new Error("One or more required environment variables are missing: XUI_API_HOST, XUI_API_USERNAME, XUI_API_PASSWORD");
        }

        const useTlsVerify = process.env.TLS_VERIFY === 'true';
        const customCertificatePath = process.env.TLS_CERT_PATH || null;

        // If logger is not provided, default to console logger.
        if (!logger) {
            logger = console;
        }

        return new Api(
            host, username, password, useTlsVerify, customCertificatePath, logger
        );
    }
}

export default Api;