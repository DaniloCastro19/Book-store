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

export type LoanStatus = "ACTIVE" | "RETURNED" | "OVERDUE";

export interface CreateLoanRequest {
  googleBooksId: string;
  userId: string;
  title: string;
  authors: string[];
  description?: string;
  coverImage?: string;
  category?: string;
  dueDate?: string;
}

export interface LoanResponse {
  id: string;
  bookId: string;
  userId: string;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  status: LoanStatus;
  book: {
    id: string;
    title: string;
    authors: string[];
    coverImage?: string;
  };
}

export interface GetLoansResponse {
  loans: LoanResponse[];
}
