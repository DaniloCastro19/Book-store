import { APIService } from "../../../core/services/APIService";
import { env } from "../../../env/environment.development";
import type {
  CreateLoanRequest,
  GetLoansResponse,
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

  async getLoans(): Promise<GetLoansResponse> {
    return this.apiService.get<GetLoansResponse>("/loans", {
      ...this.getHeaders(),
    });
  }

  async returnLoan(loanId: string): Promise<LoanResponse> {
    return this.apiService.post<LoanResponse>(
      `/loans/${loanId}/return`,
      {},
      {
        ...this.getHeaders(),
      },
    );
  }
}

export const loanService = new LoanService();
