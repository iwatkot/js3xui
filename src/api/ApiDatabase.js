import BaseApi from './ApiBase.js';

class DatabaseApi extends BaseApi {
    /**
     * Exports the database by creating a backup.
     * 
     * @returns {Promise<void>} Resolves when the export is initiated
     * 
     * @example
     * const api = new Api('host', 'user', 'pass');
     * await api.login();
     * await api.database.export();
     */
    async export() {
        const endpoint = "panel/api/inbounds/createbackup";
        const headers = { "Accept": "application/json" };

        const url = this._url(endpoint);
        this.logger.log("Exporting database...");

        await this._get(url, headers);
        this.logger.log("Database export initiated.");
    }
}

export default DatabaseApi;
