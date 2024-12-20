"use client";

import { BackToHome } from "@/components/backToHome/backToHome";

type UserAgentProps = {
  userAgent: string;
};

export const UserAgent = ({ userAgent }: UserAgentProps) => {
  return (
    <div>
      <BackToHome />

      {userAgent ? (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>
          <div className="border p-2">{userAgent}</div>
        </div>
      ) : (
        <div>No user agent</div>
      )}
    </div>
  );
};
