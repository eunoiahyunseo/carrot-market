import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";

import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";
import client from "@libs/client/client";

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  // const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } =
    useSWR<ItemDetailResponse>(
      router.query.id ? `/api/products/${router.query.id}` : null
    );

  const [toggleFav] = useMutation(
    `/api/products/${router.query.id}/fav`
  );

  const onFavClick = () => {
    // SWR boundMutate를 활용해 캐시로 바로 UI에 업데이터 하고, Revalidate는 안하고
    // 실제로 mutate를 DB에 주어서 ( toggleFav )로 값에 변화는 주어야 함.
    toggleFav({});
    if (!data) return;
    boundMutate(
      (prev) => prev && { ...prev, isLiked: !prev.isLiked },
      false
    );
    // mutate(
    //   "/api/users/me",
    //   (prev: any) => {
    //     console.log(prev);
    //     return { ok: !prev.ok };
    //   },
    //   false
    // );
  };

  if (router.isFallback) {
    return (
      <Layout title="Loading for you">
        <span>Loading...</span>
      </Layout>
    );
  }

  return (
    <Layout canGoBack seoTitle="Product Detail">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={data === undefined}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="px-4 py-3">
        <div className="mb-8">
          <div className="relative pb-64">
            <Image
              src={`https://imagedelivery.net/_SMYXsMOOEvTYhYAAKoRCQ/${product?.image}/public`}
              className="bg-slate-300 object-cover"
              alt=""
              layout="fill"
            />
          </div>
          <div className="mt-1 flex items-center space-x-3 border-t border-b py-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/_SMYXsMOOEvTYhYAAKoRCQ/${product?.user?.avatar}/avatar`}
              className="h-12 w-12 rounded-full bg-slate-300"
              alt=""
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user?.name}
              </p>
              <Link
                href={`/users/profiles/${product?.user?.id}`}
              >
                <a className="cursor-pointer text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className="mt-3 block text-3xl text-gray-900">
              ${product?.price}
            </span>
            <p className="my-6 text-base text-gray-700">
              {product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button text="Talk to seller" large />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-3  hover:bg-gray-100",
                  isLiked
                    ? "text-red-400 hover:text-red-500"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Similar items
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {relatedProducts?.map(({ id, name, price }) => (
              <Link href={`/products/${id}`} key={id}>
                <a>
                  <div className="mb-4 h-56 w-full bg-slate-300" />
                  <h3 className=" -mb-1 text-gray-700">
                    {name}
                  </h3>
                  <span className="text-sm font-medium text-gray-900">
                    ${price}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const product = await client.product.findUnique({
    where: { id: +ctx.params.id.toString() },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // 현재 상품의 이름을 공백을 기준으로 분리해
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  const isLiked = false;

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatiedProducts: JSON.parse(
        JSON.stringify(relatedProducts)
      ),
      isLiked,
    },
  };
};
export default ItemDetail;
