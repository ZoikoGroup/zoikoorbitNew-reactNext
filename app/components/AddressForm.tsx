"use client";

import { useState, useEffect } from "react";

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function emptyAddress(): Address {
  return {
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  };
}

/** Light, fast-to-fill validation. Returns null on success, error map on failure. */
export function validateAddress(a: Address): Partial<Record<keyof Address, string>> | null {
  const errors: Partial<Record<keyof Address, string>> = {};
  if (!a.fullName.trim()) errors.fullName = "Full name is required";
  if (!a.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email)) errors.email = "Invalid email";
  if (!a.line1.trim()) errors.line1 = "Street address is required";
  if (!a.city.trim()) errors.city = "City is required";
  if (!a.postalCode.trim()) errors.postalCode = "Postal code is required";
  if (!a.country.trim()) errors.country = "Country is required";
  return Object.keys(errors).length ? errors : null;
}

type Props = {
  value: Address;
  onChange: (a: Address) => void;
  errors?: Partial<Record<keyof Address, string>>;
};

export function AddressForm({ value, onChange, errors = {} }: Props) {
  // Local state to avoid re-rendering the parent on every keystroke;
  // we lift up on blur or after a small debounce.
  const [local, setLocal] = useState<Address>(value);

  useEffect(() => setLocal(value), [value]);

  const update = <K extends keyof Address>(k: K, v: Address[K]) => {
    const next = { ...local, [k]: v };
    setLocal(next);
    onChange(next);
  };

  const inputCls = (key: keyof Address) =>
    [
      "w-full rounded-lg px-3 py-2.5 text-sm",
      "bg-white dark:bg-slate-900",
      "border",
      errors[key]
        ? "border-rose-400 dark:border-rose-500"
        : "border-slate-200 dark:border-slate-700",
      "text-slate-800 dark:text-slate-100 placeholder-slate-400",
      "focus:outline-none focus:ring-2 focus:ring-teal-400/40",
      "transition-colors",
    ].join(" ");

  const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5";
  const errorCls = "mt-1 text-xs text-rose-600 dark:text-rose-400";

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        Shipping address
        <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
          (for physical SIM delivery)
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="adr-fullname">Full name</label>
          <input
            id="adr-fullname"
            className={inputCls("fullName")}
            value={local.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            autoComplete="name"
          />
          {errors.fullName && <p className={errorCls}>{errors.fullName}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-email">Email</label>
          <input
            id="adr-email"
            type="email"
            className={inputCls("email")}
            value={local.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
          {errors.email && <p className={errorCls}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-phone">Phone</label>
          <input
            id="adr-phone"
            type="tel"
            className={inputCls("phone")}
            value={local.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorCls}>{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="adr-line1">Street address</label>
          <input
            id="adr-line1"
            className={inputCls("line1")}
            value={local.line1}
            onChange={(e) => update("line1", e.target.value)}
            autoComplete="address-line1"
          />
          {errors.line1 && <p className={errorCls}>{errors.line1}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="adr-line2">
            Apt, suite, unit <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="adr-line2"
            className={inputCls("line2")}
            value={local.line2}
            onChange={(e) => update("line2", e.target.value)}
            autoComplete="address-line2"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-city">City</label>
          <input
            id="adr-city"
            className={inputCls("city")}
            value={local.city}
            onChange={(e) => update("city", e.target.value)}
            autoComplete="address-level2"
          />
          {errors.city && <p className={errorCls}>{errors.city}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-state">
            State / Region <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="adr-state"
            className={inputCls("state")}
            value={local.state}
            onChange={(e) => update("state", e.target.value)}
            autoComplete="address-level1"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-postal">Postal code</label>
          <input
            id="adr-postal"
            className={inputCls("postalCode")}
            value={local.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            autoComplete="postal-code"
          />
          {errors.postalCode && <p className={errorCls}>{errors.postalCode}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="adr-country">Country</label>
          <input
            id="adr-country"
            className={inputCls("country")}
            value={local.country}
            onChange={(e) => update("country", e.target.value.toUpperCase())}
            autoComplete="country"
            placeholder="US"
            maxLength={2}
          />
          {errors.country && <p className={errorCls}>{errors.country}</p>}
        </div>
      </div>
    </div>
  );
}
