# Jean Context API

Get personalized Twitter data for your AI applications in minutes.

## Zero to Production in 60 Seconds

```bash
# 1. Create a new directory and initialize
mkdir my-ai-app && cd my-ai-app
npm init -y
npm install axios openai

# 2. Get your API key
curl -X POST "https://jean-technologies.up.railway.app/api/keys/create" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-first-app"}'

# 3. Create index.js and start coding!
```

```javascript
// index.js
const axios = require('axios');
const OpenAI = require('openai');

// Replace with your keys
const JEAN_API_KEY = 'jn_your_key_here';
const openai = new OpenAI({ apiKey: 'sk-your-openai-key' });

// Get Twitter context and generate a response
async function generatePersonalizedTweet(username) {
  // Get user's Twitter context
  const { data } = await axios.get(
    `https://jean-technologies.up.railway.app/api/context?username=${username}`,
    { headers: { 'x-api-key': JEAN_API_KEY } }
  );

  // Generate tweet using their style
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are ${data.profile.name}. Write a tweet in their style.
                 Their recent tweets: ${data.tweets.slice(0,3).map(t => t.text).join('\n')}`
      },
      { role: "user", content: "Write a tweet about the future of AI" }
    ]
  });

  return completion.choices[0].message.content;
}

// Try it out!
generatePersonalizedTweet("elonmusk")
  .then(console.log)
  .catch(console.error);
```

## Full Integration Examples

### Python + OpenAI
```python
import requests
import openai

# Get Twitter context
def get_twitter_context(username):
    response = requests.get(
        f"https://jean-technologies.up.railway.app/api/context?username={username}",
        headers={"x-api-key": "your_key_here"}
    )
    return response.json()

# Use with OpenAI
def get_personalized_response(username, prompt):
    # Get user context
    context = get_twitter_context(username)
    
    # Create personalized system message
    system_message = f"""You are a personal assistant for {context['profile']['name']}.
    They have {context['profile']['followers']} followers.
    Their recent tweets include: {[t['text'] for t in context['tweets'][:3]]}
    """
    
    # Get AI response
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return response.choices[0].message.content

# Example usage
response = get_personalized_response("elonmusk", "Write a tweet about AI that matches their style")
print(response)
```

### Node.js + OpenAI
```javascript
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI();
const JEAN_API_KEY = 'your_key_here';

async function getTwitterContext(username) {
  const response = await axios.get(
    `https://jean-technologies.up.railway.app/api/context?username=${username}`,
    { headers: { 'x-api-key': JEAN_API_KEY } }
  );
  return response.data;
}

async function getPersonalizedResponse(username, prompt) {
  // Get user context
  const context = await getTwitterContext(username);
  
  // Create personalized system message
  const systemMessage = `You are a personal assistant for ${context.profile.name}.
    They have ${context.profile.followers} followers.
    Their recent tweets include: ${context.tweets.slice(0,3).map(t => t.text).join(', ')}`;
  
  // Get AI response
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: prompt }
    ]
  });
  
  return completion.choices[0].message.content;
}

// Example usage
getPersonalizedResponse("elonmusk", "Write a tweet about AI that matches their style")
  .then(console.log)
  .catch(console.error);
```

## API Response Format
```json
{
  "profile": {
    "username": "string",
    "name": "string",
    "followers": number,
    "description": "string",
    "location": "string",
    "profilePicture": "string"
  },
  "tweets": [
    {
      "text": "string",
      "createdAt": "string",
      "likeCount": number,
      "retweetCount": number,
      "replyCount": number
    }
  ]
}
```

## Rate Limits & Pricing
- 100 requests per minute per API key
- Free tier available
- Contact for enterprise pricing

## Need Help?
- Email: jonathan@jeantechnologies.com
- API Status: https://jean-technologies.up.railway.app/api/test-db
- Documentation: Coming soon!
- Join our [Discord](coming_soon) community
