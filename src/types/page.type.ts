export type PageData = {
  id: string;
  url: string;
  products: {
    _id: string;
    url: string;
    imageUrl: string;
    title: string;
    price: number;
  }[];
};

export type CommentData = {
  id: string;
  username: string;
  comment: string;
  // timestamp: string;
};
