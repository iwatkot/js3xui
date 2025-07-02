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
     * @returns {Promise<Array<Inbound>]} A list of Inbound objects
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
}

export default InboundApi;
