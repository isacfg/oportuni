# Testing Guide for Google OAuth Implementation

This guide will help you test the Google OAuth implementation using Postman and manual browser testing.

## Prerequisites

1. **Google OAuth Credentials**: Set up in Google Cloud Console
2. **Environment Variables**: Add to your `.env` file:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
3. **Server Running**: Start with `npm run dev`
4. **Postman**: Import the `postman_collection.json` file

## Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Select the `postman_collection.json` file
4. The collection "Google OAuth API - AdonisJS" will be imported

## Collection Variables

The collection includes these variables:
- `baseUrl`: http://localhost:3333 (your server URL)
- `authToken`: Empty initially, will be set after successful authentication

## Testing Steps

### Step 1: Health Check

**Request**: `GET /`
**Purpose**: Verify server is running
**Expected Response**:
```json
{
  "hello": "world"
}
```

### Step 2: Test Protected Route (Should Fail)

**Request**: `GET /auth/me` (without token)
**Purpose**: Verify authentication is required
**Expected Response**: `401 Unauthorized`
```json
{
  "errors": [
    {
      "message": "Unauthorized access"
    }
  ]
}
```

### Step 3: Start Google OAuth Flow

**Request**: `GET /auth/google/redirect`
**Purpose**: Get Google OAuth URL

**How to test**:
1. Send the request in Postman
2. Copy the redirect URL from the response
3. Open the URL in a browser
4. Complete Google OAuth flow
5. After authorization, you'll be redirected to the callback URL

**Expected Response**: Redirect to Google OAuth page

### Step 4: Complete OAuth Flow (Browser)

1. **Open Browser**: Navigate to `http://localhost:3333/auth/google/redirect`
2. **Login with Google**: Complete the OAuth flow
3. **Callback**: You'll be redirected to `/auth/google/callback` with the result
4. **Copy Token**: If successful, copy the token from the response

**Expected Success Response**:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": "https://...",
    "emailVerified": true
  },
  "token": {
    "type": "Bearer",
    "value": "oat_1234567890abcdef...",
    "expiresAt": "2024-02-15T10:30:00.000Z"
  }
}
```

### Step 5: Set Auth Token in Postman

1. Copy the token value from the OAuth callback response
2. In Postman, go to the collection variables
3. Set the `authToken` variable to the token value
4. Save the collection

### Step 6: Test Protected Routes

**Request**: `GET /auth/me` (with token)
**Purpose**: Verify authentication works
**Expected Response**:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": "https://...",
    "emailVerified": true
  }
}
```

### Step 7: Test Logout

**Request**: `POST /auth/logout` (with token)
**Purpose**: Test logout functionality
**Expected Response**:
```json
{
  "message": "Logged out successfully"
}
```

## Error Testing Scenarios

### 1. Invalid Token
- Use an invalid token in the Authorization header
- Expected: `401 Unauthorized`

### 2. Expired Token
- Use an expired token
- Expected: `401 Unauthorized`

### 3. Missing Token
- Don't include Authorization header
- Expected: `401 Unauthorized`

### 4. OAuth Errors
Test these by manipulating the OAuth flow:
- **Access Denied**: Cancel the Google OAuth flow
- **State Mismatch**: Modify the state parameter
- **Invalid Credentials**: Use wrong Google client credentials

## Manual Browser Testing

### Complete OAuth Flow Test

1. **Start Flow**:
   ```
   http://localhost:3333/auth/google/redirect
   ```

2. **Complete Google OAuth**:
   - Login with your Google account
   - Authorize the application
   - You'll be redirected to the callback

3. **Check Response**:
   - Should see JSON response with user data and token
   - Copy the token for API testing

### Frontend Integration Test

Create a simple HTML file to test the flow:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Google OAuth Test</title>
</head>
<body>
    <h1>Google OAuth Test</h1>
    
    <button onclick="startOAuth()">Login with Google</button>
    <button onclick="getUser()">Get User Info</button>
    <button onclick="logout()">Logout</button>
    
    <div id="result"></div>
    
    <script>
        let authToken = localStorage.getItem('authToken');
        
        function startOAuth() {
            window.location.href = 'http://localhost:3333/auth/google/redirect';
        }
        
        async function getUser() {
            if (!authToken) {
                alert('Please login first');
                return;
            }
            
            try {
                const response = await fetch('http://localhost:3333/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                
                const data = await response.json();
                document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        
        async function logout() {
            if (!authToken) {
                alert('Not logged in');
                return;
            }
            
            try {
                const response = await fetch('http://localhost:3333/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                
                const data = await response.json();
                localStorage.removeItem('authToken');
                authToken = null;
                document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        
        // Check if we're on the callback page and extract token
        if (window.location.pathname === '/auth/google/callback') {
            // This would be handled by your frontend framework
            console.log('OAuth callback received');
        }
    </script>
</body>
</html>
```

## Troubleshooting

### Common Issues

1. **"Invalid Client ID"**
   - Check Google Cloud Console credentials
   - Verify environment variables are set correctly

2. **"Redirect URI Mismatch"**
   - Ensure callback URL in Google Console matches exactly:
     `http://localhost:3333/auth/google/callback`

3. **"Access Denied"**
   - User cancelled the OAuth flow
   - Check if Google account has required permissions

4. **"State Mismatch"**
   - CSRF protection triggered
   - Clear cookies and try again

5. **"Token Invalid"**
   - Token might be expired (30 days)
   - Token format might be incorrect
   - Check Authorization header format: `Bearer <token>`

### Debug Tips

1. **Enable Debug Logging**:
   ```env
   LOG_LEVEL=debug
   ```

2. **Check Server Logs**:
   - Authentication attempts are logged
   - Error details are logged

3. **Network Tab**:
   - Use browser dev tools to inspect requests
   - Check response headers and status codes

4. **Postman Console**:
   - Check for request/response details
   - Verify headers are being sent correctly

## Expected Response Formats

### Success Responses

**Login Success**:
```json
{
  "message": "Login successful",
  "user": { ... },
  "token": { ... }
}
```

**User Info**:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": "https://...",
    "emailVerified": true
  }
}
```

**Logout Success**:
```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

**Unauthorized**:
```json
{
  "errors": [
    {
      "message": "Unauthorized access"
    }
  ]
}
```

**OAuth Errors**:
```json
{
  "error": "Access denied",
  "message": "You have cancelled the login process"
}
```

## Performance Testing

For load testing, you can use tools like:
- **Artillery**: For API endpoint testing
- **JMeter**: For comprehensive load testing
- **k6**: For modern load testing

Remember that OAuth flows involve redirects and external services, so focus performance testing on the protected API endpoints rather than the OAuth flow itself. 
