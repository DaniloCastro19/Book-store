export interface Book {
  title: string;
  authors: string[];
  state: State;
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

type State = "Borrowed" | "Available" | "Not Available";
