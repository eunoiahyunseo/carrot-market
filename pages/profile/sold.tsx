import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="p flex flex-col space-y-5 py-3">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
