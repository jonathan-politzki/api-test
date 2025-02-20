require('dotenv').config();
const axios = require('axios');

// Jean API configuration
const JEAN_CLIENT_ID = process.env.JEAN_CLIENT_ID;
const JEAN_ACCESS_TOKEN = process.env.JEAN_ACCESS_TOKEN;

// Base URL for Jean API
const JEAN_API_BASE = 'https://api.jean-technologies.com/v2';

// Test client for Jean API
class JeanTestClient {
    constructor(clientId, accessToken) {
        this.clientId = clientId;
        this.accessToken = accessToken;
    }

    async getGeneralContext() {
        try {
            const response = await axios.get(`${JEAN_API_BASE}/context`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'X-Client-ID': this.clientId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting general context:', error.message);
            throw error;
        }
    }

    async getContentStyle() {
        try {
            const response = await axios.get(`${JEAN_API_BASE}/context`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'X-Client-ID': this.clientId
                },
                params: {
                    type: 'content_style'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting content style:', error.message);
            throw error;
        }
    }
}

// Main test function
async function runJeanTest() {
    console.log('Starting Jean API Test for ITNAmatter...');

    const jeanClient = new JeanTestClient(JEAN_CLIENT_ID, JEAN_ACCESS_TOKEN);

    try {
        // Test 1: Get general context
        console.log('\nTesting General Context:');
        const generalContext = await jeanClient.getGeneralContext();
        console.log('General Context Results:', JSON.stringify(generalContext, null, 2));

        // Test 2: Get content style
        console.log('\nTesting Content Style:');
        const contentStyle = await jeanClient.getContentStyle();
        console.log('Content Style Results:', JSON.stringify(contentStyle, null, 2));

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Run the test
runJeanTest(); 