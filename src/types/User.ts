// src/types/User.ts

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  role: UserRole;
  is_active: boolean;
  date_joined: string; // ISO date string
  last_login?: string; // ISO date string
}

export interface UserProfile extends User {
  staff_profile?: StaffProfile;
  restaurant?: number; // Restaurant ID if user is staff
  created_at: string;
}

export interface StaffProfile {
  id: number;
  user: number; // User ID
  restaurant: number; // Restaurant ID
  position?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserProfile;
  tokens: TokenPair;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  password2: string; // Confirmation password
  role?: UserRole;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmation {
  token: string;
  new_password: string;
  new_password2: string;
}

export interface PasswordChangeRequest {
  old_password: string;
  new_password: string;
  new_password2: string;
}

export interface UserPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserSettings extends UserPreferences {
  id: number;
  user: number; // User ID
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ErrorResponse {
  detail?: string;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  non_field_errors?: string[];
}

// Social Auth Types
export interface SocialAuthResponse {
  tokens: TokenPair;
  user: UserProfile;
  is_new_user: boolean;
}

export interface GoogleAuthResponse {
  token: string;
  profile: {
    email: string;
    name: string;
    picture?: string;
  };
}

export interface AppleAuthResponse {
  token: string;
  profile: {
    email: string;
    name: string;
  };
}

// Session Types
export interface SessionInfo {
  id: string;
  user_agent: string;
  ip_address: string;
  last_active: string;
  is_current: boolean;
}

// Enums
export enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  ADMIN = 'admin'
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  APPLE = 'apple'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

// Type Guards
export const isStaffMember = (user: UserProfile): boolean => {
  return user.role === UserRole.STAFF || user.role === UserRole.ADMIN;
};

export const isAdmin = (user: UserProfile): boolean => {
  return user.role === UserRole.ADMIN;
};

export const hasStaffProfile = (user: UserProfile): user is UserProfile & { staff_profile: StaffProfile } => {
  return user.staff_profile !== undefined;
};

// Utility Types
export type UpdateUserProfileData = Partial<Omit<UserProfile, 'id' | 'email' | 'role' | 'date_joined' | 'last_login'>>;

export type CreateUserData = Omit<User, 'id' | 'date_joined' | 'last_login' | 'is_active'>;

export interface UserActivityLog {
  id: number;
  user: number;
  action: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  password2: string;
  terms_accepted: boolean;
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthError {
  code: string;
  message: string;
  errors?: ValidationError[];
}

// Auth State Types
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  registerUser: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateUserProfileData) => Promise<void>;
  clearError: () => void;
}

// Permission Types
export interface UserPermission {
  id: number;
  codename: string;
  name: string;
  content_type: number;
}

export interface UserGroup {
  id: number;
  name: string;
  permissions: UserPermission[];
}

// Composite Types
export interface CompleteUserProfile extends UserProfile {
  permissions: UserPermission[];
  groups: UserGroup[];
  preferences: UserPreferences;
  settings: UserSettings;
}

export interface UserNotification {
  id: number;
  user: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  created_at: string;
}

export interface UserStats {
  total_orders: number;
  total_spent: number;
  favorite_items: number[];
  last_order_date?: string;
  member_since: string;
}

// Request/Response Types for API Endpoints
export interface UpdatePasswordResponse {
  message: string;
  success: boolean;
}

export interface VerifyEmailResponse {
  message: string;
  verified: boolean;
}

export interface RefreshTokenResponse {
  access: string;
}

// Validators
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidName = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
};