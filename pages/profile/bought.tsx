import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Bought: NextPage = () => (
  <Layout canGoBack>
    <div className="p flex flex-col space-y-5 py-3">
      <ProductList kind="purchases" />
    </div>
  </Layout>
);

export default Bought;
