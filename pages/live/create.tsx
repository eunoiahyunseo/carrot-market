import type { NextPage } from "next";
import Layout from "../../components/layout";
import TextArea from "../../components/textArea";
import Button from "../../components/button";
import Input from "../../components/Input";

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className=" space-y-5 py-2 px-4">
        <Input name="name" label="Name" required />
        <Input name="price" label="Price" kind="price" required />
        <TextArea name="description" label="Description" />
        <Button text="Go live" />
      </div>
    </Layout>
  );
};

export default Create;
