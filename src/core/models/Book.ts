export interface VolumeInfo {
  id: string;
  title: string;
  authors: string[];
  state: State;
  imageLinks: ImageLinks;
  description?: string;
}

export interface BookVolume {
  id: string;
  volumeInfo: VolumeInfo;
  mainCategory?: string;
  accessInfo?: AccesInfo;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface AccesInfo {
  embeddable: boolean;
}

type State = "Borrowed" | "Available" | "Not Available";
