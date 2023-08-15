import { useParams, Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

import { useGetPageData } from "../../hooks/page.hooks";

import { PageData } from "../../types/page.type";
import { BE_URL } from "../../configs";

type MutationParams = {
  username: string;
  comment: string;
  video_id: string | undefined;
};

export default function Video() {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const [pageData, commentsData] = useGetPageData(id as string);

  const [form, setForm] = useState<MutationParams>({
    username: "Anonymous",
    comment: "",
    video_id: id,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const commentMutation = useMutation({
    mutationFn: async (form: MutationParams): Promise<unknown> =>
      await fetch(`${BE_URL}/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }),
    onSuccess: () => {
      setForm((prev) => ({
        ...prev,
        comment: "",
      }));
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.username === "") {
      setForm((prev) => {
        return { ...prev, username: "Anonymous" };
      });
    }
    commentMutation.mutate(form);
    // alert(JSON.stringify(form));
  };

  return (
    <main>
      <div className="page-sections">
        <section className="page-products">
          <div className="products-container">
            {pageData.isSuccess &&
              pageData.data.products.map((product) => {
                return <ProductCard product={product} key={product.url} />;
              })}
          </div>
        </section>
        <section className="page-video">
          {pageData.isSuccess && (
            <iframe
              src={pageData.data?.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          )}
        </section>
        <section className="page-comments">
          <div className="comments-container">
            <div className="comments">
              {commentsData.isSuccess &&
                commentsData.data.map((comment) => {
                  return (
                    <p key={comment.username}>
                      <span>{comment.username} : </span> {comment.comment}
                    </p>
                  );
                })}
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="comment"
                placeholder="Add a public comment..."
                value={form.comment}
                onChange={handleFormChange}
              />
              <button type="submit">Post</button>
            </div>
            <input
              type="text"
              className="username"
              name="username"
              placeholder="comment as..."
              onChange={handleFormChange}
            />
          </form>
        </section>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: PageData["products"][0] }) {
  return (
    <Link
      to={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="product"
    >
      <img src={product.imageUrl} alt={product.title} />
    </Link>
  );
}
