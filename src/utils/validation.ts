// Validation utility functions and error messages

export const ValidationMessages = {
  // Email validation messages
  EMAIL_REQUIRED: "Email address is required",
  EMAIL_INVALID: "Enter a valid email address",
  EMAIL_NOT_FOUND: "No account found with this email",
  
  // Password validation messages
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
  PASSWORD_UPPERCASE: "Password must include at least one uppercase letter",
  PASSWORD_LOWERCASE: "Password must include at least one lowercase letter",
  PASSWORD_NUMBER: "Password must include at least one number",
  PASSWORD_SPECIAL: "Password must include at least one special character (!@#$%^&*)",
  PASSWORD_MISMATCH: "Passwords do not match",
  PASSWORD_INCORRECT: "Incorrect password",
  
  // Username validation messages
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
  USERNAME_MAX_LENGTH: "Username must not exceed 20 characters",
  USERNAME_INVALID: "Username can contain only letters, numbers, and underscores",
  USERNAME_NO_SPACES: "Username cannot contain spaces",
  USERNAME_TAKEN: "This username is already taken",
  
  // Name validation messages
  NAME_REQUIRED: "Name is required",
  NAME_MIN_LENGTH: "Name must be at least 2 characters",
  NAME_MAX_LENGTH: "Name must not exceed 50 characters",
  
  // General messages
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password",
  LOGIN_FAILED: "Unable to login. Please check your credentials and try again",
  SIGNUP_FAILED: "Unable to create account. Please try again",
  RATE_LIMIT_EXCEEDED: "Too many attempts. Please try again in a few minutes",
  SERVER_ERROR: "Something went wrong. Please try again later",
  
  // Success messages
  LOGIN_SUCCESS: "Login successful",
  SIGNUP_SUCCESS: "Account created successfully",
  PASSWORD_RESET_SENT: "Password reset link sent to your email",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
};

// Email validation
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: ValidationMessages.EMAIL_REQUIRED };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: ValidationMessages.EMAIL_INVALID };
  }
  
  return { isValid: true };
};

// Password validation with detailed feedback
export const validatePassword = (password: string): { 
  isValid: boolean; 
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push(ValidationMessages.PASSWORD_REQUIRED);
    return { isValid: false, errors, strength: 'weak' };
  }
  
  // Check minimum length
  if (password.length < 8) {
    errors.push(ValidationMessages.PASSWORD_MIN_LENGTH);
  }
  
  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push(ValidationMessages.PASSWORD_UPPERCASE);
  }
  
  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push(ValidationMessages.PASSWORD_LOWERCASE);
  }
  
  // Check for number
  if (!/[0-9]/.test(password)) {
    errors.push(ValidationMessages.PASSWORD_NUMBER);
  }
  
  // Check for special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push(ValidationMessages.PASSWORD_SPECIAL);
  }
  
  // Calculate password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (errors.length === 0) {
    if (password.length >= 12) {
      strength = 'strong';
    } else {
      strength = 'medium';
    }
  }
  
  return { 
    isValid: errors.length === 0, 
    errors,
    strength
  };
};

// Confirm password validation
export const validateConfirmPassword = (
  password: string, 
  confirmPassword: string
): { isValid: boolean; error?: string } => {
  if (!confirmPassword) {
    return { isValid: false, error: ValidationMessages.CONFIRM_PASSWORD_REQUIRED };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: ValidationMessages.PASSWORD_MISMATCH };
  }
  
  return { isValid: true };
};

// Username validation
export const validateUsername = (username: string): { isValid: boolean; error?: string } => {
  if (!username || username.trim() === '') {
    return { isValid: false, error: ValidationMessages.USERNAME_REQUIRED };
  }
  
  const trimmedUsername = username.trim();
  
  // Check for spaces
  if (/\s/.test(trimmedUsername)) {
    return { isValid: false, error: ValidationMessages.USERNAME_NO_SPACES };
  }
  
  // Check length
  if (trimmedUsername.length < 3) {
    return { isValid: false, error: ValidationMessages.USERNAME_MIN_LENGTH };
  }
  
  if (trimmedUsername.length > 20) {
    return { isValid: false, error: ValidationMessages.USERNAME_MAX_LENGTH };
  }
  
  // Check valid characters (letters, numbers, underscores only)
  if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
    return { isValid: false, error: ValidationMessages.USERNAME_INVALID };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: ValidationMessages.NAME_REQUIRED };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: ValidationMessages.NAME_MIN_LENGTH };
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, error: ValidationMessages.NAME_MAX_LENGTH };
  }
  
  return { isValid: true };
};

// Complete form validation for Login
export interface LoginFormData {
  email: string;
  password: string;
}

export const validateLoginForm = (data: LoginFormData): {
  isValid: boolean;
  errors: { [key: string]: string };
} => {
  const errors: { [key: string]: string } = {};
  
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }
  
  // Validate password (just check if it exists for login)
  if (!data.password) {
    errors.password = ValidationMessages.PASSWORD_REQUIRED;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Complete form validation for Signup
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username?: string; // Optional field
}

export const validateSignupForm = (data: SignupFormData): {
  isValid: boolean;
  errors: { [key: string]: string };
} => {
  const errors: { [key: string]: string } = {};
  
  // Validate name
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }
  
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }
  
  // Validate username (if provided)
  if (data.username) {
    const usernameValidation = validateUsername(data.username);
    if (!usernameValidation.isValid) {
      errors.username = usernameValidation.error!;
    }
  }
  
  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0]; // Show first error
  }
  
  // Validate confirm password
  const confirmPasswordValidation = validateConfirmPassword(
    data.password, 
    data.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sanitize input (trim and lowercase for email)
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizeName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' '); // Remove extra spaces
};

export const sanitizeUsername = (username: string): string => {
  return username.trim().toLowerCase();
};

// Rate limiting helper (client-side tracking)
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    const now = Date.now();
    if (now > record.resetTime) return 0;

    return Math.ceil((record.resetTime - now) / 1000);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Export singleton instance
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
