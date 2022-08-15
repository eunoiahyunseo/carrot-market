import type {
  GetServerSideProps,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from "next";
import Layout from "@components/layout";
import TextArea from "@components/textArea";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { cls, userUrl } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import client from "@libs/client/client";
import { withSsrSession } from "@libs/server/withSession";
import { SWRConfig } from "swr";
import Image from "next/image";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wondering: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok?: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );

  const [
    sendAnswer,
    { data: answerData, loading: answerLoading },
  ] = useMutation<AnswerResponse>(
    `/api/posts/${router.query.id}/answers`
  );

  const { register, handleSubmit, reset } =
    useForm<AnswerForm>();

  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      // swr을 통해서 페이지를 다시 로딩하기 위함이다.
      mutate();
    }
  }, [answerData, reset, mutate]);

  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            wondering: data.isWondering
              ? data?.post._count.wondering - 1
              : data?.post._count.wondering + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };

  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 inline-flex items-center rounded-full bg-gray-100 px-4 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex  items-center space-x-3 border-b py-2 px-3">
          {data?.post?.user?.avatar ? (
            <div className="relative aspect-square w-10">
              <Image
                alt="community chat profile preview"
                layout="fill"
                src={userUrl(data?.post?.user?.avatar) as string}
                className="rounded-full object-contain"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user?.name}
            </p>
            <Link
              href={`/users/profiles/${data?.post?.user?.id}`}
            >
              <a className="cursor-pointer text-xs font-medium text-gray-500">
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>

        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">
              Q.
            </span>{" "}
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] py-2.5 px-4 text-gray-700">
            <button
              onClick={() => onWonderClick()}
              className={cls(
                "flex items-center space-x-2 text-sm",
                data?.isWondering ? "text-teal-400" : ""
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>궁금해요 {data?.post?._count?.wondering}</div>
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <div>답변 {data?.post?._count?.answers}</div>
            </div>
          </div>
        </div>

        <div className="my-5 space-y-5 px-4">
          {data?.post?.answers.map((answer) => (
            <div
              key={answer?.id}
              className="flex items-start space-x-3"
            >
              {answer.user?.avatar ? (
                <div className="relative aspect-square w-10">
                  <Image
                    alt="community chat profile preview"
                    layout="fill"
                    src={userUrl(answer.user?.avatar) as string}
                    className="rounded-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-slate-300" />
              )}
              <div className="">
                <span className="block text-sm font-medium text-gray-700">
                  {answer?.user?.name}
                </span>
                <span className="block text-xs font-medium text-gray-500">
                  {/* {answer?.createdAt.toISOString()} */}
                </span>
                <p className="mt-[1.5px] text-gray-700">
                  {answer?.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            placeholder="Answer this question!"
            name="description"
            register={register("answer", {
              required: true,
              minLength: 5,
            })}
          />
          <Button
            text={answerLoading ? "Loading..." : "Reply"}
          />
        </form>
      </div>
    </Layout>
  );
};

const Page: NextPage<CommunityPostResponse> = ({
  post,
  isWondering,
}) => {
  const router = useRouter();
  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/posts/${router.query.id}`]: {
            ok: true,
            post,
            isWondering,
          },
        },
      }}
    >
      <CommunityPostDetail />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(
  async function ({ req, params }: any) {
    if (!params?.id) {
      return {
        props: {},
      };
    }

    const post = await client.post.findUnique({
      where: {
        id: +params.id.toString(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        answers: {
          select: {
            id: true,
            answer: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            answers: true,
            wondering: true,
          },
        },
      },
    });

    const isWondering = Boolean(
      await client.wondering.findFirst({
        where: {
          postId: +params?.id.toString(),
          userId: req?.session.user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        isWondering: JSON.parse(JSON.stringify(isWondering)),
      },
    };
  }
);

export default Page;
