import { auth } from "@clerk/nextjs/server";

const getSessionClaims = async () => {
    const { sessionClaims } = await auth();
    const getRole = (sessionClaims?.metadata as { role?: string })?.role;

    return getRole;
}

const role = getSessionClaims();