// import type { NextRequest, NextFetchEvent } from "next/server";
// import { NextResponse } from "next/server";

// export function middleware(
//   req: NextRequest,
//   ev: NextFetchEvent
// ) {
//   // @ts-ignore
//   if (req.ua?.isBot) {
//     return new Response("Plz don't be a bot. Be human", {
//       status: 403,
//     });
//   }

//   if (!req.url.includes("/api")) {
//     if (
//       !req.url.includes("/enter") &&
//       // @ts-ignore
//       !req.cookies.carrotsession
//     ) {
//       return NextResponse.redirect(
//         "http://localhost:3000/enter"
//       );
//     }
//   }

//   //   return NextResponse.json({ ok: true });
// }
