# Jean Context API v1.5

Jean helps your AI understand users better by providing rich context from their Twitter profiles. Our new widget makes integration even easier.

## Quick Start

### 1. Get API Key
```bash
curl -X POST "https://jean-technologies.up.railway.app/api/admin/keys" \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{"name": "Your App Name"}'
```

### 2. Add Widget (New!)
```html
<!-- Add to your page -->
<script src="https://cdn.jean-technologies.com/widget.js"></script>

<script>
  const jean = new JeanWidget('YOUR_API_KEY', {
    onConnect: (context) => {
      console.log('Got user context:', context);
    }
  });
</script>
```

Or use the API directly:
```bash
curl "https://jean-technologies.up.railway.app/api/context?username=elonmusk" \
  -H "x-api-key: YOUR_API_KEY"
```

## Widget Integration

### Basic Setup
```javascript
// Initialize widget with options
const jean = new JeanWidget('YOUR_API_KEY', {
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left'
  theme: 'light', // or 'dark'
  buttonText: 'Personalize Experience', // custom button text
  onConnect: (context) => {
    // Handle the user context
    console.log('User connected:', context);
  },
  onError: (error) => {
    console.error('Connection failed:', error);
  }
});

// Manually trigger widget
jean.open();

// Get current user context
const context = await jean.getContext();

// Check if user is connected
const isConnected = jean.isConnected();
```

### Styling
The widget can be customized with CSS:
```css
.jean-widget {
  /* Your custom styles */
}

.jean-button {
  /* Custom button styles */
}
```

### User Identification
The widget generates a unique identifier for each user:
```javascript
// Get user's unique ID
const userId = jean.getUserId();

// Store with your user
await saveToDatabase({
  userId: userId,
  jeanContext: context
});
```

## Using with AI Models

### E-commerce Example
```javascript
const jean = new JeanWidget('YOUR_API_KEY', {
  onConnect: async (context) => {
    // Create personalization prompt
    const prompt = `Based on this Twitter user's profile and tweets, 
      what products would interest them most?
      
      User Context:
      ${JSON.stringify(context, null, 2)}`;

    // Get AI recommendations
    const completion = await openai.createCompletion({
      model: "gpt-4",
      prompt: prompt
    });

    // Update your UI
    updateRecommendations(completion.choices[0].text);
  }
});
```

### Content Personalization
```javascript
const jean = new JeanWidget('YOUR_API_KEY', {
  onConnect: async (context) => {
    const articleContent = await getArticleContent();
    
    // Personalize content
    const personalizedContent = await personalizeForUser(
      articleContent,
      context
    );
    
    // Update page
    updateContent(personalizedContent);
  }
});
```

## API Reference

### Widget Options
```typescript
interface JeanWidgetOptions {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  buttonText?: string;
  onConnect?: (context: UserContext) => void;
  onError?: (error: Error) => void;
}
```

### Context Response
```typescript
interface UserContext {
  profile: {
    username: string;
    name: string;
    description: string;
    followers: number;
    location: string;
    profilePicture: string;
  };
  analysis: {
    topTopics: string[];
    commonPhrases: string[];
    sentimentScore: number;
    languagesUsed: string[];
    activeHours: string[];
  };
  tweets: Tweet[];
}
```

### Error Codes
- 401: Invalid API key
- 400: Missing username
- 404: User not found
- 500: Server error

## Widget Implementation

Create file: `widget.js`
```javascript
class JeanWidget {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = {
      position: 'bottom-right',
      theme: 'light',
      buttonText: 'Personalize Experience',
      ...options
    };
    
    this.userId = this.generateUserId();
    this.init();
  }

  generateUserId() {
    // Generate or retrieve existing ID
    let id = localStorage.getItem('jean_user_id');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('jean_user_id', id);
    }
    return id;
  }

  init() {
    // Create widget container
    const container = document.createElement('div');
    container.className = `jean-widget jean-${this.options.position}`;
    
    // Add input and button
    container.innerHTML = `
      <input 
        type="text" 
        class="jean-input" 
        placeholder="Enter Twitter username"
      >
      <button class="jean-button">
        ${this.options.buttonText}
      </button>
    `;
    
    // Add styles
    this.addStyles();
    
    // Add to page
    document.body.appendChild(container);
    
    // Setup events
    this.setupEvents(container);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .jean-widget {
        position: fixed;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
      }
      
      .jean-bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .jean-input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 8px;
      }
      
      .jean-button {
        padding: 8px 16px;
        background: #0070f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  setupEvents(container) {
    const input = container.querySelector('input');
    const button = container.querySelector('button');
    
    button.addEventListener('click', async () => {
      const username = input.value.trim();
      if (!username) return;
      
      try {
        const response = await fetch(
          `https://jean-technologies.up.railway.app/api/context?username=${username}`,
          {
            headers: {
              'x-api-key': this.apiKey,
              'x-user-id': this.userId
            }
          }
        );
        
        const context = await response.json();
        
        if (this.options.onConnect) {
          this.options.onConnect(context);
        }
        
        // Store username
        localStorage.setItem('jean_twitter_username', username);
        
      } catch (error) {
        if (this.options.onError) {
          this.options.onError(error);
        }
      }
    });
  }

  isConnected() {
    return !!localStorage.getItem('jean_twitter_username');
  }

  async getContext() {
    const username = localStorage.getItem('jean_twitter_username');
    if (!username) return null;
    
    const response = await fetch(
      `https://jean-technologies.up.railway.app/api/context?username=${username}`,
      {
        headers: {
          'x-api-key': this.apiKey,
          'x-user-id': this.userId
        }
      }
    );
    
    return response.json();
  }

  getUserId() {
    return this.userId;
  }
}
```

## Support

Questions? Contact: jonathan@jeantechnologies.com