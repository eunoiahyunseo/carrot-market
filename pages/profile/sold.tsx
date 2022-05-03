import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";

const Sold: NextPage = () => (
  <Layout canGoBack>
    <div className="p flex flex-col space-y-5 py-3">
      {[...Array(5)].map((_, i) => (
        <Item
          key={i}
          title="iPhone 14"
          price={99}
          id={i}
          comments={1}
          hearts={1}
        />
      ))}
    </div>
  </Layout>
);

export default Sold;
