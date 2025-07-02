/**
 * Represents a client in the XUI API.
 */
class Client {
    /**
     * Creates a new Client instance.
     * @param {Object} data - The client data
     * @param {string} data.email - The email of the client. Required.
     * @param {boolean} data.enable - Whether the client is enabled. Required.
     * @param {string} [data.password=""] - The password of the client. Optional.
     * @param {number|string|null} [data.id=null] - The ID of the client. Optional.
     * @param {number|null} [data.inboundId=null] - The ID of the inbound connection. Optional.
     * @param {number} [data.up=0] - The upload speed of the client. Optional.
     * @param {number} [data.down=0] - The download speed of the client. Optional.
     * @param {number} [data.expiryTime=0] - The expiry time of the client. Optional.
     * @param {number} [data.total=0] - The total amount of data transferred by the client. Optional.
     * @param {number|null} [data.reset=null] - The time at which the client's data was last reset. Optional.
     * @param {string} [data.flow=""] - The flow of the client. Optional.
     * @param {string} [data.method=""] - The method (encryption cipher) used by the client. Optional.
     * @param {number} [data.limitIp=0] - The limit of IPs for the client. Optional.
     * @param {string} [data.subId=""] - The sub ID of the client. Optional.
     * @param {number|string} [data.tgId=""] - The Telegram ID of the client. Optional.
     * @param {number} [data.totalGb=0] - The total amount of data transferred by the client in GB. Optional.
     */
    constructor(data = {}) {
        // Required fields
        this.email = data.email;
        this.enable = data.enable;

        // Optional fields with defaults
        this.password = data.password || "";
        this.id = data.id || null;
        this.inboundId = data.inboundId || null;
        this.up = data.up || 0;
        this.down = data.down || 0;
        this.expiryTime = data.expiryTime || 0;
        this.total = data.total || 0;
        this.reset = data.reset || null;
        this.flow = data.flow || "";
        this.method = data.method || "";
        this.limitIp = data.limitIp || 0;
        this.subId = data.subId || "";
        this.tgId = data.tgId || "";
        this.totalGb = data.totalGb || 0;
    }

    /**
     * Creates a Client instance from JSON data (from API response).
     * Handles field name mapping from API format.
     * @param {Object} json - The JSON data from API
     * @returns {Client} A new Client instance
     */
    static fromJSON(json) {
        return new Client({
            email: json.email,
            enable: json.enable,
            password: json.password,
            id: json.id,
            inboundId: json.inboundId,
            up: json.up,
            down: json.down,
            expiryTime: json.expiryTime,
            total: json.total,
            reset: json.reset,
            flow: json.flow,
            method: json.method,
            limitIp: json.limitIp,
            subId: json.subId,
            tgId: json.tgId,
            totalGb: json.totalGb
        });
    }

    /**
     * Converts the Client instance to JSON format for API requests.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        return {
            email: this.email,
            enable: this.enable,
            password: this.password,
            id: this.id,
            inboundId: this.inboundId,
            up: this.up,
            down: this.down,
            expiryTime: this.expiryTime,
            total: this.total,
            reset: this.reset,
            flow: this.flow,
            method: this.method,
            limitIp: this.limitIp,
            subId: this.subId,
            tgId: this.tgId,
            totalGb: this.totalGb
        };
    }

    /**
     * Returns a complete representation of the client (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            email: this.email,
            enable: this.enable,
            password: this.password,
            id: this.id,
            inboundId: this.inboundId,
            up: this.up,
            down: this.down,
            expiryTime: this.expiryTime,
            total: this.total,
            reset: this.reset,
            flow: this.flow,
            method: this.method,
            limitIp: this.limitIp,
            subId: this.subId,
            tgId: this.tgId,
            totalGb: this.totalGb
        };
    }

    /**
     * Returns a readable string representation of the client.
     * @returns {string} String representation
     */
    toString() {
        return `Client(email="${this.email}", id=${this.id}, enable=${this.enable})`;
    }
}

export default Client;
