import Client from '../client/Client.js';

/**
 * Represents the settings for an inbound connection.
 */
class Settings {
    /**
     * Creates a new Settings instance.
     * @param {Object} data - The settings data
     * @param {Array<Client>} [data.clients=[]] - The clients for the inbound connection. Optional.
     * @param {string} [data.decryption=""] - The decryption method for the inbound connection. Optional.
     * @param {Array} [data.fallbacks=[]] - The fallbacks for the inbound connection. Optional.
     */
    constructor(data = {}) {
        // Handle clients - ensure it's an array of Client objects
        if (Array.isArray(data.clients)) {
            this.clients = data.clients.map(client => {
                if (client instanceof Client) {
                    return client;
                }
                // If it's plain JSON, convert to Client object
                return Client.fromJSON(client);
            });
        } else {
            this.clients = [];
        }

        this.decryption = data.decryption || "";
        this.fallbacks = data.fallbacks || [];
    }

    /**
     * Creates a Settings instance from JSON data (from API response).
     * @param {Object} json - The JSON data from API
     * @returns {Settings} A new Settings instance
     */
    static fromJSON(json) {
        return new Settings({
            clients: json.clients || [],
            decryption: json.decryption || "",
            fallbacks: json.fallbacks || []
        });
    }

    /**
     * Converts the Settings instance to JSON format for API requests.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        return {
            clients: this.clients.map(client => client.toJSON()),
            decryption: this.decryption,
            fallbacks: this.fallbacks
        };
    }

    /**
     * Returns a complete representation of the settings (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            clients: this.clients.map(client => client.toObject()),
            decryption: this.decryption,
            fallbacks: this.fallbacks
        };
    }

    /**
     * Returns a readable string representation of the settings.
     * @returns {string} String representation
     */
    toString() {
        return `Settings(clients=${this.clients.length}, decryption="${this.decryption}", fallbacks=${this.fallbacks.length})`;
    }
}

export default Settings;