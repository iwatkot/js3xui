import InboundApi from './api/ApiInbound.js';

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
        this.inbound = new InboundApi(
            host, username, password, token, useTlsVerify, customCertificatePath, logger
        );
    }
}

export default Api;