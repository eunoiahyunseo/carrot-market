// import { Html, Head, Main, NextScript } from "next/document";

import { Head, Html, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html>
//       <Head />
//       <link
//         rel="stylesheet"
//         href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//       />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

export default function Document() {
  // console.log("DOCUMENT IS RUNNING");
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
