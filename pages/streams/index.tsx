import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import FloatingButton from "@components/FloatingButton";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import { streamThumbnail } from "@libs/client/utils";

interface StreamWithUid extends Stream {
  uid: string;
}

interface StreamsResponse {
  ok: boolean;
  streams: StreamWithUid[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResponse>(
    `/api/streams?page=1`
  );

  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-4 divide-y-2">
        {data?.streams.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a>
              <h3 className="mt-6 mb-6 text-xl font-bold text-gray-700">
                {stream?.name}
              </h3>
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-300 object-cover">
                <Image
                  layout="fill"
                  alt="stream sumbnail"
                  src={streamThumbnail(stream?.uid)}
                  priority={true}
                />
              </div>
              <div className="h-10 w-full border-b-2" />
            </a>
          </Link>
        ))}

        <FloatingButton href="/streams/create">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
