import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = async () => {
  // Fetch the User-Agent from server headers
  const userAgent = (await headers()).get("user-agent") || "Unknown User Agent";
  return <UserAgent userAgent={userAgent} />;
};

export default UserAgentRoot;
