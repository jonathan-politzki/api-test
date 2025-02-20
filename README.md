# Jean Context API Test

Jean Context API provides rich user context data from Twitter profiles, enabling personalized AI experiences at scale. Think of it as a "universal gas station for user understanding" - helping your AI understand your users better.

## Quick Start

1. Get your API key:
```bash
curl -X POST "https://jean-technologies.up.railway.app/api/admin/keys" \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{"name": "Your App Name"}'
```

2. Make your first API call:
```bash
curl "https://jean-technologies.up.railway.app/api/context?username=elonmusk" \
  -H "x-api-key: YOUR_API_KEY"
```

## Using with AI Models

### Basic Integration

```javascript
// 1. Get user context
const response = await fetch(`https://jean-technologies.up.railway.app/api/context?username=elonmusk`, {
  headers: { 'x-api-key': 'YOUR_API_KEY' }
});
const userContext = await response.json();

// 2. Use in your AI prompt
const prompt = `Based on this Twitter user's profile and tweets, what products 
would interest them most? Consider their interests and style.

User Context:
${JSON.stringify(userContext, null, 2)}`;

// 3. Send to your preferred AI model
const llmResponse = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }]
});
```

### Example Use Cases

#### E-commerce Personalization
```javascript
async function getPersonalizedRecommendations(twitterHandle, products) {
  const userContext = await fetchJeanContext(twitterHandle);
  
  const prompt = `You are a personal shopping assistant. Based on this Twitter user:
  - Topics: ${userContext.analysis.topTopics.join(', ')}
  - Style: ${userContext.analysis.commonPhrases.join(', ')}
  - Sentiment: ${userContext.analysis.sentimentScore}
  
  Available products:
  ${products}
  
  What should we recommend and why?`;
  
  return await getAIRecommendations(prompt);
}
```

#### Content Personalization
```javascript
async function personalizeContent(content, twitterHandle) {
  const userContext = await fetchJeanContext(twitterHandle);
  
  const prompt = `Adapt this content for this reader. Their Twitter shows:
  - Writing style: ${userContext.analysis.languagesUsed}
  - Interests: ${userContext.analysis.topTopics}
  - Active times: ${userContext.analysis.activeHours}
  
  Content to personalize:
  ${content}`;
  
  return await getAIRewrite(prompt);
}
```

## API Reference

### Get User Context
`GET /api/context?username={twitter_username}`

Returns profile data, tweets, and analysis. Fetches real-time if not cached.

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
  },
  analysis: {
    topTopics: string[]
    commonPhrases: string[]
    sentimentScore: number
    languagesUsed: string[]
    activeHours: string[]
  },
  tweets: Array<Tweet>
}
```

**Error Codes:**
- 401: Invalid API key
- 400: Missing username
- 404: User not found
- 500: Server error

## Support

Questions? Contact: jonathan@jeantechnologies.com
