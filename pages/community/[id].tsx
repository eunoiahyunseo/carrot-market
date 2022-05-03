import type { NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textArea";
import Button from "@components/button";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 inline-flex items-center rounded-full bg-gray-100 px-4 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex  items-center space-x-3 border-b py-2 px-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Steve Jebs
            </p>
            <p className="cursor-pointer text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>

        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">
              Q.
            </span>{" "}
            What is the best mandu restaurant?
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] py-2.5 px-4 text-gray-700">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>궁금해요 1</div>
            </div>
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
              <div>답변 1</div>
            </div>
          </div>
        </div>

        <div className="my-5 space-y-5 px-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-start space-x-3"
            >
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="">
                <span className="block text-sm font-medium text-gray-700">
                  Steve Jebs
                </span>
                <span className="block text-xs font-medium text-gray-500">
                  2시간 전
                </span>
                <p className="mt-[1.5px] text-gray-700">
                  The best mandu restaurant is the one
                  next to my house.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <TextArea
            placeholder="Answer this question!"
            name="description"
          />
          <Button text="Reply" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
