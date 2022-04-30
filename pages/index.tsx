import type { NextPage } from "next";
import tw from "tailwind-styled-components";

const Container = tw.div`
  flex
  flex-col
  space-y-5
  bg-slate-400
  py-20
  px-20
  flex   
  min-h-screen
`;

const Home: NextPage = () => {
  return (
    <Container>
      <details className="select-none open:bg-indigo-400 open:text-white">
        <summary className="cursor-pointer">What is my fav. food.</summary>
        <span>김치</span>
      </details>
      <ul className="list-decimal marker:text-teal-500">
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>
      <input
        type="file"
        className="file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-500 
              file:px-5 file:text-white file:transition-colors file:duration-1000
               file:hover:border-purple-400 file:hover:bg-white file:hover:text-purple-400"
      />
      <p className="transition first-letter:text-7xl first-letter:hover:text-purple-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni sed illo iure
        tenetur magnam optio impedit in ratione inventore! Neque?
      </p>
    </Container>
  );
};

export default Home;
