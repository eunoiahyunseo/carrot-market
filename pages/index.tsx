import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="dark:md:hover:bg-teal-400">
      <h2 className="bg-[url('/vercel.svg')] bg-no-repeat text-[200px] text-[#000]">
        Hello
      </h2>
    </div>
  );
};

export default Home;
