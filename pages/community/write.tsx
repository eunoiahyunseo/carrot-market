import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import TextArea from "../../components/textArea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="space-y-2 px-4">
        <div className="px-4">
          <TextArea placeholder="Ask a question!" required />
          <Button text="submit" />
        </div>
      </form>
    </Layout>
  );
};

export default Write;
