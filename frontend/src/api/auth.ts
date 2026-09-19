import { apiClient } from './client';
import { AuthUser, LoginResponse } from '../types/auth';
import { DEMO_USERS } from '../mock/users';

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock login for:', email);
    // Find matching mock user
    const matched = Object.values(DEMO_USERS).find((d) => d.user.email === email);
    if (matched) {
      return {
        access_token: matched.token,
        token_type: 'bearer',
        expires_in: 86400,
        user: matched.user,
      };
    }
    // Default fallback to Marcus if password provided
    const fallback = DEMO_USERS.employee_marcus;
    return {
      access_token: fallback.token,
      token_type: 'bearer',
      expires_in: 86400,
      user: {
        ...fallback.user,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      },
    };
  }
}

export async function getMeApi(): Promise<AuthUser> {
  try {
    const response = await apiClient.get<AuthUser>('/auth/me');
    return response.data;
  } catch (err) {
    const cached = localStorage.getItem('skillradar_user');
    if (cached) return JSON.parse(cached);
    return DEMO_USERS.employee_marcus.user;
  }
}
