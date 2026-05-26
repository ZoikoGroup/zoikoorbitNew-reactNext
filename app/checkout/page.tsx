"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { usStates } from "../utils/usStates";
import { processOrderMalima } from "../utils/malimaOrangeApi";
import StripePaymentForm, { StripePaymentFormRef } from "../components/StripePaymentForm";
import {
  CurrencySelect,
  CURRENCY_BY_CODE,
  formatMoney,
  getRates,
  convertFromUsd,
  type FxRates,
} from "../components/CurrencySelect";

// ── Stub data for standalone compilation ──────────────────────────────────────

// const processOrderStripe = async (data: unknown) => ({ status: true, data });

// ─────────────────────────────────────────────────────────────────────────────

const ACTIVATION_FEE_PER_ESIM = 13.99;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Feature {
  id: string | number;
  title: string;
}

interface CategoryData {
  id: number;
  name: string;
  slug: string;
}

/** Raw shape coming from localStorage (as stored by the plan-selection page) */
interface RawCartItem {
  planId?: number | string | null;
  bqPlanID?: string | null;
  planSlug?: string | null;
  planName?: string | null;
  planTitle?: string | null;     // legacy fallback
  price?: string | number | null;
  salePrice?: string | number | null;
  finalPrice?: number | null;
  durationDays?: number | null;
  planDuration?: string | null;  // legacy fallback
  shortDescription?: string | null;
  isPopular?: boolean;
  category?: CategoryData | null;
  planType?: string | null;      // legacy fallback
  features?: Feature[];
  simType?: string | null;
  setupType?: string | null;
  imei?: string | null;
  device?: unknown;
  manufacturer?: string | null;
  lteCompatible?: boolean | null;
  fiveGCompatible?: boolean | null;
  esimCompatible?: boolean | null;
  lineType?: string | null;
  type?: string | null;
  qty?: number;
  timestamp?: number;
  formData?: {
    priceQty?: number;
    price?: number;
  };
  [key: string]: unknown;
}

/** Normalised shape used throughout the component */
interface CartItem {
  planId: string | number | null;
  bqPlanID: string | null;
  planSlug: string | null;
  planTitle: string;
  planPrice: number;
  planDuration: string;         // e.g. "30 Days"
  lineType: string;
  simType: string;              // "esim" | "psim" | "N/A"
  planType: string;             // category slug, e.g. "prepaid-plans"
  planCategory: string;         // category display name
  shortDescription: string;
  features: Feature[];
  setupType: string;
  imei: string | null;
  type?: string;
  formData: {
    priceQty: number;
    price: number;
  };
  _raw: RawCartItem;
}

interface Address {
  firstName: string;
  lastName: string;
  companyName: string;
  region: string;
  state: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  phone: string;
  email: string;
}

interface DiscountData {
  type: "percentage" | "flat";
  discount: string | number;
}

interface ShippingOption {
  label: string;
  value: number;
}

interface FormErrors {
  [key: string]: string;
}

// ── Normalise a raw localStorage item into CartItem ───────────────────────────

function normalizeCartItem(raw: RawCartItem): CartItem {
  // Resolve price
  const resolvePrice = (): number => {
    if (typeof raw.finalPrice === "number" && Number.isFinite(raw.finalPrice)) return raw.finalPrice;
    for (const key of ["salePrice", "price"] as const) {
      const v = raw[key];
      if (typeof v === "number" && Number.isFinite(v)) return v;
      if (typeof v === "string") {
        const n = parseFloat(v.replace(/[^0-9.-]+/g, ""));
        if (Number.isFinite(n)) return n;
      }
    }
    if (raw.formData?.price && Number.isFinite(Number(raw.formData.price))) return Number(raw.formData.price);
    return 0;
  };

  // Resolve plan type / category slug
  const resolveType = (): string => {
    if (raw.category?.slug) return raw.category.slug;
    if (typeof raw.planType === "string") return raw.planType;
    return "";
  };

  // Resolve duration label
  const resolveDuration = (): string => {
    if (typeof raw.durationDays === "number") return `${raw.durationDays} Days`;
    if (typeof raw.planDuration === "string" && raw.planDuration) return raw.planDuration;
    return "30 Days";
  };

  // Resolve simType – normalise to lowercase
  const resolveSimType = (): string => {
    const s = (raw.simType ?? "N/A").toLowerCase();
    if (s === "esim") return "eSIM";
    if (s === "psim") return "pSIM";
    return raw.simType ?? "N/A";
  };

  const price = resolvePrice();
  const qty = Number(raw.formData?.priceQty ?? raw.qty ?? 1);

  return {
    planId:          raw.planId ?? null,
    bqPlanID:        raw.bqPlanID ?? null,
    planSlug:        raw.planSlug ?? null,
    planTitle:       (raw.planName ?? raw.planTitle ?? raw.planSlug ?? "Unnamed Plan") as string,
    planPrice:       price,
    planDuration:    resolveDuration(),
    lineType:        (raw.lineType ?? "device") as string,
    simType:         resolveSimType(),
    planType:        resolveType(),
    planCategory:    raw.category?.name ?? "",
    shortDescription: (raw.shortDescription ?? "") as string,
    features:        Array.isArray(raw.features) ? raw.features : [],
    setupType:       (raw.setupType ?? "new-sim") as string,
    imei:            raw.imei ?? null,
    type:            raw.type as string | undefined,
    formData: {
      priceQty: qty,
      price,
    },
    _raw: raw,
  };
}

// ── Small reusable components ─────────────────────────────────────────────────

const InputField = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const inputClass = (error?: string) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors
   focus:ring-2 focus:ring-red-300 focus:border-red-400
   ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`;

const selectClass = (error?: string) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors
   focus:ring-2 focus:ring-red-300 focus:border-red-400
   ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`;

// ── Address Form ──────────────────────────────────────────────────────────────

const billingFieldMeta: Record<string, { label: string; placeholder: string; disabled?: boolean }> = {
  firstName:   { label: "First Name",       placeholder: "Enter your first name" },
  lastName:    { label: "Last Name",        placeholder: "Enter your last name" },
  companyName: { label: "Company Name",     placeholder: "Company name (optional)" },
  region:      { label: "Country / Region", placeholder: "United States (US)", disabled: true },
  state:       { label: "State",            placeholder: "Select state" },
  city:        { label: "City",             placeholder: "Enter your city" },
  street:      { label: "Street Address",   placeholder: "Enter your street address" },
  houseNumber: { label: "Apt / Suite",      placeholder: "Apartment or suite" },
  zip:         { label: "ZIP Code",         placeholder: "Enter ZIP code" },
  phone:       { label: "Phone Number",     placeholder: "Enter phone number" },
  email:       { label: "Email Address",    placeholder: "Enter email address" },
};

const requiredBillingFields = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email", "phone"];

const AddressForm = ({
  address,
  setAddress,
  prefix,
  errors,
  loading,
  includeShipping = false,
}: {
  address: Address;
  setAddress: (a: Address) => void;
  prefix: string;
  errors: FormErrors;
  loading: boolean;
  includeShipping?: boolean;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {(Object.keys(address) as Array<keyof Address>).map((key) => {
      const meta = billingFieldMeta[key] || { label: key, placeholder: key };
      const errKey = `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const isRequired =
        requiredBillingFields.includes(key) ||
        (includeShipping &&
          ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"].includes(key));

      return (
        <InputField key={key} label={meta.label} required={isRequired} error={errors[errKey]}>
          {key === "state" ? (
            <select
              className={selectClass(errors[errKey])}
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              disabled={loading}
            >
              <option value="">Select state</option>
              {usStates.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className={inputClass(errors[errKey])}
              placeholder={meta.placeholder}
              value={address[key]}
              disabled={meta.disabled || loading}
              onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
            />
          )}
        </InputField>
      );
    })}
  </div>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
const Modal = ({
  show,
  onClose,
  title,
  children,
}: {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

// ── SIM-type badge ────────────────────────────────────────────────────────────

const SimBadge = ({ simType }: { simType: string }) => {
  const isESim = simType.toLowerCase() === "esim";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        isESim
          ? "bg-blue-100 text-blue-700"
          : "bg-orange-100 text-orange-700"
      }`}
    >
      {isESim ? (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )}
      {simType}
    </span>
  );
};

// ── Category badge ────────────────────────────────────────────────────────────

const CategoryBadge = ({ categoryName, slug }: { categoryName: string; slug: string }) => {
  const isPrepaid = slug === "prepaid-plans";
  const isPostpaid = slug === "postpaid-plans";
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
        isPrepaid
          ? "bg-purple-100 text-purple-700"
          : isPostpaid
          ? "bg-teal-100 text-teal-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {categoryName}
    </span>
  );
};

// ── Stripe inner form (must be rendered inside <Elements>) ───────────────────

// const StripePaymentForm = ({
//   formRef,
// }: {
//   formRef: React.MutableRefObject<{ submitPayment: () => Promise<{ success: boolean; error?: string }> } | null>;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     formRef.current = {
//       submitPayment: async () => {
//         if (!stripe || !elements) return { success: false, error: "Stripe not loaded" };
//         const { error } = await stripe.confirmPayment({
//           elements,
//           confirmParams: { return_url: `${window.location.origin}/order-confirmed` },
//           redirect: "if_required",
//         });
//         if (error) return { success: false, error: error.message };
//         return { success: true };
//       },
//     };
//   }, [stripe, elements, formRef]);

//   return (
//     <div className="mt-2">
//       <PaymentElement options={{ layout: "tabs" }} />
//     </div>
//   );
// };

// ── Main Component ────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const stripeFormRef = useRef<StripePaymentFormRef>(null);
  const [showOrderErrorPopup, setShowOrderErrorPopup] = useState(false);
  const [orderError, setOrderError] = useState("");
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");
  const [currency, setCurrency] = useState<string>("usd");
  const [rates, setRates] = useState<FxRates | null>(null);

  const [clientSecret, setClientSecret] = useState("");
  // const stripeFormRef = useRef<{
  //   submitPayment: () => Promise<{ success: boolean; error?: string }>;
  // }>(null);

  const shippingOptions: ShippingOption[] = [
    { label: "Standard (3-5 Days)", value: 9.99 },
    { label: "Expedited (2-3 Days)", value: 14.99 },
    { label: "Overnight", value: 24.99 },
  ];

  const [showThankYou, setShowThankYou] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption>(shippingOptions[0]);

  const emptyAddress: Address = {
    firstName: "",
    lastName: "",
    companyName: "",
    region: "United States (US)",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
  };

  const [billingAddress, setBillingAddress] = useState<Address>(emptyAddress);
  const [shippingAddress, setShippingAddress] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Load & normalise cart ─────────────────────────────────────────────────
  useEffect(() => {
    try {
      const storedCart = JSON.parse(
        localStorage.getItem("zo_checkout") ?? "[]"
      ) as RawCartItem[];
      const normalized: CartItem[] = (Array.isArray(storedCart) ? storedCart : []).map(
        normalizeCartItem
      );
      setCart(normalized);
      if (typeof window !== "undefined" && localStorage.getItem("driverx_token")) {
        setIsLoggedIn(true);
      }
    } catch {
      setCart([]);
    }
  }, []);

  // Load FX rates on mount (non-blocking)
  useEffect(() => {
    getRates().then(setRates).catch(() => {});
  }, []);

  // Persist + restore the user's currency choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zoiko_presentment_currency");
      if (saved && CURRENCY_BY_CODE[saved]) setCurrency(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("zoiko_presentment_currency", currency);
    } catch {}
  }, [currency]);
  // ── Derived helpers ───────────────────────────────────────────────────────

  /**
   * Physical SIM items require shipping (carrier needs to mail a SIM card).
   * Triggered by:  simType === "pSIM"  OR  type === "device"
   *
   * NOTE: This flag now ONLY controls whether the shipping-option selector
   * (Standard / Expedited / Overnight) and shipping fee appear. The billing
   * address itself is ALWAYS captured, regardless of SIM type — we need
   * Name / Email / Phone / Address for both Stripe AVS checks and for
   * provisioning the line with the carrier (eSIM activations also require
   * a billable contact on file).
   */
  const hasShippingItem = cart.some(
    (item) => item.simType.toLowerCase() === "psim" || item.type === "device"
  );

  /**
   * Activation fee applies to prepaid-plan eSIM items only.
   * (pSIM activation is handled differently / already priced in.)
   */
  const prepaidEsimItems = cart.filter(
    (item) =>
      item.planType === "prepaid-plans" && item.simType.toLowerCase() === "esim"
  );

  const activationFeeTotal = prepaidEsimItems.reduce((acc, item) => {
    const qty = Number(item.formData?.priceQty ?? 1);
    return acc + ACTIVATION_FEE_PER_ESIM * qty;
  }, 0);

  // ── Cart mutations ────────────────────────────────────────────────────────

  const handleQuantity = (index: number, delta: number) => {
  const newCart = [...cart];
  const curQty = Number(newCart[index].formData?.priceQty || 1);
  const newQty = Math.max(1, curQty + delta);
  
  newCart[index] = {
    ...newCart[index],
    formData: { ...newCart[index].formData, priceQty: newQty },
    _raw: { ...newCart[index]._raw, qty: newQty }, // ← ADD THIS
  };
  
  setCart(newCart);
  localStorage.setItem(
    "zo_checkout",
    JSON.stringify(newCart.map((i) => i._raw))
  );
};

  const handleRemove = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("zo_checkout", JSON.stringify(newCart.map((i) => i._raw)));
  };

  const handleClearCart = () => {
    setCart([]);
    // localStorage.removeItem("zo_checkout");
  };

  // ── Coupon ────────────────────────────────────────────────────────────────

  const handleApplyCoupon = async () => {
    const user = JSON.parse(localStorage.getItem("driverx_user") ?? "null");
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    if (!coupon) {
      setCouponMessage("Please enter a coupon code");
      return;
    }
    setLoading(true);
    setCouponMessage("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/apply-coupon/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.driverx_token}`,
        },
        body: JSON.stringify({ user_id: user.id, email: user.email, coupon_code: coupon }),
      });
      const data = await res.json();
      if (data.success) {
        setDiscountData(data.data);
        const num = parseFloat(data.data.discount);
        const clean = Number.isInteger(num) ? num.toString() : num.toFixed(2);
        setCouponMessage(
          `Coupon applied! Discount: ${
            data.data.type === "percentage" ? clean + "%" : "$" + clean + " flat"
          }`
        );
      } else {
        setDiscountData(null);
        setCouponMessage(data.message || "Invalid coupon code");
      }
    } catch {
      setDiscountData(null);
      setCouponMessage("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  const handleCancelCoupon = () => {
    setCoupon("");
    setDiscountData(null);
    setCouponMessage("Coupon cancelled.");
  };

  // ── Totals ────────────────────────────────────────────────────────────────

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.planPrice ?? item.formData?.price ?? 0);
    const qty = Number(item.formData?.priceQty ?? 1);
    return acc + price * qty;
  }, 0);

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  useEffect(() => {
    setShippingFee(hasShippingItem ? selectedShippingOption.value : 0);
  }, [selectedShippingOption, hasShippingItem]);

  const total = Math.max(subtotal + shippingFee + activationFeeTotal - discountAmount, 0);

  // ── Create Stripe payment intent ──────────────────────────────────────────

  useEffect(() => {
    if (total > 0 && cart.length > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalUsd: total,           // ← must match what the API route expects
          presentmentCurrency: currency,
          customerEmail: billingAddress.email || undefined,
          cartSummary: {
            itemCount: cart.length,
            variationIds: cart.map((i) => Number(i.planId)).filter(Boolean),
          },
        }),
      })
        .then(async (r) => {
          const data = await r.json();

          if (!r.ok) {
            console.error("Payment Intent Error:", data);
            return;
          }

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        })
        .catch(() => {});
    }
  }, [total, cart.length, currency, billingAddress.email]);

  // ── Validation ────────────────────────────────────────────────────────────

  const validateFields = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRx = /^[0-9]{7,15}$/;

    // Billing address is ALWAYS required — we need it for payment
    // (Stripe AVS), order receipts, and carrier provisioning. This
    // applies whether the cart has eSIMs, pSIMs, or both.
    newErrors.billingFirstName   = billingAddress.firstName ? "" : "Required";
    newErrors.billingLastName    = billingAddress.lastName ? "" : "Required";
    newErrors.billingState       = billingAddress.state ? "" : "Required";
    newErrors.billingCity        = billingAddress.city ? "" : "Required";
    newErrors.billingHouseNumber = billingAddress.houseNumber ? "" : "Required";
    newErrors.billingZip         = billingAddress.zip ? "" : "Required";
    newErrors.billingEmail       = emailRx.test(billingAddress.email) ? "" : "Invalid email";
    newErrors.billingPhone       = phoneRx.test(billingAddress.phone) ? "" : "Invalid phone";

    // Shipping address only required if user opted to ship to a different
    // address AND the cart contains a physical SIM that actually ships.
    if (showShipping && hasShippingItem) {
      newErrors.shippingFirstName   = shippingAddress.firstName ? "" : "Required";
      newErrors.shippingLastName    = shippingAddress.lastName ? "" : "Required";
      newErrors.shippingState       = shippingAddress.state ? "" : "Required";
      newErrors.shippingCity        = shippingAddress.city ? "" : "Required";
      newErrors.shippingHouseNumber = shippingAddress.houseNumber ? "" : "Required";
      newErrors.shippingZip         = shippingAddress.zip ? "" : "Required";
      newErrors.shippingEmail       = emailRx.test(shippingAddress.email) ? "" : "Invalid email";
      newErrors.shippingPhone       = phoneRx.test(shippingAddress.phone) ? "" : "Invalid phone";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e.length > 0);
  };

  const buildProducts = () =>
    cart.map((item) => ({
      planId:       item.planId,
      bqPlanID:     item.bqPlanID,
      planSlug:     item.planSlug,
      planTitle:    item.planTitle,
      planCategory: item.planCategory,
      planType:     item.planType,
      simType:      item.simType,
      setupType:    item.setupType,
      imei:         item.imei,
      lineType:     item.lineType,
      duration:     item.planDuration,
      features:     item.features,
      quantity:     Number(item.formData?.priceQty ?? 1),
      pricePerUnit: Number(item.planPrice ?? item.formData?.price ?? 0),
      totalPrice:
        Number(item.planPrice ?? item.formData?.price ?? 0) *
        Number(item.formData?.priceQty ?? 1),
    }));

  // ── Place Order – Stripe ──────────────────────────────────────────────────

  const handlePlaceOrderStripe = async () => {
  if (!agreeTerms) { setShowTermsPopup(true); return; }
  if (!validateFields()) return;

  try {
    setLoading(true);

    // 1️⃣ Stripe payment
    if (stripeFormRef.current) {
      const result = await stripeFormRef.current.submitPayment();
      console.log("✅ Stripe result:", result);  // ← ADD
      if (!result.success) {
        setOrderError(result.error || "Payment failed.");
        setShowOrderErrorPopup(true);
        return;
      }
    }

    // 2️⃣ Malima / Orange — create product order(s) on Orange.
    //    This replaces the previous BeQuick `processOrderStripe` pipeline.
    //    Internally: Django allocates SIM identifiers → POST per SIM to
    //    api.orange.com/.../productOrders/ → full record saved to Django.
    const products = buildProducts();
    const orderContext = {
      billingAddress,
      // If the user didn't tick "ship to a different address", reuse billing.
      // For eSIM-only carts we still send the billing address as the shipping
      // address so downstream services have a single canonical contact.
      shippingAddress: showShipping && hasShippingItem ? shippingAddress : billingAddress,
      shippingOption: hasShippingItem ? { ...selectedShippingOption } : null,
      coupon: discountData ? { ...discountData } : null,
      cart: products,
      totals: { subtotal, shipping: shippingFee, activationFee: activationFeeTotal, discount: discountAmount, total },
      agreedToTerms: agreeTerms,
      paymentMethod: "stripe",
      createdAt: new Date().toISOString(),
    };

    // Pass the RAW cart to processOrderMalima, not buildProducts() output.
    // toMalimaCart needs access to durationDays / dataVolume / roamingZone /
    // _raw / formData — buildProducts strips those down to a billing summary.
    // (The lightweight `products` is still sent in `orderContext.cart` so
    // Django saves what the customer actually checked out with.)
    const result = await processOrderMalima(cart as unknown[], orderContext);
    console.log("✅ Malima pipeline result:", result);

    if (!result.status) {
      // Different failure stages get different messaging. The stage tells
      // the operator (and the user) how far the order got.
      const stageMessage: Record<string, string> = {
        empty_cart: "Cart is empty.",
        allocate_failed: "Could not allocate SIM(s). Please try again or contact support.",
        malima_failed: "Some lines could not be activated on the carrier. Support has been notified.",
        save_failed: "Order activated but could not be recorded. Please keep your receipt.",
      };
      setOrderError(stageMessage[result.stage] || result.message || "Order processing failed.");
      setShowOrderErrorPopup(true);
      return;
    }
    localStorage.removeItem("zo_checkout");
    setShowThankYou(true);
    
    console.log("✅ showThankYou set to true");  // ← ADD

  } catch (err: any) {
    console.error("❌ caught error:", err);  // ← ADD
    setOrderError(err?.message || "Something went wrong.");
    setShowOrderErrorPopup(true);
  } finally {
    setLoading(false);
  }
};

  const formatDiscount = (value: string | number) => {
    const n = parseFloat(String(value));
    return Number.isInteger(n) ? n.toString() : n.toFixed(2);
  };

  // Convert a USD amount to whatever currency the user picked, formatted.
  const fmt = (usd: number): string =>
    formatMoney(convertFromUsd(usd, currency, rates), currency);
  // ── Empty Cart ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-40 h-40 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-20 h-20 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {[
            { href: "/prepaid-plans",  label: "Prepaid Plans" },
            { href: "/postpaid-plans", label: "Postpaid Plans" },
            { href: "/business-deals", label: "Business Deals" },
            { href: "/travel-plans",   label: "Travel Plans" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // ── Main Checkout ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-6 px-4">
         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-sm text-gray-500">Connecting Every Possibility with Zoiko Mobile!</p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <CurrencySelect value={currency} onChange={setCurrency} />
            <button
              onClick={handleClearCart}
            disabled={loading}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column ── */}
          <div className="flex-1 space-y-6">

            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Your Items</h2>
                <span className="text-xs text-gray-400 font-medium">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {cart.map((item, idx) => (
                  <div key={idx} className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      {/* Plan info */}
                      <div className="flex-1 min-w-0">
                        {/* Product name */}
                        <p className="font-bold text-gray-900 text-base leading-tight mb-1.5">
                          {item.planTitle}
                        </p>
                        {/* Category + SIM badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {item.planCategory && (
                            <CategoryBadge categoryName={item.planCategory} slug={item.planType} />
                          )}
                          <SimBadge simType={item.simType} />
                        </div>

                        {item.shortDescription && (
                          <p className="text-xs text-gray-400 mb-2">{item.shortDescription}</p>
                        )}

                        {/* Features list */}
                        {item.features.length > 0 && (
                          <ul className="space-y-0.5 mb-2">
                            {item.features.map((f) => (
                              <li key={f.id} className="flex items-start gap-1.5 text-xs text-gray-500">
                                <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                {f.title}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            Duration: <span className="font-medium text-gray-600">{item.planDuration}</span>
                          </span>
                          {item.setupType && (
                            <span className="text-xs text-gray-400">
                              Setup: <span className="font-medium text-gray-600 capitalize">{item.setupType.replace(/-/g, " ")}</span>
                            </span>
                          )}
                          {item.imei && (
                            <span className="text-xs text-gray-400">
                              IMEI: <span className="font-medium text-gray-600">{item.imei}</span>
                            </span>
                          )}
                        </div>

                        {item.planType === "prepaid-plans" && item.simType.toLowerCase() === "esim" && (
                          <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-0.5 rounded-full">
                            + {fmt(ACTIVATION_FEE_PER_ESIM)} / eSIM Activation Fee
                          </span>
                        )}
                      </div>

                      {/* Qty + price + remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantity(idx, -1)}
                            disabled={loading}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-300 hover:text-red-500 transition-colors disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.formData?.priceQty ?? 1}
                          </span>
                          <button
                            onClick={() => handleQuantity(idx, 1)}
                            disabled={loading}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-300 hover:text-red-500 transition-colors disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-base">
                            {fmt(
                              Number(item.planPrice ?? item.formData?.price ?? 0) *
                              Number(item.formData?.priceQty ?? 1)
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {fmt(Number(item.planPrice ?? 0))} / {item.planDuration}
                          </p>
                          {Number(item.formData?.priceQty ?? 1) > 1 && (
                            <p className="text-xs text-gray-400">
                              × {item.formData?.priceQty} units
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(idx)}
                          disabled={loading}
                          className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-40"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Have a Coupon?</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={loading}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={loading}
                  className="px-4 flex-row md:flex-col py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? "Applying…" : "Apply"}
                </button>
                {discountData && (
                  <button
                    onClick={handleCancelCoupon}
                    disabled={loading}
                    className="px-4 flex-row md:flex-col py-2.5 rounded-lg border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>
              {couponMessage && (
                <p className={`mt-2 text-sm ${discountData ? "text-green-600" : "text-red-500"}`}>
                  {couponMessage}
                </p>
              )}
              {!isLoggedIn && (
                <p className="mt-2 text-xs text-red-400">
                  You need to be logged in to apply a coupon.
                </p>
              )}
            </div>

            {/* Billing Address — ALWAYS shown (required for every order, eSIM or pSIM) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-1">
                {hasShippingItem ? "Service / Billing Details" : "Billing Details"}
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                {hasShippingItem
                  ? "We'll use this for your payment and to ship your SIM card."
                  : "We'll use this for your payment and to send your eSIM activation details."}
              </p>
              <AddressForm
                address={billingAddress}
                setAddress={setBillingAddress}
                prefix="billing"
                errors={errors}
                loading={loading}
              />

              {/* "Ship to different address" only meaningful when there's a physical SIM to ship */}
              {hasShippingItem && (
                <>
                  <label className="flex items-center gap-2.5 mt-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showShipping}
                      onChange={(e) => setShowShipping(e.target.checked)}
                      disabled={loading}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="text-sm text-gray-700">Ship to a different address?</span>
                  </label>

                  {showShipping && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
                      <AddressForm
                        address={shippingAddress}
                        setAddress={setShippingAddress}
                        prefix="shipping"
                        errors={errors}
                        loading={loading}
                        includeShipping
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* ── Right Column ── */}
          <div className="w-full lg:w-96 space-y-6">

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 text-sm">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.planTitle}</p>
                      <p className="text-xs text-gray-400">
                        {item.planCategory && <span>{item.planCategory} · </span>}
                        {item.simType} · ×{item.formData?.priceQty ?? 1}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 shrink-0">
                      {fmt(
                        Number(item.planPrice ?? item.formData?.price ?? 0) *
                        Number(item.formData?.priceQty ?? 1)
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {hasShippingItem && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shipping Options
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-300 mb-2"
                    value={selectedShippingOption.value}
                    onChange={(e) => {
                      const opt = shippingOptions.find(
                        (o) => o.value === parseFloat(e.target.value)
                      );
                      if (opt) setSelectedShippingOption(opt);
                    }}
                  >
                    {shippingOptions.map((o, i) => (
                      <option key={i} value={o.value}>
                        {o.label} — {fmt(o.value)}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">{fmt(shippingFee)}</span>
                  </div>
                </div>
              )}

              {activationFeeTotal > 0 &&
                (() => {
                  const qty = prepaidEsimItems.reduce(
                    (a, i) => a + Number(i.formData?.priceQty ?? 1),
                    0
                  );
                  return (
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-500">
                       Activation Fee{qty > 1 ? "s" : ""} ({qty} × {fmt(ACTIVATION_FEE_PER_ESIM)})
                      </span>
                      <span className="font-medium text-amber-600">
                        +{fmt(activationFeeTotal)}
                      </span>
                    </div>
                  );
                })()}

              {discountData && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">
                    Discount (
                    {discountData.type === "percentage"
                      ? formatDiscount(discountData.discount) + "%"
                      : fmt(Number(discountData.discount))}
                    )
                  </span>
                  <span className="font-medium text-green-600">
                    −{fmt(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-bold text-base mt-4 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span className="text-red-500">{fmt(total)}</span>
              </div>
              {currency !== "usd" && (
                <p className="mt-2 text-[11px] text-gray-500 leading-relaxed">
                  Charged in USD ({formatMoney(total, "usd")}). Your bank converts at the
                  payment time.
                </p>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Payment</h2>

              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: { colorPrimary: "#ef4444" },
                    },
                  }}
                >
                  <StripePaymentForm ref={stripeFormRef} />
                </Elements>
              ) : (
                <div className="flex items-center justify-center py-6 gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading payment form…
                </div>
              )}

              <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 mt-0.5 accent-red-500"
                />
                <span className="text-sm text-gray-600">
                  I have read and agree to the website{" "}
                  <a href="/terms-and-conditions" className="text-red-500 hover:underline">
                    terms and conditions
                  </a>
                  .
                </span>
              </label>

              <button
                onClick={handlePlaceOrderStripe}
                disabled={loading || !clientSecret}
                className="w-full mt-5 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing payment…
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <Modal
        show={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        title="Login Required"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-5 text-sm">
            You need to log in to apply a coupon code.
          </p>
          <a
            href={`/login?redirect=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : "/"
            )}`}
            className="block w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors mb-2"
          >
            Go to Login
          </a>
          <button
            onClick={() => setShowLoginPopup(false)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        show={showTermsPopup}
        onClose={() => setShowTermsPopup(false)}
        title="Terms & Conditions Required"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-5 text-sm">
            You must agree to the{" "}
            <a href="/terms-and-conditions" className="text-red-500 hover:underline">
              terms and conditions
            </a>{" "}
            before placing your order.
          </p>
          <button
            onClick={() => setShowTermsPopup(false)}
            className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
          >
            OK, I understand
          </button>
        </div>
      </Modal>

      <Modal
        show={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          setCart([]);
          window.location.href = "/dashboard";
        }}
        title=""
      >
        <div className="text-center py-4">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-20 h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Order Placed! 🎉</h2>
          <p className="text-sm font-medium text-green-600 mb-4">Payment successful</p>

          <div className="border-t border-gray-100 my-4" />

          <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-800">{fmt(subtotal)}</span>
            </div>
            {shippingFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold text-gray-800">{fmt(shippingFee)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold text-green-600">−{fmt(discountAmount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold">
              <span className="text-gray-900">Total Paid</span>
              <span className="text-red-500">{fmt(total)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-5">
            A confirmation email has been sent to{" "}
            <span className="font-medium text-gray-600">{billingAddress.email}</span>
          </p>

          <button
            onClick={() => {
              setShowThankYou(false);
              setCart([]);
              window.location.href = "/dashboard";
            }}
            className="w-full py-3 rounded-xl bg-linear-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg mb-2"
          >
            Go to Dashboard →
          </button>
          <button
            onClick={() => {
              setCart([]);
              window.location.href = "/";
            }}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>

      <Modal
        show={showOrderErrorPopup}
        onClose={() => setShowOrderErrorPopup(false)}
        title="Order Failed"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-5 text-sm">{orderError}</p>
          <button
            onClick={() => setShowOrderErrorPopup(false)}
            className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </Modal>



    </div>
  );
}