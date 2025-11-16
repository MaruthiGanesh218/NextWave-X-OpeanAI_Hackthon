// Zod validation schemas for type-safe form validation
// Install: npm install zod

import { z } from 'zod';

// Email schema
export const emailSchema = z
  .string()
  .min(1, "Email address is required")
  .email("Enter a valid email address")
  .transform((email) => email.trim().toLowerCase());

// Password schema with all requirements
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/[a-z]/, "Password must include at least one lowercase letter")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must include at least one special character (!@#$%^&*)");

// Username schema
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can contain only letters, numbers, and underscores")
  .refine((val) => !/\s/.test(val), "Username cannot contain spaces")
  .transform((username) => username.trim().toLowerCase());

// Name schema
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .transform((name) => name.trim().replace(/\s+/g, ' '));

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Signup form schema
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  username: usernameSchema.optional(),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ====================================================================================
// Alternative: Yup validation schemas (if you prefer Yup over Zod)
// Install: npm install yup
// ====================================================================================

/*
import * as Yup from 'yup';

// Email schema
export const emailSchemaYup = Yup.string()
  .required("Email address is required")
  .email("Enter a valid email address")
  .transform((value) => value.trim().toLowerCase());

// Password schema
export const passwordSchemaYup = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must include at least one uppercase letter")
  .matches(/[a-z]/, "Password must include at least one lowercase letter")
  .matches(/[0-9]/, "Password must include at least one number")
  .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must include at least one special character (!@#$%^&*)");

// Username schema
export const usernameSchemaYup = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .matches(/^[a-zA-Z0-9_]+$/, "Username can contain only letters, numbers, and underscores")
  .test('no-spaces', 'Username cannot contain spaces', (value) => !/\s/.test(value || ''))
  .transform((value) => value.trim().toLowerCase());

// Name schema
export const nameSchemaYup = Yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .transform((value) => value.trim().replace(/\s+/g, ' '));

// Login form schema
export const loginSchemaYup = Yup.object({
  email: emailSchemaYup,
  password: Yup.string().required("Password is required"),
});

// Signup form schema
export const signupSchemaYup = Yup.object({
  name: nameSchemaYup,
  email: emailSchemaYup,
  username: usernameSchemaYup.optional(),
  password: passwordSchemaYup,
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password')], "Passwords do not match"),
});

// Forgot password schema
export const forgotPasswordSchemaYup = Yup.object({
  email: emailSchemaYup,
});

// Reset password schema
export const resetPasswordSchemaYup = Yup.object({
  password: passwordSchemaYup,
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password')], "Passwords do not match"),
});
*/
