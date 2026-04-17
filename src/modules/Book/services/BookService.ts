import { APIService } from "../../../core/services/APIService";
import { env } from "../../../env/environment.development";
import type { BookResponse } from "../../../core/models/BookDTO";

class BookService {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService(env.APIbaseUrl);
  }

  async getBookByGoogleId(googleId: string): Promise<BookResponse> {
    return this.apiService.get<BookResponse>(`/books/google/${googleId}`);
  }
}

export const bookService = new BookService();
