# Complete Validation Rules & Error Messages
## Modern Login and Signup System

---

## 📋 Table of Contents
1. [Email Validation](#email-validation)
2. [Password Validation](#password-validation)
3. [Confirm Password](#confirm-password)
4. [Username Validation](#username-validation)
5. [Name Validation](#name-validation)
6. [Login Validation](#login-validation)
7. [Signup Validation](#signup-validation)
8. [Form Behavior](#form-behavior)
9. [Security Best Practices](#security-best-practices)
10. [Accessibility](#accessibility)
11. [Implementation Examples](#implementation-examples)

---

## 1. Email Validation

### Rules:
- **Required**: Email cannot be empty
- **Format**: Must match standard email pattern `example@domain.com`
- **Processing**: 
  - Trim whitespace automatically
  - Convert to lowercase
  
### Regex Pattern:
```regex
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Error Messages:
```javascript
{
  REQUIRED: "Email address is required",
  INVALID: "Enter a valid email address",
  NOT_FOUND: "No account found with this email"  // Login only
}
```

---

## 2. Password Validation

### Rules:
- **Minimum Length**: 8 characters
- **Must Include**:
  - At least 1 uppercase letter (A-Z)
  - At least 1 lowercase letter (a-z)
  - At least 1 number (0-9)
  - At least 1 special character (!@#$%^&*()_+-=[]{}etc.)

### Regex Patterns:
```javascript
{
  minLength: /.{8,}/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
}
```

### Error Messages:
```javascript
{
  REQUIRED: "Password is required",
  MIN_LENGTH: "Password must be at least 8 characters",
  UPPERCASE: "Password must include at least one uppercase letter",
  LOWERCASE: "Password must include at least one lowercase letter",
  NUMBER: "Password must include at least one number",
  SPECIAL: "Password must include at least one special character (!@#$%^&*)",
  INCORRECT: "Incorrect password"  // Login only
}
```

### Password Strength Indicator:
```javascript
{
  WEAK: length < 8 OR missing requirements,
  MEDIUM: length >= 8 AND all requirements met,
  STRONG: length >= 12 AND all requirements met
}
```

---

## 3. Confirm Password

### Rules:
- **Required**: Cannot be empty
- **Must Match**: Must exactly match the password field

### Error Messages:
```javascript
{
  REQUIRED: "Please confirm your password",
  MISMATCH: "Passwords do not match"
}
```

---

## 4. Username Validation

### Rules:
- **Length**: 3-20 characters
- **Allowed Characters**: Letters (a-z, A-Z), numbers (0-9), underscores (_)
- **No Spaces**: Spaces not allowed
- **Processing**: Convert to lowercase

### Regex Pattern:
```regex
/^[a-zA-Z0-9_]{3,20}$/
```

### Error Messages:
```javascript
{
  REQUIRED: "Username is required",
  MIN_LENGTH: "Username must be at least 3 characters",
  MAX_LENGTH: "Username must not exceed 20 characters",
  INVALID: "Username can contain only letters, numbers, and underscores",
  NO_SPACES: "Username cannot contain spaces",
  TAKEN: "This username is already taken"  // Server check
}
```

---

## 5. Name Validation

### Rules:
- **Length**: 2-50 characters
- **Processing**: 
  - Trim whitespace
  - Remove extra spaces between words

### Error Messages:
```javascript
{
  REQUIRED: "Name is required",
  MIN_LENGTH: "Name must be at least 2 characters",
  MAX_LENGTH: "Name must not exceed 50 characters"
}
```

---

## 6. Login Validation

### Rules:
- Validate email format
- Check password is not empty
- **Security**: Never reveal which field is incorrect
- Implement rate limiting (5 attempts per 15 minutes)

### Error Messages:
```javascript
{
  // Field-specific (shown inline)
  EMAIL_REQUIRED: "Email address is required",
  EMAIL_INVALID: "Enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  
  // General error (never reveal specific issue)
  LOGIN_FAILED: "Unable to login. Please check your credentials and try again",
  RATE_LIMIT: "Too many attempts. Please try again in 15 minutes"
}
```

### Success Message:
```javascript
SUCCESS: "Login successful"
```

---

## 7. Signup Validation

### Rules:
- Validate all fields according to their specific rules
- Check if email/username already exists (server-side)
- Password must meet all requirements
- Confirm password must match

### Error Messages:
```javascript
{
  // Field-specific errors (shown inline for each field)
  // See sections above for specific errors
  
  // General errors
  EMAIL_EXISTS: "An account with this email already exists",
  USERNAME_TAKEN: "This username is already taken",
  SIGNUP_FAILED: "Unable to create account. Please try again",
  SERVER_ERROR: "Something went wrong. Please try again later"
}
```

### Success Message:
```javascript
SUCCESS: "Account created successfully"
```

---

## 8. Form Behavior

### Loading State:
```javascript
{
  disableSubmitButton: true,
  showLoadingSpinner: true,
  disableAllInputs: false  // Allow users to edit while loading
}
```

### Error Display:
```javascript
{
  inlineErrors: "Show below each input field",
  globalError: "Show at top of form for server errors",
  errorStyle: "Red text with icon",
  removeErrorOnInput: true  // Clear error when user starts typing
}
```

### Success Display:
```javascript
{
  type: "toast notification",
  duration: 3000,  // 3 seconds
  position: "top-right",
  message: "Login successful" OR "Account created successfully"
}
```

---

## 9. Security Best Practices

### Password Security:
```javascript
{
  storage: "Never store plain text passwords",
  hashing: "Use bcrypt with salt rounds >= 10",
  transmission: "Always use HTTPS",
  visibility: "Implement show/hide password toggle"
}
```

### Rate Limiting:
```javascript
{
  clientSide: {
    maxAttempts: 5,
    window: "15 minutes",
    storage: "localStorage or memory"
  },
  serverSide: {
    maxAttempts: 10,
    window: "15 minutes",
    lockout: "30 minutes after exceeding limit"
  }
}
```

### Session Management:
```javascript
{
  authentication: "JWT or secure session cookies",
  tokenExpiry: "24 hours (configurable)",
  refreshToken: "7 days",
  csrfProtection: true,
  secureCookies: true,
  httpOnly: true
}
```

### API Protection:
```javascript
{
  rateLimiting: "10 requests per minute per IP",
  csrfToken: "Required for all POST requests",
  inputSanitization: "Sanitize all user inputs",
  sqlInjectionPrevention: "Use parameterized queries",
  xssProtection: "Escape all output"
}
```

---

## 10. Accessibility

### ARIA Attributes:
```html
<!-- Input with error -->
<input
  type="email"
  id="email"
  aria-label="Email address"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">Enter a valid email address</span>

<!-- Input without error -->
<input
  type="password"
  id="password"
  aria-label="Password"
  aria-invalid="false"
/>
```

### Keyboard Navigation:
```javascript
{
  tabOrder: "Logical field order",
  enterSubmit: "Press Enter to submit form",
  escapeClose: "Press Escape to close modals",
  focusManagement: "Focus first error field on validation failure"
}
```

### Screen Reader Support:
```html
<!-- Password requirements for screen readers -->
<ul id="password-requirements" aria-label="Password requirements">
  <li>At least 8 characters</li>
  <li>One uppercase letter</li>
  <li>One lowercase letter</li>
  <li>One number</li>
  <li>One special character</li>
</ul>
```

---

## 11. Implementation Examples

### React + TypeScript Example:

```typescript
import { useState } from 'react';
import { validateLoginForm, ValidationMessages } from '@/utils/validation';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(ValidationMessages.LOGIN_FAILED);
      }

      const data = await response.json();
      // Show success toast
      showToast(ValidationMessages.LOGIN_SUCCESS, 'success');
      // Redirect or update app state
    } catch (error) {
      setErrors({ general: ValidationMessages.LOGIN_FAILED });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && (
        <div role="alert" className="error-box">
          {errors.general}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors({ ...errors, email: '' }); // Clear error on input
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert" className="error-text">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: '' });
            }}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && (
          <span id="password-error" role="alert" className="error-text">
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## JSON Schema for API Validation

### Login Request:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "minLength": 1
    },
    "password": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": ["email", "password"],
  "additionalProperties": false
}
```

### Signup Request:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "username": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_]{3,20}$"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]"
    },
    "confirmPassword": {
      "type": "string",
      "const": {
        "$data": "1/password"
      }
    }
  },
  "required": ["name", "email", "password", "confirmPassword"],
  "additionalProperties": false
}
```

---

## Summary Checklist

### ✅ Email Validation
- [ ] Valid format check
- [ ] Trim whitespace
- [ ] Convert to lowercase
- [ ] Show clear error messages

### ✅ Password Validation
- [ ] Minimum 8 characters
- [ ] Uppercase letter required
- [ ] Lowercase letter required
- [ ] Number required
- [ ] Special character required
- [ ] Show/hide password toggle
- [ ] Password strength indicator

### ✅ Security
- [ ] Never reveal specific login errors
- [ ] Rate limiting implemented
- [ ] Passwords hashed (bcrypt)
- [ ] HTTPS only
- [ ] CSRF protection
- [ ] Input sanitization

### ✅ UX/Accessibility
- [ ] Inline error messages
- [ ] Disable button while loading
- [ ] Success toast notifications
- [ ] ARIA attributes
- [ ] Keyboard navigation
- [ ] Focus management

### ✅ Form Behavior
- [ ] Clear errors on input
- [ ] Disable submit while loading
- [ ] Show loading state
- [ ] Field-level validation
- [ ] Form-level validation

---

**Created**: 2025-11-15  
**Version**: 1.0  
**Author**: FOODSHARE Development Team
