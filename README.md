<div align="center" markdown>
<img src="https://github.com/iwatkot/js3xui/releases/download/0.0.1/poster.png">

Async Object-oriented JavaScript SDK for the 3x-ui API.

<p align="center">
    <a href="#Overview">Overview</a> •
    <a href="#Quick-Start">Quick Start</a> •
    <a href="#Examples">Examples</a> •
    <a href="#Bugs-and-Feature-Requests">Bugs and Feature Requests</a> •
    <a href="">NPM</a>
</p>

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/iwatkot/js3xui)](https://github.com/iwatkot/js3xui/releases)
[![GitHub issues](https://img.shields.io/github/issues/iwatkot/js3xui)](https://github.com/iwatkot/js3xui/issues)
[![Build Status](https://github.com/iwatkot/js3xui/actions/workflows/checks.yml/badge.svg)](https://github.com/iwatkot/js3xui/actions)
[![NPM - Downloads](https://img.shields.io/npm/dm/js3xui)](https://www.npmjs.com/package/js3xui)<br>
[![NPM - Node Version](https://img.shields.io/npm/v/js3xui)](https://www.npmjs.com/package/js3xui/)

_ℹ️ If you need a Python SDK, check out [py3xui](https://github.com/iwatkot/py3xui)._
</div>

## Overview
This SDK is designed to interact with the [3x-ui](https://github.com/MHSanaei/3x-ui) app in a more object-oriented way.

Used dependencies:
- [axios](https://axios-http.com/)
- [axios-cookiejar-support](https://www.npmjs.com/package/axios-cookiejar-support)
- [tough-cookie](https://www.npmjs.com/package/tough-cookie)

Since the 3x-ui app is under development, the SDK may not be compatible with all versions of the app. The developer of SDK is not related to the 3x-ui app, therefore the latest versions of the software are not guaranteed to be compatible with the SDK. <br>
The SDK does not support versions of the 3x-ui older than `2.3.7`.

## Quick Start
After installing the SDK, you can create a new instance of the API. <br>
On creation, the Api won't connect to the 3x-ui app, so you can spawn new instances without spending resources. But after creating an instance, you'll need to call the `login` method to authenticate the user and save the cookie for future requests.

### Installation
```bash
npm install js3xui
```

### Create a new instance of the API

```javascript
import Api from 'js3xui';

const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);
```

*️⃣ If you're using a custom URI Path, ensure that you've added it to the host, for example:<br>
If your host is `http://your-3x-ui-host.com:2053` and the URI Path is `/test/`, then the host should be `http://your-3x-ui-host.com:2053/test/`.<br>
Otherwise, all API requests will fail with a `404` error.  

*️⃣ If you're using a secret token, which is set in in the 3x-ui panel, you'll also add it, otherwise all API request will fail.<br>

```javascript
const api = new Api(host, user, password, 'your-secret-token');
```

### Using TLS and custom certificates
Interacting with server over HTTPS requires careful management of TLS verification to ensure secure communications. This SDK provides options for setting TLS configurations, which include specifying custom certificates for increased trust or disabling TLS verification when necessary.

#### Case 1: Disabling TLS verification
For development, you can disable TLS verification. This is not recommended for production due to the increased risk of security threats like man-in-the-middle attacks.
```javascript
const api = new Api("http://your-3x-ui-host.com:2053", "your-username", "your-password", { useTlsVerify: false })
```

#### Case 2: Using сustom сertificates
If you are interacting with a server that uses a self-signed certificate or one not recognized by the standard CA bundle, you can specify a custom certificate path:

```javascript
const api = new Api("http://your-3x-ui-host.com:2053", "your-username", "your-password", { customCertificatePath: "/path/to/your/certificate.pem" })
```

This allows you to maintain TLS verification by providing a trusted certificate explicitly.

### Login
Before making a calls you'll need to call the `login` method to authenticate the user and save the cookie for future requests.

```javascript
const api = new Api(host, user, password);
await api.login();
```

#### Using two-factor authentication
If you enabled two-factor authentication in the 3x-ui app, you'll need to pass the two-factor code to the `login` method. The code can be either a string or an integer.

```javascript
const api = new Api(host, user, password);
await api.login("your-2fa-code");
```

Note, that the two-factor code is being changed every 30 seconds, so you need to ensure that you pass the correct code when calling the `login` method. If you don't pass the code, the login will fail.  
Keep in mind, that the session cookie has it's own expiration time, so you may need to call the `login` method again after some time while providing the new two-factor code. So, it's recommended to have some sort of automation to retrieve the valid two-factor code from time to time.

## Examples
You'll find detailed docs with usage examples [here](src/README.md), however in this section you'll find some basic examples of how to use the SDK.

### Set the traffic limit for the client

```javascript
import Api from 'js3xui';

// 1️⃣ Create an instance of the API class.
const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);

// 2️⃣ Login to the 3x-ui app.
await api.login();

const user_email = "iwatkot";  // ⬅️ Your user email here.
const inbound_id = 4;  // ⬅️ Your inbound ID here.

// 3️⃣ Get the inbound.
const inbound = await api.inbounds.getById(inbound_id);
console.log(inbound.remark); // ⬅️ Print the inbound remark (name) to the console.

// 4️⃣ Find the needed client in the inbound.
const existingClient = inbound.client.find(c => c.email === user_email);

if (!existingClient) {
    throw new Error(`Client with email ${user_email} not found in the inbound.`);
} else {
    const clientUuid = existingClient.id; // ⬅️ The actual Client UUID.
    console.log(`Client found with UUID: ${clientUuid}`);
}

// 5️⃣ Get the Client from the API.
const client = await api.client.getByEmail(user_email);

// 6️⃣ Update the client with needed parameters.
client.totalGb = 100 * 1024 * 1024; // ⬅️ Your traffic limit here.

/* 7️⃣ Update the client.id to the previously obtained client UUID.
 * This is important, because different endpoints of the 3X-UI API return ID in different formats.
 * For example, client.getByEmail returns the client ID as a numeric value, while for updating the
 * client you need to use the UUID format.
*/
client.id = clientUuid; // ⬅️ Setting the correct client UUID for successful update.

// 8️⃣ Update the client in the API.
await api.client.update(client.id, client);
console.log(`Client ${user_email} updated with new traffic limit.`);
```

### Create a connection string and QR code
When you need to provide the user with a connection string that can be used in a software to create a new connection profile and/or a QR code, you can use the following example.

```javascript
import { Inbound } from 'js3xui';

const XUI_EXTERNAL_IP = "**********";  // ⬅️ Your external IP here or domain name.
const MAIN_REMARK = "yourremarkhere";  // ⬅️ It can be any string.
const SERVER_PORT = 443;  // ⬅️ Your server port here.

/**
 * Prepare a connection string for the given inbound, user UUID and user email.
 * 
 * @param {Inbound} inbound - The inbound object.
 * @param {string} userUuid - The UUID of the user.
 * @param {string} userEmail - The email of the user.
 * @returns {string} The connection string.
 */
function getConnectionString(inbound, userUuid, userEmail) {
    const publicKey = inbound.streamSettings.realitySettings.settings.publicKey;
    const websiteName = inbound.streamSettings.realitySettings.serverNames[0];
    const shortId = inbound.streamSettings.realitySettings.shortIds[0];

    const connectionString = 
        `vless://${userUuid}@${XUI_EXTERNAL_IP}:${SERVER_PORT}` +
        `?type=tcp&security=reality&pbk=${publicKey}&fp=firefox&sni=${websiteName}` +
        `&sid=${shortId}&spx=%2F#${MAIN_REMARK}-${userEmail}`;

    return connectionString;
}
```

When you have the connection string, you can use the `qrcode` library to generate a QR code:

```bash
npm install qrcode
```

```javascript
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// 1️⃣ Obtain the connection string (from the previous example)
const userEmail = "iwatkot";  // ⬅️ Your user email here.
const connectionString = getConnectionString(inbound, client.id, userEmail);

// 2️⃣ Create the QR code as a data URL (base64)
const qrCodeDataURL = await QRCode.toDataURL(connectionString);

// 3️⃣ Or save the QR code directly to a file
const qrcodesDir = 'qrcodes';
if (!fs.existsSync(qrcodesDir)) {
    fs.mkdirSync(qrcodesDir, { recursive: true });
}

const qrcodePath = path.join(qrcodesDir, `${userEmail}.png`);
await QRCode.toFile(qrcodePath, connectionString);

console.log(`QR code saved to: ${qrcodePath}`);

// Now you can use the qrcodePath or qrCodeDataURL to share with the user
```

### Get inbounds list

```javascript
import Api from 'js3xui';

const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);
await api.login();

const inbounds = await api.inbounds.getList();

for (const inbound of inbounds) {
    console.log(`Inbound ID: ${inbound.id}, Remark: ${inbound.remark}`);
}
```

### Add a new inbound

```javascript
import Api from 'js3xui';
import { Inbound, Settings, Sniffing, StreamSettings } from 'js3xui';

const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);
await api.login();

// 1️⃣ Create settings objects
const settings = new Settings();
const sniffing = new Sniffing({ enabled: true });

// 2️⃣ Configure TCP settings
const tcpSettings = {
    acceptProxyProtocol: false,
    header: { type: "none" }
};

// 3️⃣ Create stream settings
const streamSettings = new StreamSettings({
    security: "reality",
    network: "tcp",
    tcpSettings: tcpSettings
});

// 4️⃣ Create the inbound
const inbound = new Inbound({
    enable: true,
    port: 443,
    protocol: "vless",
    settings: settings,
    streamSettings: streamSettings,
    sniffing: sniffing,
    remark: "test3"
});

// 5️⃣ Add the inbound to the server
await api.inbounds.add(inbound);
console.log("Inbound added successfully!");
```

### Get a client by email

```javascript
import Api from 'js3xui';

const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);
await api.login();

const client = await api.client.getByEmail("some-email");
console.log(`Client found: ${client.email}, ID: ${client.id}`);
```

### Add a new client

```javascript
import Api from 'js3xui';
import { Client } from 'js3xui';
import { randomUUID } from 'crypto';

const host = 'http://localhost:3000'; // 3x-ui host
const user = 'admin'; // 3x-ui username
const password = 'admin'; // 3x-ui password

const api = new Api(host, user, password);
await api.login();

// 1️⃣ Create a new client
const newClient = new Client({
    id: randomUUID(),
    email: "test@example.com",
    enable: true
});

const inboundId = 1;  // ⬅️ Your inbound ID here

// 2️⃣ Add the client to the inbound
await api.client.add(inboundId, [newClient]);
console.log(`Client ${newClient.email} added successfully to inbound ${inboundId}!`);
```

## Bugs and Feature Requests
If you find a bug or have a feature request, please open an issue on the GitHub repository.<br>
You're also welcome to contribute to the project by opening a pull request.