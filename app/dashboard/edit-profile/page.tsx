"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Edit Profile — wired to Django:
 *   PUT  /api/accounts/update-profile/   → username, email, first_name, last_name
 *   POST /api/accounts/change-password/  → current_password, new_password, confirm_password
 *   Auth: Token <zoikoorbit_token>
 */

interface ProfileForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface PasswordForm {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface Toast {
  msg: string;
  type: "success" | "error" | "";
}

const PROFILE_API  = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/update-profile/`;
const PASSWORD_API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/change-password/`;

export default function EditProfilePage() {
  const router = useRouter();

  const [token, setToken]           = useState("");
  const [form, setForm]             = useState<ProfileForm>({ username: "", email: "", first_name: "", last_name: "" });
  const [saving, setSaving]         = useState(false);
  const [passForm, setPassForm]     = useState<PasswordForm>({ current_password: "", new_password: "", confirm_password: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [toast, setToast]           = useState<Toast>({ msg: "", type: "" });

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

  // ── Toast ────────────────────────────────────────────────────────
  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3500);
  }

  // ── Save profile ─────────────────────────────────────────────────
  async function handleSave() {
    if (!form.username.trim()) { showToast("Username is required.", "error"); return; }
    if (!form.email.trim())    { showToast("Email is required.", "error"); return; }
    setSaving(true);
    try {
      const res  = await fetch(PROFILE_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
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

  // ── Change password ──────────────────────────────────────────────
  async function handleChangePassword() {
    const { current_password, new_password, confirm_password } = passForm;
    if (!current_password)             { showToast("Current password is required.", "error"); return; }
    if (new_password.length < 8)       { showToast("New password must be at least 8 characters.", "error"); return; }
    if (new_password !== confirm_password) { showToast("Passwords do not match.", "error"); return; }
    if (new_password === current_password) { showToast("New password must be different from current.", "error"); return; }

    setPassLoading(true);
    try {
      const res  = await fetch(PASSWORD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
        body: JSON.stringify({ current_password, new_password, confirm_password }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Password changed successfully.", "success");
        if (data.token) { localStorage.setItem("zoikoorbit_token", data.token); setToken(data.token); }
        setPassForm({ current_password: "", new_password: "", confirm_password: "" });
      } else {
        const err = Object.values(data).flat().join(" ");
        showToast((err as string) || "Something went wrong.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setPassLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePassChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const strengthColor = passForm.new_password.length === 0 ? ""
    : passForm.new_password.length < 8  ? "text-red-500"
    : passForm.new_password.length < 12 ? "text-amber-500"
    : "text-green-600";

  const strengthLabel = passForm.new_password.length === 0 ? ""
    : passForm.new_password.length < 8  ? `✗ Need ${8 - passForm.new_password.length} more character(s)`
    : passForm.new_password.length < 12 ? "✓ Good"
    : "✓ Strong";

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

          {/* ── Profile card ──────────────────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-5">

            {/* Avatar */}
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
              <Field label="First Name" name="first_name" placeholder="John"            value={form.first_name} onChange={handleChange} />
              <Field label="Last Name"  name="last_name"  placeholder="Doe"             value={form.last_name}  onChange={handleChange} />
              <Field label="Username"   name="username"   placeholder="johndoe"         value={form.username}   onChange={handleChange} />
              <div>
                <Field label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                <p className="text-[11px] text-gray-400 mt-1">Changing email affects your login.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
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

          {/* ── Change Password card ──────────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-5">

            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-sm">
                  🔒
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Change Password</h2>
              </div>
              <button
                onClick={() => setShowPass(p => !p)}
                className="text-xs text-green-600 hover:underline"
              >
                {showPass ? "Hide" : "Change password"}
              </button>
            </div>

            {showPass && (
              <>
                <hr className="border-gray-100 dark:border-gray-700" />

                <div className="space-y-4">

                  {/* Current password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current_password"
                      placeholder="Your current password"
                      value={passForm.current_password}
                      onChange={handlePassChange}
                      className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* New password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        placeholder="Min. 8 characters"
                        value={passForm.new_password}
                        onChange={handlePassChange}
                        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                      />
                      {strengthLabel && (
                        <p className={`text-[11px] mt-1 ${strengthColor}`}>{strengthLabel}</p>
                      )}
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        placeholder="Repeat new password"
                        value={passForm.confirm_password}
                        onChange={handlePassChange}
                        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                      />
                      {passForm.confirm_password && (
                        <p className={`text-[11px] mt-1 ${
                          passForm.new_password === passForm.confirm_password ? "text-green-600" : "text-red-500"
                        }`}>
                          {passForm.new_password === passForm.confirm_password ? "✓ Passwords match" : "✗ Passwords do not match"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleChangePassword}
                      disabled={passLoading}
                      className="px-5 py-2 bg-[#10446C] text-white text-sm font-medium rounded-lg hover:bg-[#0d3759] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {passLoading ? "Updating…" : "Update Password"}
                    </button>
                    <button
                      onClick={() => setPassForm({ current_password: "", new_password: "", confirm_password: "" })}
                      className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

// ── Reusable field ────────────────────────────────────────────────
function Field({
  label, name, value, onChange, placeholder, type = "text",
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
      />
    </div>
  );
}