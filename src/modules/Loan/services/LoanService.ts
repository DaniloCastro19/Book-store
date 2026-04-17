import { APIService } from "../../../core/services/APIService";
import { env } from "../../../env/environment.development";
import type {
  CreateLoanRequest,
  LoanResponse,
} from "../../../core/models/Loan";

class LoanService {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService(env.APIbaseUrl);
  }

  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async createLoan(
    payload: CreateLoanRequest,
  ): Promise<LoanResponse> {
    return this.apiService.post<LoanResponse>("/loans", payload, {
      ...this.getHeaders(),
    });
  }

  async getLoans(): Promise<LoanResponse[]> {
    return this.apiService.get<LoanResponse[]>("/loans", {
      ...this.getHeaders(),
    });
  }

  async getLoansByUser(userId: string): Promise<LoanResponse[]> {
    return this.apiService.get<LoanResponse[]>(`/loans/${userId}`, {
      ...this.getHeaders(),
    });
  }

  async returnLoan(loanId: string, userId: string): Promise<LoanResponse> {
    return this.apiService.put<LoanResponse>(
      `/loans/${loanId}/return`,
      {
        userId: userId,
      },
      {
        ...this.getHeaders(),
      },
    );
  }
}

export const loanService = new LoanService();
