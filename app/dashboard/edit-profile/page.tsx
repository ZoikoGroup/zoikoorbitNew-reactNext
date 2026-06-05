"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Edit Profile — wired to Django:
 *   PUT /api/accounts/update-profile/
 *   Auth: Token <zoikoorbit_token>
 *   Fields: username, email, first_name, last_name
 *
 * localStorage keys used by this site:
 *   zoikoorbit_token  — auth token
 *   zoikoorbit_user   — JSON user object
 */

interface ProfileForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Toast {
  msg: string;
  type: "success" | "error" | "";
}

const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/update-profile/`;

export default function EditProfilePage() {
  const router = useRouter();
  const [token, setToken]         = useState("");
  const [form, setForm]           = useState<ProfileForm>({ username: "", email: "", first_name: "", last_name: "" });
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState<Toast>({ msg: "", type: "" });

  // ── Load from localStorage ──────────────────────────────────────
  useEffect(() => {
    const t = localStorage.getItem("zoikoorbit_token") || "";
    setToken(t);
    if (!t) { router.replace("/login?next=/dashboard/edit-profile"); return; }

    try {
      const u = JSON.parse(localStorage.getItem("zoikoorbit_user") || "{}");
      setForm({
        username:   u.username   || "",
        email:      u.email      || "",
        first_name: u.first_name || "",
        last_name:  u.last_name  || "",
      });
    } catch { /* ignore */ }
  }, [router]);

  // ── Toast helper ────────────────────────────────────────────────
  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3500);
  }

  // ── Submit ──────────────────────────────────────────────────────
  async function handleSave() {
    if (!form.username.trim()) { showToast("Username is required.", "error"); return; }
    if (!form.email.trim())    { showToast("Email is required.", "error"); return; }

    setSaving(true);
    try {
      const res  = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        // Sync localStorage so the rest of the dashboard stays fresh
        const stored = JSON.parse(localStorage.getItem("zoikoorbit_user") || "{}");
        localStorage.setItem("zoikoorbit_user", JSON.stringify({ ...stored, ...data.user }));
        showToast("Profile updated successfully.", "success");
      } else {
        const err = Object.values(data).flat().join(" ");
        showToast((err as string) || "Something went wrong.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-gray-100 dark:bg-gray-900 dark:text-white py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              ← Back
            </button>
          </div>

          {/* Toast */}
          {toast.msg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm ${
              toast.type === "success"
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-red-50 border-red-300 text-red-700"
            }`}>
              <span>{toast.type === "success" ? "✓" : "✕"}</span>
              {toast.msg}
            </div>
          )}

          {/* Profile card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-5">

            {/* Avatar placeholder */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#10446C] flex items-center justify-center text-white text-xl font-bold shrink-0">
                {form.first_name ? form.first_name[0].toUpperCase() : form.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {form.first_name || form.username || "Your Name"}
                  {form.last_name ? ` ${form.last_name}` : ""}
                </p>
                <p className="text-xs text-gray-400">{form.email}</p>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="John"
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
                <p className="text-[11px] text-gray-400 mt-1">Changing email affects your login.</p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => router.back()}
                className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Info note */}
          <p className="text-xs text-gray-400 text-center">
            Password changes are handled in{" "}
            <a href="/dashboard/security" className="text-green-600 hover:underline">Security Settings</a>.
          </p>

        </div>
      </main>
    </div>
  );
}