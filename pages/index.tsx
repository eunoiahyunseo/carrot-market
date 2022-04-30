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
      <div className="rounded-2xl bg-white p-6 shadow-2xl">
        <span className="text-3xl font-semibold">Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="my-2 flex justify-between odd:bg-yellow-200 even:bg-blue-100"
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
          <ul>
            {["a", "b", "c", ""].map((c, i) => (
              <li key={i} className="bg-red-500 py-2 empty:hidden">
                {c}
              </li>
            ))}
          </ul>
        </ul>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mx-auto mt-5 block w-1/2 rounded-xl bg-blue-500 p-5 text-center
          text-white hover:bg-teal-500 hover:text-black focus:bg-red-500 active:bg-yellow-500
        "
        >
          Checkout
        </button>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-zinc-300 transition-colors group-hover:bg-red-300" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="-mt-10 -mb-5 flex flex-col items-center">
            <span className="text-lg">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-10 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <span>⬅</span>
          <div className="space-x-3">
            <span>⭐️4.9</span>
            <span className="rounded-md p-2 shadow-xl">💖</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="mb-1.5 text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500 bg-opacity-80 ring-yellow-500 ring-offset-1 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-indigo-500 bg-opacity-80 ring-indigo-500 ring-offset-1 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-teal-500 bg-opacity-80 ring-teal-500 ring-offset-1 transition focus:ring-2" />
            </div>
            <div className="flex items-center space-x-5">
              <button className="flex aspect-square w-8 items-center justify-center rounded-xl bg-blue-200 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="flex aspect-square w-8 items-center justify-center rounded-xl bg-blue-200 text-xl  text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">$450</span>
            <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <form className="flex flex-col space-y-2 bg-blue-300 p-5 focus-within:bg-blue-500">
        <input
          type="text"
          required
          placeholder="Username"
          // disabled
          // className="invalid:bg-red-500"
          // className="placeholder:text-red-500"
          // className="disabled:opacity-0"
          className="required:bg-yellow-500 valid:bg-teal-500 "
        ></input>
        <input type="password" required placeholder="Password"></input>
        <input type="submit" value="Login" className="bg-white"></input>
      </form>

      <form className="flex flex-col space-y-2 p-5">
        <input
          type="text"
          required
          placeholder="Username"
          className="peer rounded-lg border border-gray-400 p-1"
        />
        <span className="hidden peer-invalid:block peer-invalid:text-red-500">
          This input is invalid
        </span>
        <span className="hidden peer-valid:block peer-valid:text-teal-500">
          Awesome username
        </span>
        <span className="hidden peer-hover:block peer-hover:text-amber-500">
          Hello
        </span>
        <input type="submit" value="Login" className="bg-white"></input>
      </form>
    </Container>
  );
};

export default Home;
