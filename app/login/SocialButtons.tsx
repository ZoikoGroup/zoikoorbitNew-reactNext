"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getGoogleAccessToken,
  getFacebookAccessToken,
  exchangeSocialToken,
  persistAuth,
  type SocialProvider,
} from "./lib/socialAuth";

type Props = {
  /** Where to send the user after a successful social login. */
  redirectTo?: string;
  /** Surface errors in the page's existing error area. */
  onError?: (message: string) => void;
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export default function SocialButtons({ redirectTo = "/dashboard", onError }: Props) {
  const [pending, setPending] = useState<SocialProvider | null>(null);
  const router = useRouter();

  const handleSocial = async (provider: SocialProvider) => {
    if (pending) return;
    setPending(provider);
    try {
      const accessToken =
        provider === "google"
          ? await getGoogleAccessToken()
          : await getFacebookAccessToken();

      const data = await exchangeSocialToken(provider, accessToken);
      persistAuth(data);
      router.replace(redirectTo);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Social login failed";
      onError?.(msg);
    } finally {
      setPending(null);
    }
  };

  const baseBtn =
    "w-full flex items-center justify-center gap-3 py-3 rounded-lg text-sm font-semibold " +
    "transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="space-y-3">
      {/* Or continue with */}
      <div className="flex items-center gap-4 my-2">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
        <span className="text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          Or continue with
        </span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={pending !== null}
        className={`${baseBtn} border bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800`}
      >
        <GoogleIcon />
        <span>{pending === "google" ? "Connecting..." : "Continue with Google"}</span>
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={() => handleSocial("facebook")}
        disabled={pending !== null}
        className={`${baseBtn} bg-[#1877F2] text-white hover:bg-[#166fe0]`}
      >
        <FacebookIcon />
        <span>
          {pending === "facebook" ? "Connecting..." : "Continue with Facebook"}
        </span>
      </button>
    </div>
  );
}

export { SocialButtons };