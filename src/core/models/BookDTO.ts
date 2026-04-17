import type { LoanStatus } from "./Loan";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  imageUrl: string;
  available: boolean;
  category: string;
  quantity: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  quantity?: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  isbn?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  available?: boolean;
  quantity?: number;
}

export interface BookResponse {
  id: string;
  googleBooksId: string;
  title: string;
  author: string[];
  description: string;
  coverImage?: string[];
  category?: string;
  createdAt: string;
  updatedAt: string;
  loans?: {
    status: LoanStatus;
  };
}

export interface GetBooksResponse {
  books: BookResponse[];
  total: number;
  page: number;
  limit: number;
}

