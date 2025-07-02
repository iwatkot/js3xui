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
    /**
     * Retrieves a list of IP addresses associated with a specific client.
     * This endpoint provides the IPs that the client has used to connect to the service.
     * 
     * @param {string} email - The email of the client to retrieve IPs for
     * @returns {Promise<Array<string>>} An array of IP addresses associated with the client
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const ips = await api.client.getIps("user@example.com");
     */
    async getIps(email) {
        const endpoint = `panel/api/inbounds/clientIps/${email}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log(`Getting client IPs for email: ${email}`);

        const data = {}

        const response = await this._post(url, headers, data);
        const ipsJson = response.data[ApiFields.OBJ];

        return Array.isArray(ipsJson) ? ipsJson : [];
    }
    /**
     * Adds one or more clients to a specific inbound connection.
     * This endpoint allows you to associate clients with an inbound connection,
     * enabling them to access the service through that connection.
     * 
     * @param {number} inboundId - The ID of the inbound connection to add clients to
     * @param {Array<Client>} clients - An array of Client objects to be added
     * @returns {Promise<void>} Resolves when the clients are successfully added
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const newClientId = crypto.randomUUID();
     * const newClient = new Client({ email: "user@example.com", enable: true, id: newClientId });
     * await api.client.add(1, [newClient]);
     */
    async add(inboundId, clients) {
        const endpoint = "panel/api/inbounds/addClient";
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        
        const settings = {
            clients: clients.map(client => client.toJSON())
        };

        const data = {
            id: inboundId,
            settings: JSON.stringify(settings)
        };

        this.logger.log(`Adding ${clients.length} clients to inbound ${inboundId}`);
        await this._post(url, headers, data);
        this.logger.log(`Clients added successfully to inbound ${inboundId}`);
    }
}

export default ClientApi;