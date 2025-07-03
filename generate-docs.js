import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'fs';
import path from 'path';

// Simple version for PowerShell compatibility
const outputDir = 'src';
const outputFile = path.join(outputDir, 'README.md');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate documentation from all JS files
const inputFiles = [
  'src/Api.js',
  'src/client/Client.js',
  'src/inbound/Inbound.js',
  'src/inbound/Settings.js',
  'src/inbound/Sniffing.js',
  'src/inbound/StreamSettings.js',
  'src/api/ApiBase.js',
  'src/api/ApiClient.js',
  'src/api/ApiDatabase.js',
  'src/api/ApiInbound.js',
  'src/api/ApiServer.js',
  'index.js'
];

async function generateDocs() {
  try {
    console.log('Generating documentation...');
    
    const output = await jsdoc2md.render({ 
      files: inputFiles
    });
    
    const header = `# js3xui Documentation

*Automatically generated from JSDoc comments*

## Overview

js3xui is an async object-oriented JavaScript SDK for the 3x-ui API. It provides a high-level interface to interact with the XUI API, including client, inbound, and database operations.

## Installation

\`\`\`bash
npm install js3xui
\`\`\`

## Quick Start

\`\`\`javascript
import Api from 'js3xui';

const api = new Api('https://your-server.com', 'username', 'password');
await api.login();

// Use the API
const clients = await api.client.getAll();
console.log(clients);
\`\`\`

---

## API Reference

`;

    const fullOutput = header + output;
    
    fs.writeFileSync(outputFile, fullOutput);
    console.log(`✓ Documentation generated: ${outputFile}`);
    
  } catch (error) {
    console.error('Error generating documentation:', error);
  }
}

generateDocs();
