/**
 * Represents the sniffing settings for an inbound connection.
 */
class Sniffing {
    /**
     * Creates a new Sniffing instance.
     * @param {Object} data - The sniffing data
     * @param {boolean} data.enabled - Whether sniffing is enabled. Required.
     * @param {Array<string>} [data.destOverride=[]] - The destination override. Optional.
     * @param {boolean} [data.metadataOnly=false] - Whether to only sniff metadata. Optional.
     * @param {boolean} [data.routeOnly=false] - Whether to only sniff routes. Optional.
     */
    constructor(data = {}) {
        // Required fields
        this.enabled = data.enabled;

        // Optional fields with defaults
        this.destOverride = data.destOverride || [];
        this.metadataOnly = data.metadataOnly || false;
        this.routeOnly = data.routeOnly || false;
    }

    /**
     * Creates a Sniffing instance from JSON data (from API response).
     * Handles field name mapping from API format.
     * @param {Object} json - The JSON data from API
     * @returns {Sniffing} A new Sniffing instance
     */
    static fromJSON(json) {
        return new Sniffing({
            enabled: json.enabled,
            destOverride: json.destOverride || json.dest_override || [],
            metadataOnly: json.metadataOnly || json.metadata_only || false,
            routeOnly: json.routeOnly || json.route_only || false
        });
    }

    /**
     * Converts the Sniffing instance to JSON format for API requests.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        return {
            enabled: this.enabled,
            destOverride: this.destOverride,
            metadataOnly: this.metadataOnly,
            routeOnly: this.routeOnly
        };
    }

    /**
     * Returns a complete representation of the sniffing settings (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            enabled: this.enabled,
            destOverride: this.destOverride,
            metadataOnly: this.metadataOnly,
            routeOnly: this.routeOnly
        };
    }

    /**
     * Returns a readable string representation of the sniffing settings.
     * @returns {string} String representation
     */
    toString() {
        return `Sniffing(enabled=${this.enabled}, destOverride=${JSON.stringify(this.destOverride)}, metadataOnly=${this.metadataOnly}, routeOnly=${this.routeOnly})`;
    }
}

export default Sniffing;
