import BaseApi from './ApiBase.js';
import ApiFields from './ApiFields.js';
import Client from '../client/Client.js';

/**
 * API class for managing client connections.
 * Inherits from BaseApi to provide client-specific functionality.
 */
class ClientApi extends BaseApi {
    /**
     * Retrieves information about a specific client based on their email.
     * This endpoint provides details such as traffic statistics and other relevant information
     * related to the client.
     * 
     * @param {string} email - The email of the client to retrieve
     * @returns {Promise<Client|null>} The client object if found, otherwise null
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const client = await api.client.getByEmail("user@example.com");
     */
    async getByEmail(email) {
        const endpoint = `panel/api/inbounds/getClientTraffics/${email}`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Getting client stats for email: ${email}`);
        
        const response = await this._get(url, headers);
        const clientJson = response.data[ApiFields.OBJ];
        
        if (!clientJson) {
            this.logger.log(`No client found for email: ${email}`);
            return null;
        }
        
        return Client.fromJSON(clientJson);
    }
}

export default ClientApi;