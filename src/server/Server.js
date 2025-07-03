/**
 * This module contains server-related classes for XUI API.
 * Based on the Python Pydantic models from py3xui.
 */

/**
 * Field names used in XUI API responses for server data.
 */
class ServerFields {
    static CPU = "cpu";
    static CPU_CORES = "cpuCores";
    static LOGICAL_PRO = "logicalPro";
    static CPU_SPEED_MHZ = "cpuSpeedMhz";
    
    static MEM_CURRENT = "current";
    static MEM_TOTAL = "total";
    
    static XRAY_STATE = "state";
    static XRAY_ERROR_MSG = "errorMsg";
    static XRAY_VERSION = "version";
    
    static UPTIME = "uptime";
    static LOADS = "loads";
    static TCP_COUNT = "tcpCount";
    static UDP_COUNT = "udpCount";
    static NET_IO = "netIO";
    static NET_TRAFFIC = "netTraffic";
    static NET_IO_UP = "up";
    static NET_IO_DOWN = "down";
    static NET_TRAFFIC_SENT = "sent";
    static NET_TRAFFIC_RECV = "recv";
    static PUBLIC_IP_V4 = "ipv4";
    static PUBLIC_IP_V6 = "ipv6";
    static APP_THREADS = "threads";
    static APP_MEM = "mem";
    static APP_UPTIME = "uptime";
    static APP_STATS = "appStats";
    static PUBLIC_IP = "publicIP";
}

/**
 * Represents memory information.
 */
class MemoryInfo {
    /**
     * Creates a new MemoryInfo instance.
     * @param {Object} data - The memory data
     * @param {number} data.current - Current memory usage in bytes
     * @param {number} data.total - Total memory capacity in bytes
     */
    constructor(data = {}) {
        this.current = data.current || 0;
        this.total = data.total || 0;
    }

    /**
     * Creates a MemoryInfo instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {MemoryInfo} New MemoryInfo instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new MemoryInfo();
        }

        return new MemoryInfo({
            current: json.current || json[ServerFields.MEM_CURRENT] || 0,
            total: json.total || json[ServerFields.MEM_TOTAL] || 0
        });
    }

    /**
     * Converts the MemoryInfo instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            current: this.current,
            total: this.total
        };
    }

    /**
     * Returns a complete representation of the memory info.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            current: this.current,
            total: this.total
        };
    }
}

/**
 * Represents XRay status information.
 */
class XRayInfo {
    /**
     * Creates a new XRayInfo instance.
     * @param {Object} data - The XRay data
     * @param {string} data.state - XRay state (e.g. "running")
     * @param {string} data.errorMsg - Error message if any
     * @param {string} data.version - XRay version
     */
    constructor(data = {}) {
        this.state = data.state || "";
        this.errorMsg = data.errorMsg || "";
        this.version = data.version || "";
    }

    /**
     * Creates an XRayInfo instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {XRayInfo} New XRayInfo instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new XRayInfo();
        }

        return new XRayInfo({
            state: json.state || json[ServerFields.XRAY_STATE] || "",
            errorMsg: json.errorMsg || json[ServerFields.XRAY_ERROR_MSG] || "",
            version: json.version || json[ServerFields.XRAY_VERSION] || ""
        });
    }

    /**
     * Converts the XRayInfo instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            state: this.state,
            errorMsg: this.errorMsg,
            version: this.version
        };
    }

    /**
     * Returns a complete representation of the XRay info.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            state: this.state,
            errorMsg: this.errorMsg,
            version: this.version
        };
    }
}

/**
 * Represents network I/O information.
 */
class NetworkIO {
    /**
     * Creates a new NetworkIO instance.
     * @param {Object} data - The network I/O data
     * @param {number} data.up - Outgoing traffic
     * @param {number} data.down - Incoming traffic
     */
    constructor(data = {}) {
        this.up = data.up || 0;
        this.down = data.down || 0;
    }

    /**
     * Creates a NetworkIO instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {NetworkIO} New NetworkIO instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new NetworkIO();
        }

        return new NetworkIO({
            up: json.up || json[ServerFields.NET_IO_UP] || 0,
            down: json.down || json[ServerFields.NET_IO_DOWN] || 0
        });
    }

    /**
     * Converts the NetworkIO instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            up: this.up,
            down: this.down
        };
    }

    /**
     * Returns a complete representation of the network I/O.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            up: this.up,
            down: this.down
        };
    }
}

/**
 * Represents network traffic information.
 */
class NetworkTraffic {
    /**
     * Creates a new NetworkTraffic instance.
     * @param {Object} data - The network traffic data
     * @param {number} data.sent - Sent traffic
     * @param {number} data.recv - Received traffic
     */
    constructor(data = {}) {
        this.sent = data.sent || 0;
        this.recv = data.recv || 0;
    }

    /**
     * Creates a NetworkTraffic instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {NetworkTraffic} New NetworkTraffic instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new NetworkTraffic();
        }

        return new NetworkTraffic({
            sent: json.sent || json[ServerFields.NET_TRAFFIC_SENT] || 0,
            recv: json.recv || json[ServerFields.NET_TRAFFIC_RECV] || 0
        });
    }

    /**
     * Converts the NetworkTraffic instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            sent: this.sent,
            recv: this.recv
        };
    }

    /**
     * Returns a complete representation of the network traffic.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            sent: this.sent,
            recv: this.recv
        };
    }
}

/**
 * Represents public IP addresses information.
 */
class PublicIP {
    /**
     * Creates a new PublicIP instance.
     * @param {Object} data - The public IP data
     * @param {string} data.ipv4 - Public IPv4 address
     * @param {string} data.ipv6 - Public IPv6 address
     */
    constructor(data = {}) {
        this.ipv4 = data.ipv4 || "";
        this.ipv6 = data.ipv6 || "";
    }

    /**
     * Creates a PublicIP instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {PublicIP} New PublicIP instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new PublicIP();
        }

        return new PublicIP({
            ipv4: json.ipv4 || json[ServerFields.PUBLIC_IP_V4] || "",
            ipv6: json.ipv6 || json[ServerFields.PUBLIC_IP_V6] || ""
        });
    }

    /**
     * Converts the PublicIP instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            ipv4: this.ipv4,
            ipv6: this.ipv6
        };
    }

    /**
     * Returns a complete representation of the public IP.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            ipv4: this.ipv4,
            ipv6: this.ipv6
        };
    }
}

/**
 * Represents application statistics.
 */
class AppStats {
    /**
     * Creates a new AppStats instance.
     * @param {Object} data - The app stats data
     * @param {number} data.threads - Number of threads
     * @param {number} data.mem - Memory usage
     * @param {number} data.uptime - Uptime in seconds
     */
    constructor(data = {}) {
        this.threads = data.threads || 0;
        this.mem = data.mem || 0;
        this.uptime = data.uptime || 0;
    }

    /**
     * Creates an AppStats instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {AppStats} New AppStats instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new AppStats();
        }

        return new AppStats({
            threads: json.threads || json[ServerFields.APP_THREADS] || 0,
            mem: json.mem || json[ServerFields.APP_MEM] || 0,
            uptime: json.uptime || json[ServerFields.APP_UPTIME] || 0
        });
    }

    /**
     * Converts the AppStats instance to JSON format.
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            threads: this.threads,
            mem: this.mem,
            uptime: this.uptime
        };
    }

    /**
     * Returns a complete representation of the app stats.
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            threads: this.threads,
            mem: this.mem,
            uptime: this.uptime
        };
    }
}

/**
 * Represents server information in XUI API.
 */
class Server {
    /**
     * Creates a new Server instance.
     * @param {Object} data - The server data
     * @param {number} data.cpu - CPU usage percentage
     * @param {number} data.cpuCores - Number of physical CPU cores
     * @param {number} data.logicalPro - Number of logical processors
     * @param {number} data.cpuSpeedMhz - CPU frequency in MHz
     * @param {MemoryInfo} data.mem - Memory information
     * @param {MemoryInfo} data.swap - Swap memory information
     * @param {MemoryInfo} data.disk - Disk information
     * @param {XRayInfo} data.xray - XRay status information
     * @param {number} data.uptime - Server uptime in seconds
     * @param {Array<number>} data.loads - System load averages [1, 5, 15 minutes]
     * @param {number} data.tcpCount - Number of TCP connections
     * @param {number} data.udpCount - Number of UDP connections
     * @param {NetworkIO} data.netIO - Network I/O information
     * @param {NetworkTraffic} data.netTraffic - Network traffic information
     * @param {PublicIP} data.publicIP - Public IP addresses information
     * @param {AppStats} data.appStats - Application statistics
     */
    constructor(data = {}) {
        this.cpu = data.cpu || 0;
        this.cpuCores = data.cpuCores || 0;
        this.logicalPro = data.logicalPro || 0;
        this.cpuSpeedMhz = data.cpuSpeedMhz || 0;
        
        // Handle MemoryInfo objects
        if (data.mem instanceof MemoryInfo) {
            this.mem = data.mem;
        } else if (data.mem && typeof data.mem === 'object') {
            this.mem = MemoryInfo.fromJSON(data.mem);
        } else {
            this.mem = new MemoryInfo();
        }

        if (data.swap instanceof MemoryInfo) {
            this.swap = data.swap;
        } else if (data.swap && typeof data.swap === 'object') {
            this.swap = MemoryInfo.fromJSON(data.swap);
        } else {
            this.swap = new MemoryInfo();
        }

        if (data.disk instanceof MemoryInfo) {
            this.disk = data.disk;
        } else if (data.disk && typeof data.disk === 'object') {
            this.disk = MemoryInfo.fromJSON(data.disk);
        } else {
            this.disk = new MemoryInfo();
        }

        // Handle XRayInfo object
        if (data.xray instanceof XRayInfo) {
            this.xray = data.xray;
        } else if (data.xray && typeof data.xray === 'object') {
            this.xray = XRayInfo.fromJSON(data.xray);
        } else {
            this.xray = new XRayInfo();
        }

        this.uptime = data.uptime || 0;
        this.loads = Array.isArray(data.loads) ? data.loads : [];
        this.tcpCount = data.tcpCount || 0;
        this.udpCount = data.udpCount || 0;

        // Handle NetworkIO object
        if (data.netIO instanceof NetworkIO) {
            this.netIO = data.netIO;
        } else if (data.netIO && typeof data.netIO === 'object') {
            this.netIO = NetworkIO.fromJSON(data.netIO);
        } else {
            this.netIO = new NetworkIO();
        }

        // Handle NetworkTraffic object
        if (data.netTraffic instanceof NetworkTraffic) {
            this.netTraffic = data.netTraffic;
        } else if (data.netTraffic && typeof data.netTraffic === 'object') {
            this.netTraffic = NetworkTraffic.fromJSON(data.netTraffic);
        } else {
            this.netTraffic = new NetworkTraffic();
        }

        // Handle PublicIP object
        if (data.publicIP instanceof PublicIP) {
            this.publicIP = data.publicIP;
        } else if (data.publicIP && typeof data.publicIP === 'object') {
            this.publicIP = PublicIP.fromJSON(data.publicIP);
        } else {
            this.publicIP = new PublicIP();
        }

        // Handle AppStats object
        if (data.appStats instanceof AppStats) {
            this.appStats = data.appStats;
        } else if (data.appStats && typeof data.appStats === 'object') {
            this.appStats = AppStats.fromJSON(data.appStats);
        } else {
            this.appStats = new AppStats();
        }
    }

    /**
     * Creates a Server instance from JSON data.
     * @param {Object} json - JSON data from API response
     * @returns {Server} New Server instance
     */
    static fromJSON(json) {
        if (!json || typeof json !== 'object') {
            return new Server();
        }

        // Convert nested objects
        let mem = new MemoryInfo();
        if (json.mem && typeof json.mem === 'object') {
            mem = MemoryInfo.fromJSON(json.mem);
        }

        let swap = new MemoryInfo();
        if (json.swap && typeof json.swap === 'object') {
            swap = MemoryInfo.fromJSON(json.swap);
        }

        let disk = new MemoryInfo();
        if (json.disk && typeof json.disk === 'object') {
            disk = MemoryInfo.fromJSON(json.disk);
        }

        let xray = new XRayInfo();
        if (json.xray && typeof json.xray === 'object') {
            xray = XRayInfo.fromJSON(json.xray);
        }

        let netIO = new NetworkIO();
        if (json.netIO && typeof json.netIO === 'object') {
            netIO = NetworkIO.fromJSON(json.netIO);
        } else if (json[ServerFields.NET_IO] && typeof json[ServerFields.NET_IO] === 'object') {
            netIO = NetworkIO.fromJSON(json[ServerFields.NET_IO]);
        }

        let netTraffic = new NetworkTraffic();
        if (json.netTraffic && typeof json.netTraffic === 'object') {
            netTraffic = NetworkTraffic.fromJSON(json.netTraffic);
        } else if (json[ServerFields.NET_TRAFFIC] && typeof json[ServerFields.NET_TRAFFIC] === 'object') {
            netTraffic = NetworkTraffic.fromJSON(json[ServerFields.NET_TRAFFIC]);
        }

        let publicIP = new PublicIP();
        if (json.publicIP && typeof json.publicIP === 'object') {
            publicIP = PublicIP.fromJSON(json.publicIP);
        } else if (json[ServerFields.PUBLIC_IP] && typeof json[ServerFields.PUBLIC_IP] === 'object') {
            publicIP = PublicIP.fromJSON(json[ServerFields.PUBLIC_IP]);
        }

        let appStats = new AppStats();
        if (json.appStats && typeof json.appStats === 'object') {
            appStats = AppStats.fromJSON(json.appStats);
        } else if (json[ServerFields.APP_STATS] && typeof json[ServerFields.APP_STATS] === 'object') {
            appStats = AppStats.fromJSON(json[ServerFields.APP_STATS]);
        }

        return new Server({
            cpu: json.cpu || json[ServerFields.CPU] || 0,
            cpuCores: json.cpuCores || json[ServerFields.CPU_CORES] || 0,
            logicalPro: json.logicalPro || json[ServerFields.LOGICAL_PRO] || 0,
            cpuSpeedMhz: json.cpuSpeedMhz || json[ServerFields.CPU_SPEED_MHZ] || 0,
            mem: mem,
            swap: swap,
            disk: disk,
            xray: xray,
            uptime: json.uptime || json[ServerFields.UPTIME] || 0,
            loads: json.loads || json[ServerFields.LOADS] || [],
            tcpCount: json.tcpCount || json[ServerFields.TCP_COUNT] || 0,
            udpCount: json.udpCount || json[ServerFields.UDP_COUNT] || 0,
            netIO: netIO,
            netTraffic: netTraffic,
            publicIP: publicIP,
            appStats: appStats
        });
    }

    /**
     * Converts the Server instance to JSON format for API requests.
     * @returns {Object} JSON representation for API
     */
    toJSON() {
        return {
            cpu: this.cpu,
            cpuCores: this.cpuCores,
            logicalPro: this.logicalPro,
            cpuSpeedMhz: this.cpuSpeedMhz,
            mem: this.mem.toJSON(),
            swap: this.swap.toJSON(),
            disk: this.disk.toJSON(),
            xray: this.xray.toJSON(),
            uptime: this.uptime,
            loads: this.loads,
            tcpCount: this.tcpCount,
            udpCount: this.udpCount,
            netIO: this.netIO.toJSON(),
            netTraffic: this.netTraffic.toJSON(),
            publicIP: this.publicIP.toJSON(),
            appStats: this.appStats.toJSON()
        };
    }

    /**
     * Returns a complete representation of the server (for debugging/display).
     * @returns {Object} Complete object representation
     */
    toObject() {
        return {
            cpu: this.cpu,
            cpuCores: this.cpuCores,
            logicalPro: this.logicalPro,
            cpuSpeedMhz: this.cpuSpeedMhz,
            mem: this.mem.toObject(),
            swap: this.swap.toObject(),
            disk: this.disk.toObject(),
            xray: this.xray.toObject(),
            uptime: this.uptime,
            loads: this.loads,
            tcpCount: this.tcpCount,
            udpCount: this.udpCount,
            netIO: this.netIO.toObject(),
            netTraffic: this.netTraffic.toObject(),
            publicIP: this.publicIP.toObject(),
            appStats: this.appStats.toObject()
        };
    }
}

export default Server;
export { 
    ServerFields, 
    MemoryInfo, 
    XRayInfo, 
    NetworkIO, 
    NetworkTraffic, 
    PublicIP, 
    AppStats 
};
