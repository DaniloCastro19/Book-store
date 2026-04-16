export interface Loan {
  id: string;
  googleBookId: string;
  userId: string;
  title: string;
  authors: string[];
  description: string;
  coverImageUrl?: string;
  category?: string;
  borrowDate: string;
  returnDate: string | null;
  status: LoanStatus;
}

export type LoanStatus = "active" | "returned" | "overdue";

export interface CreateLoanRequest {
  bookId: string;
}

export interface LoanResponse {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  returnDate: string | null;
  status: LoanStatus;
}

export interface GetLoansResponse {
  loans: LoanResponse[];
}
