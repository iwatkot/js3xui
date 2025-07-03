import BaseApi from './ApiBase.js';
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
}

export default ServerApi;
