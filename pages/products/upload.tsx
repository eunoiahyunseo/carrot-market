import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/Input";
import TextArea from "@components/textArea";

import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } =
    useForm<UploadProductForm>();

  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");

  const onValid = async ({
    name,
    price,
    description,
  }: UploadProductForm) => {
    // 여러번 요청이 가는 것을 막기 위함.
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (
        await fetch(`/api/files`)
      ).json();
      const form = new FormData();
      // 업로드할 제품의 이름을 그대로 사진의 이름으로 한다.
      form.append("file", photo[0], name);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  const [photoPreview, setPhotoPreview] = useState("");
  const photo = watch("photo");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <Layout canGoBack>
      <form
        className="space-y-5 px-4 py-3"
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div>
            {photoPreview ? (
              <img
                src={photoPreview}
                className="h-46 flex aspect-video  w-full items-center justify-center  rounded-md border-gray-300 py-6 text-gray-600"
              />
            ) : (
              <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 py-6 text-gray-600 hover:border-orange-500 hover:text-orange-500">
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  {...register("photo")}
                  className="hidden"
                  type="file"
                  accept="image/*"
                />
              </label>
            )}
          </div>
          <Input
            register={register("name", { required: true })}
            required
            label="Name"
            name="name"
            type="text"
          />
          <Input
            register={register("price", { required: true })}
            required
            label="Price"
            name="price"
            kind="price"
            type="number"
          />
          <TextArea
            register={register("description", {
              required: true,
            })}
            name="description"
            label="Description"
            required
          />
          <Button
            text={loading ? "Loading ..." : "Upload item"}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
