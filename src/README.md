# js3xui Documentation

*Automatically generated from JSDoc comments*

## Overview

js3xui is an async object-oriented JavaScript SDK for the 3x-ui API. It provides a high-level interface to interact with the XUI API, including client, inbound, and database operations.

## Installation

```bash
npm install js3xui
```

## Quick Start

```javascript
import Api from 'js3xui';

const api = new Api('https://your-server.com', 'username', 'password');
await api.login();

// Use the API
const clients = await api.client.getAll();
console.log(clients);
```

---

## API Reference

## Classes

<dl>
<dt><a href="#Api">Api</a></dt>
<dd><p>This class provides a high-level interface to interact with the XUI API.
Access to the client, inbound, and database APIs is provided through this class.</p>
</dd>
<dt><a href="#BaseApi">BaseApi</a></dt>
<dd><p>Base class for the XUI API. Contains common methods for making requests.</p>
</dd>
<dt><a href="#ClientApi">ClientApi</a></dt>
<dd><p>API class for managing client connections.
Inherits from BaseApi to provide client-specific functionality.</p>
</dd>
<dt><a href="#InboundApi">InboundApi</a></dt>
<dd><p>API class for managing inbound connections.
Inherits from BaseApi to provide inbound-specific functionality.</p>
</dd>
<dt><a href="#ServerApi">ServerApi</a></dt>
<dd><p>This class provides methods to interact with the server API, such as downloading the database.
It extends the BaseApi class to inherit common API functionality.</p>
</dd>
<dt><a href="#Client">Client</a></dt>
<dd><p>Represents a client in the XUI API.</p>
</dd>
<dt><a href="#Inbound">Inbound</a></dt>
<dd><p>Represents an inbound connection in the XUI API.</p>
</dd>
<dt><a href="#Settings">Settings</a></dt>
<dd><p>Represents the settings for an inbound connection.</p>
</dd>
<dt><a href="#Sniffing">Sniffing</a></dt>
<dd><p>Represents the sniffing settings for an inbound connection.</p>
</dd>
<dt><a href="#StreamSettings">StreamSettings</a></dt>
<dd><p>Represents the stream settings for an inbound connection.</p>
</dd>
</dl>

<a name="Api"></a>

## Api
This class provides a high-level interface to interact with the XUI API.
Access to the client, inbound, and database APIs is provided through this class.

**Kind**: global class  

* [Api](#Api)
    * [new Api(host, username, password, [useTlsVerify], [customCertificatePath], [logger])](#new_Api_new)
    * _instance_
        * [.login([twoFactorCode])](#Api+login) ⇒ <code>Promise.&lt;void&gt;</code>
    * _static_
        * [.fromEnv([logger])](#Api.fromEnv) ⇒ [<code>ClientApi</code>](#ClientApi)

<a name="new_Api_new"></a>

### new Api(host, username, password, [useTlsVerify], [customCertificatePath], [logger])
Creates an instance of Api.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| host | <code>string</code> |  | The host URL |
| username | <code>string</code> |  | The username for authentication |
| password | <code>string</code> |  | The password for authentication |
| [useTlsVerify] | <code>boolean</code> | <code>true</code> | Whether to verify TLS certificates |
| [customCertificatePath] | <code>string</code> \| <code>null</code> | <code>null</code> | Path to custom certificate |
| [logger] | <code>\*</code> | <code></code> | Optional logger instance |

<a name="Api+login"></a>

### api.login([twoFactorCode]) ⇒ <code>Promise.&lt;void&gt;</code>
Logs in to the XUI API and establishes a session.

**Kind**: instance method of [<code>Api</code>](#Api)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise that resolves when login is complete  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [twoFactorCode] | <code>string</code> \| <code>null</code> | <code>null</code> | Optional two-factor authentication code |

<a name="Api.fromEnv"></a>

### Api.fromEnv([logger]) ⇒ [<code>ClientApi</code>](#ClientApi)
Returns the instance of the Client API if the require environment variables are set.
List of required environment variables:
- `XUI_API_HOST`: The host URL for the XUI API
- `XUI_API_USERNAME`: The username for authentication
- `XUI_API_PASSWORD`: The password for authentication

List of optional environment variables:
- `TLS_VERIFY`: Whether to verify TLS certificates (default: true)
- `TLS_CERT_PATH`: Path to a custom TLS certificate (default: null)

**Kind**: static method of [<code>Api</code>](#Api)  
**Returns**: [<code>ClientApi</code>](#ClientApi) - The Client API instance  
**Throws**:

- <code>Error</code> If the required environment variables are not set


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [logger] | <code>Object</code> | <code></code> | Optional logger instance to use for logging |

**Example**  
```js
process.env.XUI_HOST = 'https://your-host.com';
process.env.XUI_USERNAME = 'your-username';
process.env.XUI_PASSWORD = 'your-password';

const api = Api.fromEnv();
await api.login();
```
<a name="BaseApi"></a>

## BaseApi
Base class for the XUI API. Contains common methods for making requests.

**Kind**: global class  

* [BaseApi](#BaseApi)
    * [new BaseApi(host, username, password, [useTlsVerify], [customCertificatePath], [logger], [sharedCookieJar], [sharedAxiosInstance])](#new_BaseApi_new)
    * [._requestWithRetry(method, url, [headers], [options], [skipCheck])](#BaseApi+_requestWithRetry) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [._checkResponse(response)](#BaseApi+_checkResponse) ⇒ <code>Promise.&lt;void&gt;</code>
    * [._sleep(ms)](#BaseApi+_sleep) ⇒ <code>Promise.&lt;void&gt;</code>
    * [._url(endpoint)](#BaseApi+_url) ⇒ <code>string</code>
    * [._post(url, [headers], [data], [options])](#BaseApi+_post) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [._get(url, [headers], [options])](#BaseApi+_get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.login([twoFactorCode])](#BaseApi+login) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_BaseApi_new"></a>

### new BaseApi(host, username, password, [useTlsVerify], [customCertificatePath], [logger], [sharedCookieJar], [sharedAxiosInstance])
Creates an instance of BaseApi.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| host | <code>string</code> |  | The host URL |
| username | <code>string</code> |  | The username for authentication |
| password | <code>string</code> |  | The password for authentication |
| [useTlsVerify] | <code>boolean</code> | <code>true</code> | Whether to verify TLS certificates |
| [customCertificatePath] | <code>string</code> \| <code>null</code> | <code>null</code> | Path to custom certificate |
| [logger] | <code>\*</code> | <code></code> | Optional logger instance |
| [sharedCookieJar] | <code>CookieJar</code> | <code></code> | Optional shared cookie jar |
| [sharedAxiosInstance] | <code>\*</code> | <code></code> | Optional shared axios instance |

<a name="BaseApi+_requestWithRetry"></a>

### baseApi.\_requestWithRetry(method, url, [headers], [options], [skipCheck]) ⇒ <code>Promise.&lt;Object&gt;</code>
Makes HTTP requests with automatic retry logic and error handling.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise resolving to axios response object  
**Throws**:

- <code>Error</code> Throws error if request fails after all retries


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| method | <code>string</code> |  | HTTP method (GET, POST, etc.) |
| url | <code>string</code> |  | Full URL to make the request to |
| [headers] | <code>Object</code> | <code>{}</code> | HTTP headers to include |
| [options] | <code>Object</code> | <code>{}</code> | Additional request options |
| [skipCheck] | <code>boolean</code> | <code>false</code> | Whether to skip response validation |

<a name="BaseApi+_checkResponse"></a>

### baseApi.\_checkResponse(response) ⇒ <code>Promise.&lt;void&gt;</code>
Validates the API response format and checks for success status.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise that resolves if response is valid  
**Throws**:

- <code>Error</code> Throws error if response indicates failure


| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | Axios response object |
| response.data | <code>Object</code> | Response data containing API fields |

<a name="BaseApi+_sleep"></a>

### baseApi.\_sleep(ms) ⇒ <code>Promise.&lt;void&gt;</code>
Utility method to pause execution for a specified duration.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise that resolves after the specified delay  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Number of milliseconds to sleep |

<a name="BaseApi+_url"></a>

### baseApi.\_url(endpoint) ⇒ <code>string</code>
Constructs a complete URL by combining the host with an endpoint.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>string</code> - Complete URL for the API request  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | API endpoint path |

<a name="BaseApi+_post"></a>

### baseApi.\_post(url, [headers], [data], [options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Makes a POST request to the specified URL.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise resolving to axios response object  
**Throws**:

- <code>Error</code> Throws error if request fails


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL to send the POST request to |
| [headers] | <code>Object</code> | <code>{}</code> | HTTP headers to include |
| [data] | <code>Object</code> | <code>{}</code> | Data to send in the request body |
| [options] | <code>Object</code> | <code>{}</code> | Additional request options |

<a name="BaseApi+_get"></a>

### baseApi.\_get(url, [headers], [options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Makes a GET request to the specified URL.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise resolving to axios response object  
**Throws**:

- <code>Error</code> Throws error if request fails


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL to send the GET request to |
| [headers] | <code>Object</code> | <code>{}</code> | HTTP headers to include |
| [options] | <code>Object</code> | <code>{}</code> | Additional request options |

<a name="BaseApi+login"></a>

### baseApi.login([twoFactorCode]) ⇒ <code>Promise.&lt;void&gt;</code>
Authenticates with the XUI API and establishes a session.

**Kind**: instance method of [<code>BaseApi</code>](#BaseApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise that resolves when login is successful  
**Throws**:

- <code>Error</code> Throws error if login fails or no session cookie is received


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [twoFactorCode] | <code>string</code> \| <code>null</code> | <code>null</code> | Optional two-factor authentication code |

<a name="ClientApi"></a>

## ClientApi
API class for managing client connections.
Inherits from BaseApi to provide client-specific functionality.

**Kind**: global class  

* [ClientApi](#ClientApi)
    * [.getByEmail(email)](#ClientApi+getByEmail) ⇒ <code>Promise.&lt;(Client\|null)&gt;</code>
    * [.getIps(email)](#ClientApi+getIps) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.add(inboundId, clients)](#ClientApi+add) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.update(clientId, client)](#ClientApi+update) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.resetIps(email)](#ClientApi+resetIps) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.resetStats(inboundId, email)](#ClientApi+resetStats) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.delete(inboundId, clientId)](#ClientApi+delete) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.deleteDepleted(inboundId)](#ClientApi+deleteDepleted) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.online()](#ClientApi+online) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getTrafficById(clientId)](#ClientApi+getTrafficById) ⇒ <code>Promise.&lt;Array.&lt;Client&gt;&gt;</code>

<a name="ClientApi+getByEmail"></a>

### clientApi.getByEmail(email) ⇒ <code>Promise.&lt;(Client\|null)&gt;</code>
Retrieves information about a specific client based on their email.
This endpoint provides details such as traffic statistics and other relevant information
related to the client.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;(Client\|null)&gt;</code> - The client object if found, otherwise null  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email of the client to retrieve |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const client = await api.client.getByEmail("user@example.com");
```
<a name="ClientApi+getIps"></a>

### clientApi.getIps(email) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Retrieves a list of IP addresses associated with a specific client.
This endpoint provides the IPs that the client has used to connect to the service.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - An array of IP addresses associated with the client  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email of the client to retrieve IPs for |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const ips = await api.client.getIps("user@example.com");
```
<a name="ClientApi+add"></a>

### clientApi.add(inboundId, clients) ⇒ <code>Promise.&lt;void&gt;</code>
Adds one or more clients to a specific inbound connection.
This endpoint allows you to associate clients with an inbound connection,
enabling them to access the service through that connection.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the clients are successfully added  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the inbound connection to add clients to |
| clients | [<code>Array.&lt;Client&gt;</code>](#Client) | An array of Client objects to be added |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const newClientId = crypto.randomUUID();
const newClient = new Client({ email: "user@example.com", enable: true, id: newClientId });
await api.client.add(1, [newClient]);
```
<a name="ClientApi+update"></a>

### clientApi.update(clientId, client) ⇒ <code>Promise.&lt;void&gt;</code>
Updates an existing client in a specific inbound connection.
This endpoint allows you to modify the details of a client associated with an inbound connection.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the client is successfully updated  

| Param | Type | Description |
| --- | --- | --- |
| clientId | <code>string</code> | The ID of the client to update |
| client | [<code>Client</code>](#Client) | The Client object containing updated information |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
let existingClient = await api.client.getByEmail("user@example.com");
if (existingClient) {
  existingClient.tgId = "123456789"; // Example tgId, replace with actual value if needed
  await api.client.update(existingClient.id, existingClient);
}
```
<a name="ClientApi+resetIps"></a>

### clientApi.resetIps(email) ⇒ <code>Promise.&lt;void&gt;</code>
Resets the IP addresses associated with a specific client.
This endpoint clears all IPs that the client has used to connect to the service,
effectively resetting their connection history.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the IPs are successfully reset  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email of the client whose IPs should be reset |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
await api.client.resetIps("user@example.com");
```
<a name="ClientApi+resetStats"></a>

### clientApi.resetStats(inboundId, email) ⇒ <code>Promise.&lt;void&gt;</code>
Resets the traffic statistics for a specific client.
This endpoint clears all traffic data associated with the client,
allowing them to start fresh with their usage statistics.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the stats are successfully reset  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the inbound connection the client is associated with |
| email | <code>string</code> | The email of the client whose stats should be reset |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const inboundId = 1; // Example inbound ID
await api.client.resetStats(inboundId, "user@example.com");
```
<a name="ClientApi+delete"></a>

### clientApi.delete(inboundId, clientId) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a specific client from an inbound connection.
This endpoint removes the client from the inbound, effectively terminating their access.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the client is successfully deleted  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the inbound connection to delete the client from |
| clientId | <code>string</code> | The ID of the client to be deleted |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const inboundId = 1; // Example inbound ID
const clientId = "client-id-123"; // Example client ID
await api.client.delete(inboundId, clientId);
```
<a name="ClientApi+deleteDepleted"></a>

### clientApi.deleteDepleted(inboundId) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes all clients from an inbound connection that have no traffic.
This endpoint cleans up the inbound by removing clients that are no longer active.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when depleted clients are successfully deleted  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the inbound connection to delete depleted clients from |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const inboundId = 1; // Example inbound ID
await api.client.deleteDepleted(inboundId);
```
<a name="ClientApi+online"></a>

### clientApi.online() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Retrieves a list of online clients currently connected to the service.
This endpoint provides information about clients that are actively using the service.
The array contains emails of the clients only.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - An array of emails of online clients.  
**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const onlineClients = await api.client.online();
```
<a name="ClientApi+getTrafficById"></a>

### clientApi.getTrafficById(clientId) ⇒ <code>Promise.&lt;Array.&lt;Client&gt;&gt;</code>
Retrieves traffic information for a specific client by their ID.
This endpoint provides traffic statistics and other relevant information
related to the client identified by their unique ID.

**Kind**: instance method of [<code>ClientApi</code>](#ClientApi)  
**Returns**: <code>Promise.&lt;Array.&lt;Client&gt;&gt;</code> - An array of Client objects if found, otherwise empty array  

| Param | Type | Description |
| --- | --- | --- |
| clientId | <code>string</code> | The ID of the client to retrieve traffic for |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const clients = await api.client.getTrafficById("client-id-123");
```
<a name="InboundApi"></a>

## InboundApi
API class for managing inbound connections.
Inherits from BaseApi to provide inbound-specific functionality.

**Kind**: global class  

* [InboundApi](#InboundApi)
    * [.getList()](#InboundApi+getList) ⇒ <code>Promise.&lt;Array.&lt;Inbound&gt;&gt;</code>
    * [.add(inbound)](#InboundApi+add) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.delete(inbound)](#InboundApi+delete) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.update(inboundId, inbound)](#InboundApi+update) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.resetStats()](#InboundApi+resetStats) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.resetClientStats(inboundId)](#InboundApi+resetClientStats) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="InboundApi+getList"></a>

### inboundApi.getList() ⇒ <code>Promise.&lt;Array.&lt;Inbound&gt;&gt;</code>
Retrieves a comprehensive list of all inbounds along with their associated
client options and statistics.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;Array.&lt;Inbound&gt;&gt;</code> - A list of Inbound objects  
**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const inbounds = await api.inbound.getList();
```
<a name="InboundApi+add"></a>

### inboundApi.add(inbound) ⇒ <code>Promise.&lt;void&gt;</code>
Adds a new inbound connection.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the inbound is added successfully  

| Param | Type | Description |
| --- | --- | --- |
| inbound | [<code>Inbound</code>](#Inbound) | The Inbound instance to add |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const newInbound = new Inbound({ enable: true, port: 8080, protocol: 'vmess' });
await api.inbound.add(newInbound);
```
<a name="InboundApi+delete"></a>

### inboundApi.delete(inbound) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes an existing inbound connection by its ID.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the inbound is deleted successfully  

| Param | Type | Description |
| --- | --- | --- |
| inbound | [<code>Inbound</code>](#Inbound) | The Inbound instance to delete |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const existingInbound = await api.inbound.getById(1);
existingInbound.port = 9090; // Change port
await api.inbound.update(existingInbound);
```
<a name="InboundApi+update"></a>

### inboundApi.update(inboundId, inbound) ⇒ <code>Promise.&lt;void&gt;</code>
Updates an existing inbound connection.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the inbound is updated successfully  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the Inbound to update |
| inbound | [<code>Inbound</code>](#Inbound) | The updated Inbound instance |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const existingInbound = await api.inbound.getById(1);
existingInbound.remark = "Updated Remark"; // Change remark
await api.inbound.update(existingInbound.id, existingInbound);
```
<a name="InboundApi+resetStats"></a>

### inboundApi.resetStats() ⇒ <code>Promise.&lt;void&gt;</code>
Resets the traffic statistics for all inbounds.
NOTE: THIS WILL RESET ALL TRAFFIC STATS FOR ALL INBOUNDS! USE WITH CAUTION!
If you need to reset stats for a specific inbound, use the `resetClientStats` method instead.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the stats are reset successfully  
**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
await api.inbound.resetStats();
```
<a name="InboundApi+resetClientStats"></a>

### inboundApi.resetClientStats(inboundId) ⇒ <code>Promise.&lt;void&gt;</code>
Resets the traffic statistics for all clients associated with a specific inbound.

**Kind**: instance method of [<code>InboundApi</code>](#InboundApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the client stats are reset successfully  

| Param | Type | Description |
| --- | --- | --- |
| inboundId | <code>number</code> | The ID of the inbound to reset client stats for |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
await api.inbound.resetClientStats(1);
```
<a name="ServerApi"></a>

## ServerApi
This class provides methods to interact with the server API, such as downloading the database.
It extends the BaseApi class to inherit common API functionality.

**Kind**: global class  

* [ServerApi](#ServerApi)
    * [.getDb(savePath)](#ServerApi+getDb) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getStatus()](#ServerApi+getStatus) ⇒ <code>Promise.&lt;(Server\|null)&gt;</code>

<a name="ServerApi+getDb"></a>

### serverApi.getDb(savePath) ⇒ <code>Promise.&lt;void&gt;</code>
Saves the current database to a specified file path.

**Kind**: instance method of [<code>ServerApi</code>](#ServerApi)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the database is successfully saved  
**Throws**:

- <code>Error</code> Throws an error if the download fails or the response is not successful


| Param | Type | Description |
| --- | --- | --- |
| savePath | <code>string</code> | The file path where the database will be saved |

**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const savePath = "db_backup.db";
await api.getDb(savePath);
```
<a name="ServerApi+getStatus"></a>

### serverApi.getStatus() ⇒ <code>Promise.&lt;(Server\|null)&gt;</code>
Retrieves the current server status.

**Kind**: instance method of [<code>ServerApi</code>](#ServerApi)  
**Returns**: <code>Promise.&lt;(Server\|null)&gt;</code> - Resolves to a Server object containing server status, or null if not available  
**Example**  
```js
const api = new Api('host', 'user', 'pass');
await api.login();
const status = await api.getStatus();
console.log(status);
```
<a name="Client"></a>

## Client
Represents a client in the XUI API.

**Kind**: global class  

* [Client](#Client)
    * [new Client(data)](#new_Client_new)
    * _instance_
        * [.toJSON()](#Client+toJSON) ⇒ <code>Object</code>
        * [.toObject()](#Client+toObject) ⇒ <code>Object</code>
        * [.toString()](#Client+toString) ⇒ <code>string</code>
    * _static_
        * [.fromJSON(json)](#Client.fromJSON) ⇒ [<code>Client</code>](#Client)

<a name="new_Client_new"></a>

### new Client(data)
Creates a new Client instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The client data |
| data.email | <code>string</code> |  | The email of the client. Required. |
| data.enable | <code>boolean</code> |  | Whether the client is enabled. Required. |
| [data.password] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The password of the client. Optional. |
| [data.id] | <code>number</code> \| <code>string</code> \| <code>null</code> | <code></code> | The ID of the client. Optional. |
| [data.inboundId] | <code>number</code> \| <code>null</code> | <code></code> | The ID of the inbound connection. Optional. |
| [data.up] | <code>number</code> | <code>0</code> | The upload speed of the client. Optional. |
| [data.down] | <code>number</code> | <code>0</code> | The download speed of the client. Optional. |
| [data.expiryTime] | <code>number</code> | <code>0</code> | The expiry time of the client. Optional. |
| [data.total] | <code>number</code> | <code>0</code> | The total amount of data transferred by the client. Optional. |
| [data.reset] | <code>number</code> \| <code>null</code> | <code></code> | The time at which the client's data was last reset. Optional. |
| [data.flow] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The flow of the client. Optional. |
| [data.method] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The method (encryption cipher) used by the client. Optional. |
| [data.limitIp] | <code>number</code> | <code>0</code> | The limit of IPs for the client. Optional. |
| [data.subId] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The sub ID of the client. Optional. |
| [data.tgId] | <code>number</code> \| <code>string</code> | <code>&quot;&quot;</code> | The Telegram ID of the client. Optional. |
| [data.totalGb] | <code>number</code> | <code>0</code> | The total amount of data transferred by the client in GB. Optional. |

<a name="Client+toJSON"></a>

### client.toJSON() ⇒ <code>Object</code>
Converts the Client instance to JSON format for API requests.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Object</code> - JSON representation for API  
<a name="Client+toObject"></a>

### client.toObject() ⇒ <code>Object</code>
Returns a complete representation of the client (for debugging/display).

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Object</code> - Complete object representation  
<a name="Client+toString"></a>

### client.toString() ⇒ <code>string</code>
Returns a readable string representation of the client.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>string</code> - String representation  
<a name="Client.fromJSON"></a>

### Client.fromJSON(json) ⇒ [<code>Client</code>](#Client)
Creates a Client instance from JSON data (from API response).
Handles field name mapping from API format.

**Kind**: static method of [<code>Client</code>](#Client)  
**Returns**: [<code>Client</code>](#Client) - A new Client instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | The JSON data from API |

<a name="Inbound"></a>

## Inbound
Represents an inbound connection in the XUI API.

**Kind**: global class  

* [Inbound](#Inbound)
    * [new Inbound(data)](#new_Inbound_new)
    * _instance_
        * [.toJSON()](#Inbound+toJSON) ⇒ <code>Object</code>
        * [.toObject()](#Inbound+toObject) ⇒ <code>Object</code>
    * _static_
        * [.fromJSON(json)](#Inbound.fromJSON) ⇒ [<code>Inbound</code>](#Inbound)

<a name="new_Inbound_new"></a>

### new Inbound(data)
Creates a new Inbound instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The inbound data |
| data.enable | <code>boolean</code> |  | Whether the inbound connection is enabled. Required. |
| data.port | <code>number</code> |  | The port number for the inbound connection. Required. |
| data.protocol | <code>string</code> |  | The protocol for the inbound connection. Required. |
| data.settings | [<code>Settings</code>](#Settings) |  | The settings for the inbound connection. Required. |
| [data.streamSettings] | [<code>StreamSettings</code>](#StreamSettings) | <code>&quot;&quot;</code> | The stream settings for the inbound connection. Optional. |
| data.sniffing | [<code>Sniffing</code>](#Sniffing) |  | The sniffing settings for the inbound connection. Required. |
| [data.listen] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The listen address for the inbound connection. Optional. |
| [data.remark] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The remark for the inbound connection. Optional. |
| [data.id] | <code>number</code> | <code>0</code> | The ID of the inbound connection. Optional. |
| [data.up] | <code>number</code> | <code>0</code> | The up value for the inbound connection. Optional. |
| [data.down] | <code>number</code> | <code>0</code> | The down value for the inbound connection. Optional. |
| [data.total] | <code>number</code> | <code>0</code> | The total value for the inbound connection. Optional. |
| [data.expiryTime] | <code>number</code> | <code>0</code> | The expiry time for the inbound connection. Optional. |
| [data.clientStats] | [<code>Array.&lt;Client&gt;</code>](#Client) | <code>[]</code> | The client stats for the inbound connection. Optional. |
| [data.tag] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The tag for the inbound connection. Optional. |

<a name="Inbound+toJSON"></a>

### inbound.toJSON() ⇒ <code>Object</code>
Converts the Inbound instance to JSON format for API requests.
Only includes fields needed for API operations.

**Kind**: instance method of [<code>Inbound</code>](#Inbound)  
**Returns**: <code>Object</code> - JSON representation for API  
<a name="Inbound+toObject"></a>

### inbound.toObject() ⇒ <code>Object</code>
Returns a complete representation of the inbound (for debugging/display).

**Kind**: instance method of [<code>Inbound</code>](#Inbound)  
**Returns**: <code>Object</code> - Complete object representation  
<a name="Inbound.fromJSON"></a>

### Inbound.fromJSON(json) ⇒ [<code>Inbound</code>](#Inbound)
Creates an Inbound instance from JSON data (from API response).
Handles field name mapping from API format.

**Kind**: static method of [<code>Inbound</code>](#Inbound)  
**Returns**: [<code>Inbound</code>](#Inbound) - A new Inbound instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | The JSON data from API |

<a name="Settings"></a>

## Settings
Represents the settings for an inbound connection.

**Kind**: global class  

* [Settings](#Settings)
    * [new Settings(data)](#new_Settings_new)
    * _instance_
        * [.toJSON()](#Settings+toJSON) ⇒ <code>Object</code>
        * [.toObject()](#Settings+toObject) ⇒ <code>Object</code>
        * [.toString()](#Settings+toString) ⇒ <code>string</code>
    * _static_
        * [.fromJSON(json)](#Settings.fromJSON) ⇒ [<code>Settings</code>](#Settings)

<a name="new_Settings_new"></a>

### new Settings(data)
Creates a new Settings instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The settings data |
| [data.clients] | [<code>Array.&lt;Client&gt;</code>](#Client) | <code>[]</code> | The clients for the inbound connection. Optional. |
| [data.decryption] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The decryption method for the inbound connection. Optional. |
| [data.fallbacks] | <code>Array</code> | <code>[]</code> | The fallbacks for the inbound connection. Optional. |

<a name="Settings+toJSON"></a>

### settings.toJSON() ⇒ <code>Object</code>
Converts the Settings instance to JSON format for API requests.

**Kind**: instance method of [<code>Settings</code>](#Settings)  
**Returns**: <code>Object</code> - JSON representation for API  
<a name="Settings+toObject"></a>

### settings.toObject() ⇒ <code>Object</code>
Returns a complete representation of the settings (for debugging/display).

**Kind**: instance method of [<code>Settings</code>](#Settings)  
**Returns**: <code>Object</code> - Complete object representation  
<a name="Settings+toString"></a>

### settings.toString() ⇒ <code>string</code>
Returns a readable string representation of the settings.

**Kind**: instance method of [<code>Settings</code>](#Settings)  
**Returns**: <code>string</code> - String representation  
<a name="Settings.fromJSON"></a>

### Settings.fromJSON(json) ⇒ [<code>Settings</code>](#Settings)
Creates a Settings instance from JSON data (from API response).

**Kind**: static method of [<code>Settings</code>](#Settings)  
**Returns**: [<code>Settings</code>](#Settings) - A new Settings instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | The JSON data from API |

<a name="Sniffing"></a>

## Sniffing
Represents the sniffing settings for an inbound connection.

**Kind**: global class  

* [Sniffing](#Sniffing)
    * [new Sniffing(data)](#new_Sniffing_new)
    * _instance_
        * [.toJSON()](#Sniffing+toJSON) ⇒ <code>Object</code>
        * [.toObject()](#Sniffing+toObject) ⇒ <code>Object</code>
        * [.toString()](#Sniffing+toString) ⇒ <code>string</code>
    * _static_
        * [.fromJSON(json)](#Sniffing.fromJSON) ⇒ [<code>Sniffing</code>](#Sniffing)

<a name="new_Sniffing_new"></a>

### new Sniffing(data)
Creates a new Sniffing instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The sniffing data |
| data.enabled | <code>boolean</code> |  | Whether sniffing is enabled. Required. |
| [data.destOverride] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | The destination override. Optional. |
| [data.metadataOnly] | <code>boolean</code> | <code>false</code> | Whether to only sniff metadata. Optional. |
| [data.routeOnly] | <code>boolean</code> | <code>false</code> | Whether to only sniff routes. Optional. |

<a name="Sniffing+toJSON"></a>

### sniffing.toJSON() ⇒ <code>Object</code>
Converts the Sniffing instance to JSON format for API requests.

**Kind**: instance method of [<code>Sniffing</code>](#Sniffing)  
**Returns**: <code>Object</code> - JSON representation for API  
<a name="Sniffing+toObject"></a>

### sniffing.toObject() ⇒ <code>Object</code>
Returns a complete representation of the sniffing settings (for debugging/display).

**Kind**: instance method of [<code>Sniffing</code>](#Sniffing)  
**Returns**: <code>Object</code> - Complete object representation  
<a name="Sniffing+toString"></a>

### sniffing.toString() ⇒ <code>string</code>
Returns a readable string representation of the sniffing settings.

**Kind**: instance method of [<code>Sniffing</code>](#Sniffing)  
**Returns**: <code>string</code> - String representation  
<a name="Sniffing.fromJSON"></a>

### Sniffing.fromJSON(json) ⇒ [<code>Sniffing</code>](#Sniffing)
Creates a Sniffing instance from JSON data (from API response).
Handles field name mapping from API format.

**Kind**: static method of [<code>Sniffing</code>](#Sniffing)  
**Returns**: [<code>Sniffing</code>](#Sniffing) - A new Sniffing instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | The JSON data from API |

<a name="StreamSettings"></a>

## StreamSettings
Represents the stream settings for an inbound connection.

**Kind**: global class  

* [StreamSettings](#StreamSettings)
    * [new StreamSettings(data)](#new_StreamSettings_new)
    * _instance_
        * [.toJSON()](#StreamSettings+toJSON) ⇒ <code>Object</code>
        * [.toObject()](#StreamSettings+toObject) ⇒ <code>Object</code>
        * [.toString()](#StreamSettings+toString) ⇒ <code>string</code>
    * _static_
        * [.fromJSON(json)](#StreamSettings.fromJSON) ⇒ [<code>StreamSettings</code>](#StreamSettings)

<a name="new_StreamSettings_new"></a>

### new StreamSettings(data)
Creates a new StreamSettings instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The stream settings data |
| data.security | <code>string</code> |  | The security for the inbound connection. Required. |
| data.network | <code>string</code> |  | The network for the inbound connection. Required. |
| [data.tcpSettings] | <code>Object</code> | <code>{}</code> | The TCP settings for the inbound connection. Optional. |
| [data.kcpSettings] | <code>Object</code> | <code>{}</code> | The KCP settings for the inbound connection. Optional. |
| [data.externalProxy] | <code>Array</code> | <code>[]</code> | The external proxy for the inbound connection. Optional. |
| [data.realitySettings] | <code>Object</code> | <code>{}</code> | The reality settings for the inbound connection. Optional. |
| [data.xtlsSettings] | <code>Object</code> | <code>{}</code> | The xTLS settings for the inbound connection. Optional. |
| [data.tlsSettings] | <code>Object</code> | <code>{}</code> | The TLS settings for the inbound connection. Optional. |

<a name="StreamSettings+toJSON"></a>

### streamSettings.toJSON() ⇒ <code>Object</code>
Converts the StreamSettings instance to JSON format for API requests.

**Kind**: instance method of [<code>StreamSettings</code>](#StreamSettings)  
**Returns**: <code>Object</code> - JSON representation for API  
<a name="StreamSettings+toObject"></a>

### streamSettings.toObject() ⇒ <code>Object</code>
Returns a complete representation of the stream settings (for debugging/display).

**Kind**: instance method of [<code>StreamSettings</code>](#StreamSettings)  
**Returns**: <code>Object</code> - Complete object representation  
<a name="StreamSettings+toString"></a>

### streamSettings.toString() ⇒ <code>string</code>
Returns a readable string representation of the stream settings.

**Kind**: instance method of [<code>StreamSettings</code>](#StreamSettings)  
**Returns**: <code>string</code> - String representation  
<a name="StreamSettings.fromJSON"></a>

### StreamSettings.fromJSON(json) ⇒ [<code>StreamSettings</code>](#StreamSettings)
Creates a StreamSettings instance from JSON data (from API response).
Handles field name mapping from API format.

**Kind**: static method of [<code>StreamSettings</code>](#StreamSettings)  
**Returns**: [<code>StreamSettings</code>](#StreamSettings) - A new StreamSettings instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | The JSON data from API |

