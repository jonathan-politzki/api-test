# Jean Context API

Jean Context API provides rich user context data from Twitter profiles, enabling personalized AI experiences at scale. Think of it as a "universal gas station for user understanding" - helping your AI understand your users better.

## Quick Start

1. Get your API key:
```bash
curl -X POST "https://jean-technologies.up.railway.app/api/admin/keys" \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{"name": "Your App Name"}'

# Response:
{
  "key": "jn_abc123...",
  "name": "Your App Name",
  "created": "2024-02-20T..."
}
```

2. Make your first API call:
```bash
curl "https://jean-technologies.up.railway.app/api/context?username=elonmusk" \
  -H "x-api-key: YOUR_API_KEY"
```

## API Reference

### Get User Context
`GET /api/context?username={twitter_username}`

Returns profile data and recent tweets. Fetches real-time if not cached.

**Parameters:**
- `username` (required): Twitter username without @

**Headers:**
- `x-api-key` (required): Your API key

**Response:**
```typescript
{
  profile: {
    username: string
    name: string
    description: string
    followers: number
    location: string
    profilePicture: string
    fullProfile: {
      // Additional Twitter profile fields
    }
  },
  tweets: Array<{
    text: string
    author: { userName: string }
    createdAt: string
    isRetweet: boolean
    likeCount: number
    viewCount: number
    quoteCount: number
    replyCount: number
    retweetCount: number
  }>,
  _debug?: {  // Only in development
    timings: {
      db_lookup: number
      total: number
    }
  }
}
```

### API Key Management

#### Generate API Key
`POST /api/admin/keys`

Creates a new API key for accessing the context API.

**Headers:**
- `x-admin-key` (required): Admin API key

**Request Body:**
```json
{
  "name": "Your App Name"  // Name to identify this key
}
```

**Response:**
```json
{
  "key": "jn_abc123...",
  "name": "Your App Name",
  "created": "2024-02-20T..."
}
```

#### List API Keys
`GET /api/admin/keys`

Lists all active API keys (admin only).

**Headers:**
- `x-admin-key` (required): Admin API key

**Response:**
```json
[
  {
    "name": "App Name",
    "createdAt": "2024-02-20T...",
    "lastUsed": "2024-02-20T...",
    "active": true
  }
]
```

## Error Codes
- 401: Invalid API key
- 400: Missing username
- 404: User not found
- 500: Server error

## Rate Limiting & Caching
- Results are cached for improved performance
- Fresh data is fetched when not in cache
- Rate limits apply to fresh data fetches

## Example Integration

```javascript
// Get user context
const response = await fetch(`https://jean-technologies.up.railway.app/api/context?username=elonmusk`, {
  headers: { 'x-api-key': 'YOUR_API_KEY' }
});
const userContext = await response.json();

// Use in your AI prompt
const prompt = `Based on this Twitter user's profile and tweets, what products 
would interest them most? Consider their interests and style.

User Context:
${JSON.stringify(userContext, null, 2)}`;

// Send to your preferred AI model
const llmResponse = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }]
});
```

## Support

Questions? Contact: jonathan@jeantechnologies.com
