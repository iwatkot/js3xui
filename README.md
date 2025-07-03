<div align="center" markdown>
<img src="">

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