import { APIService } from "../../../core/services/APIService";
import { env } from "../../../env/environment.development";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../../../core/models/Auth";

class AuthService {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService(env.APIbaseUrl);
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return this.apiService.post<AuthResponse>("/auth/register", payload);
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.apiService.post<AuthResponse>("/auth/login", payload);
  }
}

export const authService = new AuthService();
