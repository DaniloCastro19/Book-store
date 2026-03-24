export interface Book {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
}

export interface BookVolume {
  id: string;
  volumeInfo: Book
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
