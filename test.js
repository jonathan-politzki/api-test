const axios = require('axios');
require('dotenv').config();

async function test() {
    try {
        const response = await axios.get(
            'https://jean-technologies.up.railway.app/api/context?username=elonmusk',
            { headers: { 'x-api-key': process.env.JEAN_API_KEY } }
        );
        
        console.log('Twitter Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

test(); 