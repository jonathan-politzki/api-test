# Jean Context API v2

Jean is the universal solution for personalized AI experiences across the internet. Connect once, personalize everywhere.

## Overview

Jean Context API enables seamless personalization by letting users connect their Twitter profile once and have personalized experiences across any site using Jean. Think of it like "Plaid for personality" - one secure connection, endless personalization possibilities.

## Quick Integration

Add Jean to your site in two lines:

```html
<script src="https://cdn.jean-technologies.com/v2/jean.js"></script>
<button onclick="JeanConnect.open()">Personalize with Twitter</button>
```

## Core Components

### JeanConnect Modal

The main way users connect their Twitter profile:

```javascript
JeanConnect.open({
  clientId: 'YOUR_CLIENT_ID',
  onSuccess: (publicToken) => {
    // Send token to your backend
    console.log('User connected!', publicToken);
  },
  onExit: () => {
    console.log('User closed modal');
  }
});
```

### Server Integration

Exchange the public token for a permanent access token:

```javascript
// Your backend
const { accessToken } = await jean.exchangePublicToken(publicToken);

// Store this token securely
await db.users.update({
  where: { id: userId },
  data: { jeanAccessToken: accessToken }
});
```

### Getting Context

Use the access token to get personalized context:

```javascript
// Get general context
const context = await jean.getContext(accessToken);

// Get context for specific use case
const recommendations = await jean.getContext(accessToken, {
  type: 'product_recommendations',
  category: 'clothing'
});
```

## Example Use Cases

### E-commerce
```javascript
// Personalize product recommendations
const recommendations = await jean.getContext(accessToken, {
  type: 'recommendations',
  products: ['shirt', 'pants', 'shoes']
});
```

### Content Sites
```javascript
// Adapt content style
const styleGuide = await jean.getContext(accessToken, {
  type: 'content_style'
});
```

### Marketing
```javascript
// Personalize email campaigns
const tone = await jean.getContext(accessToken, {
  type: 'communication_style'
});
```

## API Reference

### JeanConnect Options
```typescript
interface JeanConnectOptions {
  clientId: string;          // Your Jean client ID
  environment?: 'sandbox' | 'production';
  onSuccess: (token: string) => void;
  onExit?: () => void;
  onError?: (error: Error) => void;
}
```

### Context Response
```typescript
interface JeanContext {
  profile: {
    interests: string[];
    communicationStyle: string;
    topTopics: string[];
    sentimentProfile: {
      general: number;
      byTopic: Record<string, number>;
    };
  };
  analysis: {
    recommendationFactors: string[];
    personalityInsights: object;
    contentPreferences: object;
  };
}
```

## Security & Privacy

- OAuth 2.0 authentication flow
- No direct access to Twitter credentials
- Encrypted token storage
- User-controlled data access
- GDPR & CCPA compliant

## Development Timeline

Phase 1 (2-3 weeks):
- Core authentication flow
- Basic context API
- JeanConnect modal

Phase 2 (2-3 weeks):
- Enhanced context analysis
- Developer dashboard
- Usage analytics

Phase 3 (2-3 weeks):
- Advanced personalization endpoints
- SDK improvements
- Production hardening

## FAQ

**Q: What's the difference between Jean v1 and v2?**
A: V2 introduces the JeanConnect modal for persistent cross-site personalization, similar to how Plaid connects bank accounts.

**Q: How is this different from a widget?**
A: While a widget lives on your page, JeanConnect is a secure modal that opens above your site, handling the Twitter connection process in an isolated environment.

## Support

Questions? Contact: jonathan@jeantechnologies.com