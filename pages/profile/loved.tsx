import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import ProductList from "@components/product-list";

const Loved: NextPage = () => (
  <Layout canGoBack>
    <div className="p flex flex-col space-y-5 py-3">
      <ProductList kind="favs" />
    </div>
  </Layout>
);

export default Loved;
