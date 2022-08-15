import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect, useRef } from "react";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } =
    useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );

  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation(`/api/streams/${router.query.id}/messages`);

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );
    scrollRef?.current?.scrollIntoView();
    sendMessage(form);
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-2 scrollbar-hide">
        <div className="aspect-video w-full rounded-md bg-slate-300">
          {data?.stream.cloudflareId ? (
            <iframe
              className="aspect-video w-full"
              src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          ) : null}
        </div>
        <h1 className="mt-2  text-3xl font-bold text-gray-900">
          {data?.stream?.name}
        </h1>
        <span className="mt-3 block text-2xl text-gray-900">
          ${data?.stream?.price}
        </span>
        <p className="my-6 text-gray-700">
          {data?.stream?.description}
        </p>
        <div className="flex flex-col space-y-3 overflow-scroll rounded-lg bg-orange-300 p-5">
          <span>Stream Keys (secret)</span>
          <span className="text-gray-600">
            <span className="font-medium text-gray-800">
              URL
            </span>
            :{data?.stream?.cloudflareUrl}
          </span>
          <span className="text-gray-600">
            <span className="font-medium text-gray-800">
              Key
            </span>
            :{data?.stream?.cloudflareKey}
          </span>
        </div>
        <div className=" h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
          {data?.stream?.messages.map((message) => (
            <Message
              key={message.id}
              message={message.message}
              reversed={message.user.id === user?.id}
              avatarUrl={message.user.avatar}
            />
          ))}

          <div ref={scrollRef} className="block h-8" />
        </div>
        <div className="fixed inset-x-0 bottom-3 m-0 mx-auto w-full max-w-md">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              type="text"
              {...register("message", { required: true })}
              className="w-full rounded-full border-gray-300 shadow-sm
             focus:border-orange-500 focus:outline-none focus:ring-orange-500
              "
            />
            <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5">
              <button className="flex h-full items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
