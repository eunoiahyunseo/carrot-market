import type { NextPage } from "next";
import Layout from "../components/layout";
import Item from "../components/item";
import FloatingButton from "../components/FloatingButton";

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
      <div className="p flex flex-col space-y-5 py-2">
        {[...Array(11)].map((_, i) => (
          <Item
            key={i}
            id={i + 1}
            title="new iPhone 14"
            price={95}
            comments={1}
            hearts={1}
          />
        ))}

        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
