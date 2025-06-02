import { z } from 'zod';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Local storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';
const USERS_KEY = 'users';

// User management
export const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: any) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Authentication functions
export const login = async ({ email, password, rememberMe }: LoginFormData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const users = getStoredUsers();
  const user = users.find((u: any) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = btoa(JSON.stringify({ userId: user.id, email }));

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

  if (!rememberMe) {
    // Token expires in 24 hours if "Remember Me" is not checked
    setTimeout(() => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }, 24 * 60 * 60 * 1000);
  }

  return userWithoutPassword;
};

export const register = async (data: RegisterFormData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const users = getStoredUsers();
  const existingUser = users.find((u: any) => u.email === data.email);

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password,
    createdAt: new Date().toISOString()
  };

  saveUser(newUser);

  // Auto login after registration
  return login({ email: data.email, password: data.password });
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};