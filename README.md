# Jean Context API

## The Universal Gas Station for User Understanding

Jean enables any website or application to deeply understand its users through a simple API call. One connection unlocks personalized experiences everywhere.

## Why Jean?

Jean connects your Twitter personality to websites, so they can understand and adapt to you instantly. Instead of every website starting from scratch, they can immediately know how you think, write, and what matters to you.
Think of it like letting websites 'meet you' through your Twitter presence - so they can give you a more personal, relevant experience right away.

Takes the understanding Twitter has about you
Makes it available to other websites
So they can personalize your experience immediately

## Quick Start

```bash
# Get your API key
curl -X POST "https://jean-technologies.up.railway.app/api/keys/create" \
  -H "Content-Type: application/json" \
  -d '{"name": "My App"}'

# Get user context
curl "https://jean-technologies.up.railway.app/api/context?username=elonmusk" \
  -H "x-api-key: YOUR_API_KEY"
```

## Node.js Example

```javascript
const axios = require('axios');
require('dotenv').config();

async function getUserContext(username) {
    try {
        const response = await axios.get(
            `https://jean-technologies.up.railway.app/api/context?username=${username}`,
            { headers: { 'x-api-key': process.env.JEAN_API_KEY } }
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

// Example usage
getUserContext('elonmusk')
    .then(data => {
        console.log('Profile:', data.profile);
        console.log('Recent tweets:', data.tweets.slice(0, 2));
    });
```

## What You Get

```javascript
{
  "profile": {
    "username": "elonmusk",
    "name": "Elon Musk",
    "followers": 218307314,
    "description": "",
    "location": "",
    "profilePicture": "..."
  },
  "tweets": [
    {
      "text": "...",
      "createdAt": "2024-02-19T20:39:10.000000Z",
      "likeCount": 44046,
      "viewCount": 16874124,
      // ... more metrics
    }
  ]
}
```

## Use Cases

- **E-commerce**: Personalize product recommendations and site experience
- **Content Sites**: Adapt content style and topics to each reader
- **Marketing**: Craft messages that resonate with individual users
- **Customer Service**: Understand user context before interaction

## Benefits

- **Zero Setup**: One API call to start personalizing
- **Real-time Data**: Always fresh Twitter context
- **Scale Ready**: Handle millions of users effortlessly
- **Privacy First**: Secure and compliant data handling

## Getting Started

1. Get your API key (see Quick Start above)
2. Install dependencies: `npm install axios dotenv`
3. Start personalizing your user experience!

## Need Help?

Contact: jonathan@jeantechnologies.com

## Coming Soon

- Instagram integration
- Expanded user context
- Advanced personalization endpoints
- Developer dashboard
