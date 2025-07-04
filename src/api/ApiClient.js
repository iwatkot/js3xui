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
    /**
     * Updates an existing client in a specific inbound connection.
     * This endpoint allows you to modify the details of a client associated with an inbound connection.
     * 
     * @param {string} clientId - The ID of the client to update
     * @param {Client} client - The Client object containing updated information
     * @returns {Promise<void>} Resolves when the client is successfully updated
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * let existingClient = await api.client.getByEmail("user@example.com");
     * if (existingClient) {
     *   existingClient.tgId = "123456789"; // Example tgId, replace with actual value if needed
     *   await api.client.update(existingClient.id, existingClient);
     * }
     */
    async update(clientId, client) {
        const endpoint = `panel/api/inbounds/updateClient/${clientId}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);

        const settings = {
            clients: [client.toJSON()]
        };

        const data = {
            id: client.inboundId,
            settings: JSON.stringify(settings)
        };

        this.logger.log(`Updating client ${clientId} in inbound ${client.inboundId}`);
        await this._post(url, headers, data);
        this.logger.log(`Client ${clientId} updated successfully in inbound ${client.inboundId}`);
    }
    /**
     * Resets the IP addresses associated with a specific client.
     * This endpoint clears all IPs that the client has used to connect to the service,
     * effectively resetting their connection history.
     * 
     * @param {string} email - The email of the client whose IPs should be reset
     * @returns {Promise<void>} Resolves when the IPs are successfully reset
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * await api.client.resetIps("user@example.com");
     */
    async resetIps(email) {
        const endpoint = `panel/api/inbounds/clearClientIps/${email}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log(`Resetting IPs for client with email: ${email}`);

        const data = {};

        await this._post(url, headers, data);
        this.logger.log(`IPs reset successfully for client with email: ${email}`);
    }
    /**
     * Resets the traffic statistics for a specific client.
     * This endpoint clears all traffic data associated with the client,
     * allowing them to start fresh with their usage statistics.
     * 
     * @param {number} inboundId - The ID of the inbound connection the client is associated with
     * @param {string} email - The email of the client whose stats should be reset
     * @returns {Promise<void>} Resolves when the stats are successfully reset
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const inboundId = 1; // Example inbound ID
     * await api.client.resetStats(inboundId, "user@example.com");
     */
    async resetStats(inboundId, email) {
        const endpoint = `panel/api/inbounds/${inboundId}/resetClientTraffic/${email}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log(`Resetting stats for client with email: ${email}`);

        const data = {};

        await this._post(url, headers, data);
        this.logger.log(`Stats reset successfully for client with email: ${email}`);
    }
    /**
     * Deletes a specific client from an inbound connection.
     * This endpoint removes the client from the inbound, effectively terminating their access.
     * 
     * @param {number} inboundId - The ID of the inbound connection to delete the client from
     * @param {string} clientId - The ID of the client to be deleted
     * @returns {Promise<void>} Resolves when the client is successfully deleted
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const inboundId = 1; // Example inbound ID
     * const clientId = "client-id-123"; // Example client ID
     * await api.client.delete(inboundId, clientId);
     */
    async delete(inboundId, clientId) {
        const endpoint = `panel/api/inbounds/${inboundId}/delClient/${clientId}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        
        const data = {
            id: inboundId,
            clientId: clientId
        };

        this.logger.log(`Deleting client ${clientId} from inbound ${inboundId}`);
        await this._post(url, headers, data);
        this.logger.log(`Client ${clientId} deleted successfully from inbound ${inboundId}`);
    }
    /**
     * Deletes all clients from an inbound connection that have no traffic.
     * This endpoint cleans up the inbound by removing clients that are no longer active.
     * 
     * @param {number} inboundId - The ID of the inbound connection to delete depleted clients from
     * @returns {Promise<void>} Resolves when depleted clients are successfully deleted
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const inboundId = 1; // Example inbound ID
     * await api.client.deleteDepleted(inboundId);
     */
    async deleteDepleted(inboundId) {
        const endpoint = `panel/api/inbounds/delDepletedClients/${inboundId}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        
        const data = {
            id: inboundId
        };

        this.logger.log(`Deleting depleted clients from inbound ${inboundId}`);
        await this._post(url, headers, data);
        this.logger.log(`Depleted clients deleted successfully from inbound ${inboundId}`);
    }
    /**
     * Retrieves a list of online clients currently connected to the service.
     * This endpoint provides information about clients that are actively using the service.
     * The array contains emails of the clients only.
     * 
     * @returns {Promise<Array<string>>} An array of emails of online clients.
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const onlineClients = await api.client.online();
     */
    async online() {
        const endpoint = "panel/api/inbounds/onlines";
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log(`Getting online clients`);

        const data = {};

        const response = await this._post(url, headers, data);
        const onlineClientsJson = response.data[ApiFields.OBJ];

        return Array.isArray(onlineClientsJson) ? onlineClientsJson : [];
    }
    /**
     * Retrieves traffic information for a specific client by their ID.
     * This endpoint provides traffic statistics and other relevant information
     * related to the client identified by their unique ID.
     * 
     * @param {string} clientId - The ID of the client to retrieve traffic for
     * @returns {Promise<Array<Client>>} An array of Client objects if found, otherwise empty array
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const clients = await api.client.getTrafficById("client-id-123");
     */
    async getTrafficById(clientId) {
        const endpoint = `panel/api/inbounds/getClientTrafficsById/${clientId}`;
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log(`Getting traffic for client ID: ${clientId}`);

        const response = await this._get(url, headers);
        const clientJson = response.data[ApiFields.OBJ];

        if (!clientJson) {
            this.logger.log(`No client found for ID: ${clientId}`);
            return [];
        }

        // Convert JSON array to Client objects
        if (Array.isArray(clientJson)) {
            return clientJson.map(client => Client.fromJSON(client));
        }
        
        // If it's a single object, return it as an array
        return [Client.fromJSON(clientJson)];
    }
}

export default ClientApi;