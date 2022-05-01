import type { NextPage } from "next";
import Layout from "../../components/layout";

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-2 scrollbar-hide">
        <div className="aspect-video w-full rounded-md bg-slate-300" />
        <h3 className="mt-2  text-2xl font-semibold text-gray-800">
          Let&apos;s try potatos
        </h3>
        <div className=" h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much are you selling them for?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦20,000</p>
            </div>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-3 m-0 mx-auto w-full max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 shadow-sm
             focus:border-orange-500 focus:outline-none focus:ring-orange-500
              "
            />
            <div className="absolute inset-y-0 right-0 py-1.5 pr-1.5">
              <button className="flex h-full items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
