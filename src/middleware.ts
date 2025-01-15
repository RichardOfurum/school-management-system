import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  // Resolve the promise to get the auth object
  const { sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      // If role is undefined or not in allowedRoles, redirect to the sign-in page
      if (!role || !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/sign-in`, req.url));
      }
    }
  }

  // If no matchers apply or no redirects are needed, allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/api(.*)",
    "/trpc(.*)",
  ],
};


// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// console.log(matchers);

// export default clerkMiddleware(async (auth, req) => {
//   // Resolve the promise to get the auth object
//   const { sessionClaims } = await auth(); 

//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req) && !allowedRoles.includes(role!)) {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/api(.*)',
//     '/trpc(.*)',
//   ],
// };