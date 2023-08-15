import { useQueries } from "@tanstack/react-query";

import { PageData, CommentData } from "../types/page.type";

import { BE_URL } from "../configs";

export const useGetPageData = (id: string) =>
  useQueries({
    queries: [
      {
        queryKey: ["video", id],
        queryFn: async () => {
          const response = await fetch(`${BE_URL}/v1/videos/${id}`);
          const data = await response.json();
          return data as PageData;
        },
      },
      {
        queryKey: ["comments", id],
        queryFn: async () => {
          const response = await fetch(`${BE_URL}/v1/comments/${id}`);
          const data = await response.json();
          return data as CommentData[];
        },
      },
    ],
  });
