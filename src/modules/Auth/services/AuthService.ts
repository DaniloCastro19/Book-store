import { APIService } from "../../../core/services/APIService";
import { env } from "../../../env/environment.development";
import type {
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  LoginResponse,
} from "../../../core/models/Auth";

class AuthService {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService(env.APIbaseUrl);
  }

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    console.log("payload: ", payload);
    return this.apiService.post<RegisterResponse>("/auth/signUp", payload);
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    return this.apiService.post<LoginResponse>("/auth/signIn", payload);
  }
}

export const authService = new AuthService();
