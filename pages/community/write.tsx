import type { NextPage } from "next";
import Layout from "../../components/layout";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-2">
        <div className="px-4">
          <textarea
            rows={4}
            placeholder="Ask a question!"
            className="focus:border-1 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <button
            className="mt-2 w-full rounded-md border border-transparent bg-orange-500 
                            py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Reply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
