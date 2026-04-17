export interface UserAuthContext {
  sub: string;
  email: string;
  name: string;
  access_token: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    email: string;
    name: string;
  };
}
export interface LoginResponse {
  message: string;
  payload: { sub: string; email: string; name: string; role: string };
  access_token?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
