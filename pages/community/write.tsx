import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import TextArea from "@components/textArea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] =
    useMutation<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <form
        onSubmit={handleSubmit(onValid)}
        className="space-y-2 px-4"
      >
        <div className="px-4">
          <TextArea
            register={register("question", {
              required: true,
              minLength: 5,
            })}
            placeholder="Ask a question!"
            required
          />
          <Button text={loading ? "Loading..." : "submit"} />
        </div>
      </form>
    </Layout>
  );
};

export default Write;
