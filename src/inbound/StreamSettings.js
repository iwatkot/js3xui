/**
 * Represents the stream settings for an inbound connection.
 */
class StreamSettings {
    /**
     * Creates a new StreamSettings instance.
     * @param {Object} data - The stream settings data
     * @param {string} data.security - The security for the inbound connection. Required.
     * @param {string} data.network - The network for the inbound connection. Required.
     * @param {Object} [data.tcpSettings={}] - The TCP settings for the inbound connection. Optional.
     * @param {Object} [data.kcpSettings={}] - The KCP settings for the inbound connection. Optional.
     * @param {Array} [data.externalProxy=[]] - The external proxy for the inbound connection. Optional.
     * @param {Object} [data.realitySettings={}] - The reality settings for the inbound connection. Optional.
     * @param {Object} [data.xtlsSettings={}] - The xTLS settings for the inbound connection. Optional.
     * @param {Object} [data.tlsSettings={}] - The TLS settings for the inbound connection. Optional.
     */
    constructor(data = {}) {
        // Required fields
        this.security = data.security;
        this.network = data.network;

        // Optional fields with defaults
        this.tcpSettings = data.tcpSettings || {};
        this.kcpSettings = data.kcpSettings || {};
        this.externalProxy = data.externalProxy || [];
        this.realitySettings = data.realitySettings || {};
        this.xtlsSettings = data.xtlsSettings || {};
        this.tlsSettings = data.tlsSettings || {};
    }

    /**
     * Creates a StreamSettings instance from JSON data (from API response).
     * Handles field name mapping from API format.
     * @param {Object} json - The JSON data from API
     * @returns {StreamSettings} A new StreamSettings instance
     */
    static fromJSON(json) {
        return new StreamSettings({
            security: json.security,
            network: json.network,
            tcpSettings: json.tcpSettings || json.tcp_settings || {},
            kcpSettings: json.kcpSettings || json.kcp_settings || {},
            externalProxy: json.externalProxy || json.external_proxy || [],
            realitySettings: json.realitySettings || json.reality_settings || {},
            xtlsSettings: json.xtlsSettings || json.xtls_settings || {},
            tlsSettings: json.tlsSettings || json.tls_settings || {}
        });
    }

    /**
     * Converts the StreamSettings instance to JSON format for API requests.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        return {
            security: this.security,
            network: this.network,
            tcpSettings: this.tcpSettings,
            kcpSettings: this.kcpSettings,
            externalProxy: this.externalProxy,
            realitySettings: this.realitySettings,
            xtlsSettings: this.xtlsSettings,
            tlsSettings: this.tlsSettings
        };
    }

    /**
     * Returns a complete representation of the stream settings (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            security: this.security,
            network: this.network,
            tcpSettings: this.tcpSettings,
            kcpSettings: this.kcpSettings,
            externalProxy: this.externalProxy,
            realitySettings: this.realitySettings,
            xtlsSettings: this.xtlsSettings,
            tlsSettings: this.tlsSettings
        };
    }

    /**
     * Returns a readable string representation of the stream settings.
     * @returns {string} String representation
     */
    toString() {
        return `StreamSettings(security="${this.security}", network="${this.network}", tcpSettings=${Object.keys(this.tcpSettings).length} keys, realitySettings=${Object.keys(this.realitySettings).length} keys)`;
    }
}

export default StreamSettings;
