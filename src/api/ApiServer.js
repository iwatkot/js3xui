import BaseApi from './ApiBase.js';
import Server from '../server/Server.js';
import ApiFields from './ApiFields.js';
import fs from 'fs';

/** * This class provides methods to interact with the server API, such as downloading the database.
 * It extends the BaseApi class to inherit common API functionality.
 */
class ServerApi extends BaseApi {
    /**
     * Saves the current database to a specified file path.
     * @param {string} savePath - The file path where the database will be saved
     * @return {Promise<void>} Resolves when the database is successfully saved
     * 
     * @example
     * 
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const savePath = "db_backup.db";
     * await api.getDb(savePath);
     * 
     * @throws {Error} Throws an error if the download fails or the response is not successful
     *
     */
    async getDb(savePath) {
        const endpoint = "server/getDb";
        const headers = {"Accept": "application/octet-stream"};

        const url = this._url(endpoint);
        this.logger.log("Downloading database...");

        const response = await this._get(url, headers, {}, true);

        if (response.status !== 200) {
            throw new Error(`Failed to download database: ${response.statusText}`);
        }

        fs.writeFileSync(savePath, response.data, 'binary');
        this.logger.log(`Database saved to ${savePath}`);
    }
    /**
     * Retrieves the current server status.
     * @return {Promise<Server|null>} Resolves to a Server object containing server status, or null if not available
     * 
     * @example
     * 
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * const status = await api.getStatus();
     * console.log(status);
     * 
     */
    async getStatus() {
        const endpoint = "server/status";
        const headers = {"Accept": "application/json"};

        const url = this._url(endpoint);
        this.logger.log("Getting server status...");

        const response = await this._post(url, headers);

        const serverData = response.data[ApiFields.OBJ];

        if (!serverData) {
            return null;
        }

        return Server.fromJSON(serverData);

    }
}

export default ServerApi;
