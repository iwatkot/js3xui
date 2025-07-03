import BaseApi from './ApiBase.js';
import ApiFields from './ApiFields.js';
import Inbound from '../inbound/Inbound.js';

/**
 * API class for managing inbound connections.
 * Inherits from BaseApi to provide inbound-specific functionality.
 */
class InboundApi extends BaseApi {
    /**
     * Retrieves a comprehensive list of all inbounds along with their associated
     * client options and statistics.
     * 
     * @returns {Promise<Array<Inbound>>} A list of Inbound objects
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const inbounds = await api.inbound.getList();
     */
    async getList() {
        const endpoint = "panel/api/inbounds/list";
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log("Getting inbounds...");
        
        const response = await this._get(url, headers);
        const inboundsJson = response.data[ApiFields.OBJ];
        
        if (!inboundsJson || !Array.isArray(inboundsJson)) {
            return [];
        }
        
        // Convert JSON objects to Inbound instances
        return inboundsJson.map(inboundData => Inbound.fromJSON(inboundData));
    }
    async getById(inboundId) {
        const endpoint = `panel/api/inbounds/get/${inboundId}`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Getting inbound by ID: ${inboundId}`);
        
        const response = await this._get(url, headers);
        const inboundData = response.data[ApiFields.OBJ];
        
        if (!inboundData) {
            return null;
        }
        
        // Convert JSON object to Inbound instance
        return Inbound.fromJSON(inboundData);
    }
    /**
     * Adds a new inbound connection.
     * 
     * @param {Inbound} inbound - The Inbound instance to add
     * @returns {Promise<void>} Resolves when the inbound is added successfully
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const newInbound = new Inbound({ enable: true, port: 8080, protocol: 'vmess' });
     * await api.inbound.add(newInbound);
     */
    async add(inbound) {
        const endpoint = "panel/api/inbounds/add";
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log("Adding inbound...");
        
        // Convert Inbound instance to JSON
        const data = inbound.toJSON();
        
        await this._post(url, headers, data);
        this.logger.log("Inbound added successfully.");
    }
    /**
     * Deletes an existing inbound connection by its ID.
     * 
     * @param {Inbound} inbound - The Inbound instance to delete
     * @returns {Promise<void>} Resolves when the inbound is deleted successfully
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const existingInbound = await api.inbound.getById(1);
     * existingInbound.port = 9090; // Change port
     * await api.inbound.update(existingInbound);
     */
    async delete(inboundId) {
        const endpoint = `panel/api/inbounds/del/${inboundId}`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Deleting inbound with ID: ${inboundId}`);
        
        await this._post(url, headers);
        this.logger.log("Inbound deleted successfully.");
    }
    /**
     * Updates an existing inbound connection.
     * 
     * @param {number} inboundId - The ID of the Inbound to update
     * @param {Inbound} inbound - The updated Inbound instance
     * @returns {Promise<void>} Resolves when the inbound is updated successfully
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const existingInbound = await api.inbound.getById(1);
     * existingInbound.remark = "Updated Remark"; // Change remark
     * await api.inbound.update(existingInbound.id, existingInbound);
     */
    async update(inboundId, inbound) {
        const endpoint = `panel/api/inbounds/update/${inboundId}`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Updating inbound with ID: ${inboundId}`);
        
        // Convert Inbound instance to JSON
        const data = inbound.toJSON();
        
        await this._post(url, headers, data);
        this.logger.log("Inbound updated successfully.");
    }
    /**
     * Resets the traffic statistics for all inbounds.
     * NOTE: THIS WILL RESET ALL TRAFFIC STATS FOR ALL INBOUNDS! USE WITH CAUTION!
     * If you need to reset stats for a specific inbound, use the `resetClientStats` method instead.
     * 
     * @returns {Promise<void>} Resolves when the stats are reset successfully
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * await api.inbound.resetStats();
     */
    async resetStats() {
        const endpoint = `panel/api/inbounds/resetAllTraffics`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Resetting stats for all inbounds`);

        await this._post(url, headers);
        this.logger.log("Inbound stats reset successfully.");
    }
    /**     * Resets the traffic statistics for all clients associated with a specific inbound.
     * 
     * @param {number} inboundId - The ID of the inbound to reset client stats for
     * @returns {Promise<void>} Resolves when the client stats are reset successfully
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * await api.inbound.resetClientStats(1);
     */
    async resetClientStats(inboundId) {
        const endpoint = `panel/api/inbounds/resetAllClientTraffics/${inboundId}`;
        const headers = { "Accept": "application/json" };
        
        const url = this._url(endpoint);
        this.logger.log(`Resetting client stats for inbound ID: ${inboundId}`);
        
        await this._post(url, headers);
        this.logger.log("Inbound client stats reset successfully.");
    }
}

export default InboundApi;
