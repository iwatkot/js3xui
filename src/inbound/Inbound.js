import Client from '../client/Client.js';
import Settings from './Settings.js';
import Sniffing from './Sniffing.js';

/**
 * Represents an inbound connection in the XUI API.
 */
class Inbound {
    /**
     * Creates a new Inbound instance.
     * @param {Object} data - The inbound data
     * @param {boolean} data.enable - Whether the inbound connection is enabled. Required.
     * @param {number} data.port - The port number for the inbound connection. Required.
     * @param {string} data.protocol - The protocol for the inbound connection. Required.
     * @param {Settings} data.settings - The settings for the inbound connection. Required.
     * @param {Object|string} [data.streamSettings=""] - The stream settings for the inbound connection. Optional.
     * @param {Sniffing} data.sniffing - The sniffing settings for the inbound connection. Required.
     * @param {string} [data.listen=""] - The listen address for the inbound connection. Optional.
     * @param {string} [data.remark=""] - The remark for the inbound connection. Optional.
     * @param {number} [data.id=0] - The ID of the inbound connection. Optional.
     * @param {number} [data.up=0] - The up value for the inbound connection. Optional.
     * @param {number} [data.down=0] - The down value for the inbound connection. Optional.
     * @param {number} [data.total=0] - The total value for the inbound connection. Optional.
     * @param {number} [data.expiryTime=0] - The expiry time for the inbound connection. Optional.
     * @param {Array<Client>} [data.clientStats=[]] - The client stats for the inbound connection. Optional.
     * @param {string} [data.tag=""] - The tag for the inbound connection. Optional.
     */
    constructor(data = {}) {
        // Required fields
        this.enable = data.enable;
        this.port = data.port;
        this.protocol = data.protocol;
        
        // Handle settings - ensure it's a Settings object
        if (data.settings instanceof Settings) {
            this.settings = data.settings;
        } else if (data.settings && typeof data.settings === 'object') {
            this.settings = Settings.fromJSON(data.settings);
        } else {
            this.settings = new Settings();
        }
        
        this.sniffing = data.sniffing;

        // Optional fields with defaults
        this.streamSettings = data.streamSettings || "";
        this.listen = data.listen || "";
        this.remark = data.remark || "";
        this.id = data.id || 0;
        this.up = data.up || 0;
        this.down = data.down || 0;
        this.total = data.total || 0;
        this.expiryTime = data.expiryTime || 0;
        this.clientStats = data.clientStats || [];
        this.tag = data.tag || "";
    }

    /**
     * Creates an Inbound instance from JSON data (from API response).
     * Handles field name mapping from API format.
     * @param {Object} json - The JSON data from API
     * @returns {Inbound} A new Inbound instance
     */
    static fromJSON(json) {
        // Convert clientStats array to Client objects if it exists
        let clientStats = [];
        if (Array.isArray(json.clientStats)) {
            clientStats = json.clientStats.map(clientData => Client.fromJSON(clientData));
        }

        // Parse settings if it's a JSON string, otherwise use as-is
        let settingsData = json.settings;
        if (typeof json.settings === 'string') {
            try {
                settingsData = JSON.parse(json.settings);
            } catch {
                console.warn('Failed to parse settings JSON:', json.settings);
                settingsData = {};
            }
        }

        // Convert settings to Settings object if it exists
        let settings = settingsData;
        if (settingsData && typeof settingsData === 'object') {
            settings = Settings.fromJSON(settingsData);
        }

        // Convert sniffing to Sniffing object if it exists
        let sniffing = json.sniffing;
        if (json.sniffing && typeof json.sniffing === 'object') {
            sniffing = Sniffing.fromJSON(json.sniffing);
        }

        return new Inbound({
            enable: json.enable,
            port: json.port,
            protocol: json.protocol,
            settings: settings,
            streamSettings: json.streamSettings,
            sniffing: sniffing,
            listen: json.listen,
            remark: json.remark,
            id: json.id,
            up: json.up,
            down: json.down,
            total: json.total,
            expiryTime: json.expiryTime,
            clientStats: clientStats,
            tag: json.tag
        });
    }

    /**
     * Converts the Inbound instance to JSON format for API requests.
     * Only includes fields needed for API operations.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        const json = {
            enable: this.enable,
            port: this.port,
            protocol: this.protocol,
            remark: this.remark,
            listen: this.listen,
            expiryTime: this.expiryTime
        };

        // Handle settings - convert Settings object to JSON string if needed
        if (this.settings instanceof Settings) {
            json.settings = JSON.stringify(this.settings.toJSON());
        } else if (typeof this.settings === 'object') {
            json.settings = JSON.stringify(this.settings);
        } else {
            json.settings = this.settings;
        }

        // Handle sniffing - convert Sniffing object to JSON string if needed
        if (this.sniffing instanceof Sniffing) {
            json.sniffing = JSON.stringify(this.sniffing.toJSON());
        } else if (typeof this.sniffing === 'object') {
            json.sniffing = JSON.stringify(this.sniffing);
        } else {
            json.sniffing = this.sniffing;
        }

        // Handle streamSettings - can be object, string, or empty string
        if (typeof this.streamSettings === 'object') {
            json.streamSettings = JSON.stringify(this.streamSettings);
        } else {
            json.streamSettings = this.streamSettings;
        }

        // Convert Client objects back to JSON for API
        if (Array.isArray(this.clientStats)) {
            json.clientStats = this.clientStats.map(client => {
                // If it's a Client object, convert to JSON
                if (client && typeof client.toJSON === 'function') {
                    return client.toJSON();
                }
                // If it's already plain JSON, return as-is
                return client;
            });
        } else {
            json.clientStats = this.clientStats;
        }

        return json;
    }

    /**
     * Returns a complete representation of the inbound (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            enable: this.enable,
            port: this.port,
            protocol: this.protocol,
            settings: this.settings,
            streamSettings: this.streamSettings,
            sniffing: this.sniffing,
            listen: this.listen,
            remark: this.remark,
            id: this.id,
            up: this.up,
            down: this.down,
            total: this.total,
            expiryTime: this.expiryTime,
            clientStats: this.clientStats,
            tag: this.tag
        };
    }
}

export default Inbound;