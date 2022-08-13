import { Suspense } from "react";

// let finished = false;
// function List() {
//   console.log("server doing");
//   if (!finished) {
//     throw Promise.all([
//       new Promise((resolve) => setTimeout(resolve, 10000)),
//       new Promise((resolve) => {
//         finished = true;
//         resolve("");
//       }),
//     ]);
//   }
//   return <ul>xxxxx</ul>;
// }

const cache: any = {};

function fetchData(url: string) {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((json) => (cache[url] = json)),
      new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 1555))
      ),
    ]);
  }
  return cache[url];
}

function Coin({ id, name, symbol }: any) {
  console.log(
    "check cache",
    cache[`https://api.coinpaprika.com/v1/tickers/${id}`]
  );
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  return (
    <span>
      {name} / {symbol}: ${price}
    </span>
  );
}

function List() {
  const coins = fetchData(
    "https://api.coinpaprika.com/v1/coins"
  );
  return (
    <div>
      <h4>List is done</h4>
      <ul>
        {coins.slice(0, 10).map((coin: any) => (
          <li key={coin.id}>
            <Suspense fallback="Loading...">
              <Coin {...coin} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Coins() {
  console.log("asdf");
  return (
    <div>
      <h1>Welcome to RSC</h1>
      <Suspense fallback="Rendering in the server...">
        <List />
      </Suspense>
    </div>
  );
}

export const config = {
  runtime: "edge",
};
