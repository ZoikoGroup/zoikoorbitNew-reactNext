"use client";
import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Feature {
  id: number;
  title: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Plan {
  id: number;
  name: string;
  bqPlanID: string;
  slug: string;
  short_description: string;
  price: string;
  sale_price: string | null;
  price_24: string | null;
  final_price: number;
  duration_days: number;
  is_popular: boolean;
  is_active: boolean;
  category: Category;
  features: Feature[];
}

export interface BuyPlanModalProps {
  plan: Plan;
  onClose: () => void;
  /** Optional: override the checkout redirect path (default: "/checkout") */
  checkoutPath?: string;
  /** Optional: override the localStorage cart key (default: "driverx_checkout") */
  cartKey?: string;
}

// ── Internal Types ─────────────────────────────────────────────────────────────

/**
 * Step map:
 *
 * NEW SIM flow (2 steps):
 *   choose-setup → choose-sim-type → esim-check (eSIM)
 *                                  → [checkout]  (pSIM)
 *
 * KEEP NUMBER flow (3 steps):
 *   choose-setup → port-form → port-sim-type → esim-check (eSIM)
 *                                             → [checkout]  (pSIM)
 */
type ModalStep =
  | "choose-setup"
  | "choose-sim-type"  // New SIM: pick eSIM or pSIM
  | "esim-check"       // Both flows: IMEI compatibility check
  | "port-form"        // Keep Number: port details
  | "port-sim-type";   // Keep Number: pick eSIM or pSIM

interface PortForm {
  fullName: string;
  mobileNumber: string;
  email: string;
  zipCode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  currentCarrierName: string;
  currentSimSerial: string;
  currentOspAccountNumber: string;
  ospAccountPin: string;
}

interface CompatibilityResult {
  compatible: boolean;
  device?: string | null;
  manufacturer?: string | null;
  lteCompatible?: boolean | null;
  fiveGCompatible?: boolean | null;
  esimCompatible?: boolean | null;
  message?: string | null;
}

const EMPTY_PORT_FORM: PortForm = {
  fullName: "", mobileNumber: "", email: "", zipCode: "",
  addressLine1: "", addressLine2: "", city: "", state: "",
  currentCarrierName: "", currentSimSerial: "",
  currentOspAccountNumber: "", ospAccountPin: "",
};

// ── StepIndicator ─────────────────────────────────────────────────────────────

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex items-center justify-center mb-6">
    {Array.from({ length: totalSteps }).map((_, i) => {
      const stepNum = i + 1;
      const isCompleted = stepNum < currentStep;
      const isActive = stepNum === currentStep;
      return (
        <div key={stepNum} className="flex items-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            isCompleted ? "bg-[#1a8a76] text-white"
            : isActive   ? "bg-[#1a4a3f] text-white ring-4 ring-[#1a4a3f]/20"
            :               "bg-gray-200 text-gray-400"
          }`}>
            {isCompleted
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              : stepNum}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-14 h-0.5 transition-all duration-300 ${isCompleted ? "bg-[#1a8a76]" : "bg-gray-200"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ── PortField ─────────────────────────────────────────────────────────────────

interface PortFieldProps {
  label: string;
  name: keyof PortForm;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PortField = ({ label, name, placeholder, required = true, value, error, onChange }: PortFieldProps) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a8a76] transition ${
        error ? "border-red-400 focus:ring-red-400" : "border-gray-200 dark:border-gray-700"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
  </div>
);

// ── SimOptionCard ─────────────────────────────────────────────────────────────

const SimOptionCard = ({
  type, selected, onSelect,
}: {
  type: "esim" | "psim";
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 flex items-start gap-4 ${
      selected
        ? "border-[#1a4a3f] bg-[#f0faf8] dark:bg-[#1a4a3f]/20"
        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 bg-white dark:bg-gray-700"
    }`}
  >
    <div className="w-11 h-11 rounded-xl bg-[#e6f4f1] flex items-center justify-center flex-shrink-0 mt-0.5">
      {type === "esim" ? (
        <svg className="w-6 h-6 text-[#1a8a76]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-[#1a8a76]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v5h11" />
        </svg>
      )}
    </div>
    <div className="flex-1">
      {type === "esim" ? (
        <>
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">eSIM</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Digital SIM built into your phone — no physical card needed</p>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Instant activation | No waiting for delivery | Can't be lost or damaged</p>
        </>
      ) : (
        <>
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">pSIM</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Traditional SIM card that you insert into your phone</p>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Works with all phones | Easy to transfer between devices | Familiar and reliable</p>
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              <span className="font-bold">Delivery charges apply.</span> Your SIM will be delivered in 2–3 business days
            </p>
          </div>
        </>
      )}
    </div>
    <div className={`ml-2 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
      selected ? "border-[#1a4a3f] bg-[#1a4a3f]" : "border-gray-300"
    }`}>
      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
  </button>
);

// ── BuyPlanModal ──────────────────────────────────────────────────────────────

export const BuyPlanModal = ({
  plan, onClose,
  checkoutPath = "/checkout",
  cartKey = "driverx_checkout",
}: BuyPlanModalProps) => {
  const [step, setStep] = useState<ModalStep>("choose-setup");
  const [setupChoice, setSetupChoice] = useState<"new-sim" | "keep-number">("new-sim");
  // simType is always "esim" | "psim" — never anything else
  const [simChoice, setSimChoice] = useState<"esim" | "psim">("esim");

  // IMEI / device check (shared by both flows when eSIM is chosen)
  const [imei, setImei] = useState("");
  const [checking, setChecking] = useState(false);
  const [compatResult, setCompatResult] = useState<CompatibilityResult | null>(null);
  const [imeiError, setImeiError] = useState<string | null>(null);

  // MDN eligibility (Keep Number flow, Step 1)
  const [mdn, setMdn] = useState("");
  const [mdnChecking, setMdnChecking] = useState(false);
  const [mdnEligible, setMdnEligible] = useState<boolean | null>(null);
  const [mdnError, setMdnError] = useState<string | null>(null);

  // Port details form (Keep Number flow, Step 2)
  const [portForm, setPortForm] = useState<PortForm>(EMPTY_PORT_FORM);
  const [portErrors, setPortErrors] = useState<Partial<PortForm>>({});

  // Lock scroll + Escape to close
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset compat state when IMEI changes
  useEffect(() => { setCompatResult(null); setImeiError(null); }, [imei]);
  // Reset MDN state when MDN changes
  useEffect(() => { setMdnEligible(null); setMdnError(null); }, [mdn]);

  // ── Step count per flow ────────────────────────────────────────────────────
  // New SIM:      Step 1 (Setup) → Step 2 (SIM type + IMEI if eSIM)  → 2 steps total
  // Keep Number:  Step 1 (Setup) → Step 2 (Port form) → Step 3 (SIM type + IMEI if eSIM) → 3 steps total

  const totalSteps = setupChoice === "keep-number" ? 3 : 2;

  const stepNumber: Record<ModalStep, number> = {
    "choose-setup":   1,
    "choose-sim-type":2,
    "esim-check":     2,  // New SIM eSIM path — still step 2
    "port-form":      2,  // Keep Number — step 2
    "port-sim-type":  3,  // Keep Number — step 3
  };
  // esim-check from Keep Number path is step 3
  const currentStepNumber =
    step === "esim-check" && setupChoice === "keep-number" ? 3 : stepNumber[step];

  // ── Cart ───────────────────────────────────────────────────────────────────

  const saveToCart = (item: object) => {
    const existing = localStorage.getItem(cartKey);
    const cart: object[] = existing ? JSON.parse(existing) : [];
    cart.push(item);
    localStorage.setItem(cartKey, JSON.stringify(cart));
  };

  const buildBase = () => ({
    planId: plan.id, bqPlanID: plan.bqPlanID, planSlug: plan.slug, planName: plan.name,
    price: plan.price, salePrice: plan.sale_price, price24: plan.price_24,
    finalPrice: plan.final_price, durationDays: plan.duration_days,
    shortDescription: plan.short_description, isPopular: plan.is_popular,
    category: { id: plan.category.id, name: plan.category.name, slug: plan.category.slug },
    features: plan.features.map((f) => ({ id: f.id, title: f.title })),
    timestamp: Date.now(),
  });

  // ── MDN check ──────────────────────────────────────────────────────────────

  const handleCheckMdn = async () => {
    if (!mdn.trim()) { setMdnError("Please enter your MDN/MSISDN number."); return; }
    if (!/^\+?[\d\s\-().]{7,15}$/.test(mdn)) { setMdnError("Please enter a valid phone number."); return; }
    setMdnError(null); setMdnChecking(true); setMdnEligible(null);
    try {
      // ── Replace with real API ──
      await new Promise((r) => setTimeout(r, 1200));
      setMdnEligible(true);
    } catch {
      setMdnError("Unable to verify number. Please try again.");
    } finally { setMdnChecking(false); }
  };

  // ── Port form ──────────────────────────────────────────────────────────────

  const handlePortFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortForm((prev) => ({ ...prev, [name]: value }));
    if (portErrors[name as keyof PortForm])
      setPortErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validatePortForm = (): Partial<PortForm> => {
    const e: Partial<PortForm> = {};
    if (!portForm.fullName.trim())                e.fullName = "Required";
    if (!portForm.mobileNumber.trim())            e.mobileNumber = "Required";
    if (!portForm.email.trim())                   e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portForm.email)) e.email = "Invalid email";
    if (!portForm.addressLine1.trim())            e.addressLine1 = "Required";
    if (!portForm.addressLine2.trim())            e.addressLine2 = "Required";
    if (!portForm.city.trim())                    e.city = "Required";
    if (!portForm.state.trim())                   e.state = "Required";
    if (!portForm.currentCarrierName.trim())      e.currentCarrierName = "Required";
    if (!portForm.currentSimSerial.trim())        e.currentSimSerial = "Required";
    if (!portForm.currentOspAccountNumber.trim()) e.currentOspAccountNumber = "Required";
    if (!portForm.ospAccountPin.trim())           e.ospAccountPin = "Required";
    return e;
  };

  const handlePortFormNext = () => {
    const errs = validatePortForm();
    if (Object.keys(errs).length > 0) { setPortErrors(errs); return; }
    setSimChoice("esim");   // reset before user picks on next screen
    setCompatResult(null);
    setImei("");
    setStep("port-sim-type");
  };

  // ── IMEI check ─────────────────────────────────────────────────────────────

  const handleCheckDevice = async () => {
      const cleanedImei = imei.replace(/\s/g, "").trim();

    // -------------------------------
    // Validation
    // -------------------------------
    if (!cleanedImei) {
      setImeiError("Please enter your IMEI/MEID number.");
      return;
    }
    if (!/^\d{14,16}$/.test(cleanedImei)) {
      setImeiError("Please enter a valid 14-16 digit IMEI number.");
      return;
    }
    setImeiError(null);
    setChecking(true);
    setCompatResult(null);

    try {
      // =========================================================
      // STEP 1: CHECK LOCAL STORAGE FIRST
      // =========================================================
      const storageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("device_serial_")
      );

      let localMatch: any = null;
      for (const key of storageKeys) {
        const item = localStorage.getItem(key);
        if (!item) continue;
        const parsed = JSON.parse(item);
        if (parsed.device_serial === cleanedImei) {
          localMatch = parsed;
          break;
        }
      }

      const nextIndex = storageKeys.length + 1;
      
      // IF FOUND IN LOCAL STORAGE — show result and stop
      if (localMatch && localMatch.esim_compatible === true) {
        setCompatResult({
          compatible: true,
          message: cleanedImei +" is compatible with eSIM.",
        });
        return; // stop here, no API calls needed
      }
      
      if (localMatch && localMatch.esim_compatible === false) {
        setCompatResult({
          compatible: false,
          message: cleanedImei +" is not compatible with eSIM.",
        });
        return; // stop here, no API calls needed        
      }

      const goliteEsimTblSrchResponse = await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY!,
          },
          body: JSON.stringify({
            action: "esim_check",
            imei: cleanedImei,
          }),
        }
      );

      const goliteEsimTblSrchData = await goliteEsimTblSrchResponse.json();
      if (goliteEsimTblSrchData.compatible === true) {
        setCompatResult({
          compatible: true,
          message: cleanedImei +" is compatible with eSIM.",
        });
        localStorage.setItem(
          `device_serial_${nextIndex}`,
          JSON.stringify({
            device_serial: cleanedImei,
            esim_compatible: true,
          })
        );
        return; // stop here, no API calls needed        
      }

      
      // =========================================================
      // STEP 2: NOT IN LOCAL STORAGE — AND NOT IN GOLITE DB EITHER — SO CALL BEQUICK API
      // =========================================================
      const bequickRes = await fetch(
        "https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_BEQUICK_TOKEN!,
          },
          body: JSON.stringify({ device_serial: cleanedImei }),
        }
      );

      const bequickData = await bequickRes.json();
      console.log("Bequick API response:", bequickData);
      const info = bequickData ?? {};      
      const isEsimCompatible = info.esim_compatible;    

      if (isEsimCompatible === true) {
        setCompatResult({
          compatible: true,
          message: cleanedImei +" is compatible with eSIM.",
        });
        
        localStorage.setItem(
          `device_serial_${nextIndex}`,
          JSON.stringify({
            device_serial: cleanedImei,
            esim_compatible: isEsimCompatible,
          })
        );

        await fetch(
          "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY!,
            },
            body: JSON.stringify({
              action: "esim_update",
              imei: cleanedImei,
            }),
          }
        );
        return; // stop here, no further API calls needed
      } 

      const goliteVResponse = await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY!,
          },
          body: JSON.stringify({
            action: "esim_v_check",
            imei: cleanedImei,
          }),
        }
      );

      const goliteVData = await goliteVResponse.json();

      if(goliteVData.esimCompatible === true) {
        setCompatResult({
          compatible: true,
          message: cleanedImei +" is compatible with eSIM.",
        });

        localStorage.setItem(
          `device_serial_${nextIndex}`,
          JSON.stringify({
            device_serial: cleanedImei,
            esim_compatible: true,
          })
        );
        return; 
      }else { 

        localStorage.setItem(
          `device_serial_${nextIndex}`,
          JSON.stringify({
            device_serial: cleanedImei,
            esim_compatible: false,
          })
        );
        setCompatResult({
          compatible: false,
          message: cleanedImei +" is not compatible with eSIM.",
        });
      } 

    } catch (err) {
      setCompatResult({
        compatible: false,
        message:
          err instanceof Error
            ? err.message
            : "Unable to verify device. Please try again.",
      });
    } finally {
      setChecking(false);
    };
  };

  // ── Checkout ───────────────────────────────────────────────────────────────

  const goCheckout = (payload: object) => {
    saveToCart(payload);
    onClose();
    window.location.href = checkoutPath;
  };

  // New SIM → eSIM (after IMEI check)
  const handleNewSimEsimCheckout = () => goCheckout({
    ...buildBase(), simType: "esim", setupType: "new-sim",
    imei: imei.trim(),
    device: compatResult?.device ?? null, manufacturer: compatResult?.manufacturer ?? null,
    lteCompatible: compatResult?.lteCompatible ?? null,
    fiveGCompatible: compatResult?.fiveGCompatible ?? null,
    esimCompatible: compatResult?.esimCompatible ?? null,
  });

  // New SIM → pSIM
  const handleNewSimPsimCheckout = () => goCheckout({
    ...buildBase(), simType: "psim", setupType: "new-sim",
    imei: null, device: null, manufacturer: null,
    lteCompatible: null, fiveGCompatible: null, esimCompatible: null,
  });

  // Keep Number → pSIM (no IMEI needed)
  const handlePortPsimCheckout = () => goCheckout({
    ...buildBase(), simType: "psim", setupType: "keep-number",
    imei: null, device: null, manufacturer: null,
    lteCompatible: null, fiveGCompatible: null, esimCompatible: null,
    portNumberInfo: { mdn: mdn.trim(), ...portForm },
  });

  // Keep Number → eSIM (after IMEI check)
  const handlePortEsimCheckout = () => goCheckout({
    ...buildBase(), simType: "esim", setupType: "keep-number",
    imei: imei.trim(),
    device: compatResult?.device ?? null, manufacturer: compatResult?.manufacturer ?? null,
    lteCompatible: compatResult?.lteCompatible ?? null,
    fiveGCompatible: compatResult?.fiveGCompatible ?? null,
    esimCompatible: compatResult?.esimCompatible ?? null,
    portNumberInfo: { mdn: mdn.trim(), ...portForm },
  });

  // ── Shared IMEI Check block ────────────────────────────────────────────────

  const renderImeiBlock = () => (
    <div className="rounded-2xl border-2 border-[#1a4a3f] bg-[#f0faf8] dark:bg-[#1a4a3f]/20 p-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-[#e6f4f1] flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-[#1a8a76]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">eSIM Selected</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Digital SIM built into your phone — no physical card needed</p>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Instant activation | No waiting for delivery | Can't be lost or damaged</p>
        </div>
      </div>

      <div className="border-t border-[#1a4a3f]/20 pt-4">
        <p className="text-sm font-bold text-gray-800 dark:text-white mb-3">Check Device Compatibility</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleCheckDevice(); }}
            placeholder="Enter your IMEI/MEID number"
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a8a76] transition ${
              imeiError ? "border-red-400" : "border-gray-200 dark:border-gray-500"
            }`}
          />
          <button
            onClick={handleCheckDevice}
            disabled={checking}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors whitespace-nowrap"
          >
            {checking
              ? <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Checking…</>
              : compatResult?.compatible
                ? <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Compatible</>
                : "Check My Device"}
          </button>
        </div>
        {imeiError && <p className="text-red-500 text-xs mt-1.5">{imeiError}</p>}

        {compatResult && (
          <div className={`mt-3 rounded-xl p-3 text-sm ${
            compatResult.compatible
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700"
          }`}>
            {compatResult.compatible ? (
              <>
                <p className="font-bold text-green-800 dark:text-green-400 mb-1.5">{compatResult.message}</p>
              </>
            ) : (
              <p className="text-red-700 dark:text-red-400 font-medium">
                {compatResult.message || "Your device may not be compatible. Please contact support."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ── Steps ──────────────────────────────────────────────────────────────────

  const renderStep = () => {

    // ── STEP 1: Choose Setup ──────────────────────────────────────────────────
    if (step === "choose-setup") return (
      <>
        <StepIndicator currentStep={1} totalSteps={totalSteps} />
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Get Started with Your Plan</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Choose how you'd like to set up your new mobile service</p>

        <div className="space-y-3 mb-8">
          {/* Get a New SIM */}
          <button
            onClick={() => setSetupChoice("new-sim")}
            className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 flex items-start gap-4 ${
              setupChoice === "new-sim"
                ? "border-[#1a4a3f] bg-[#f0faf8] dark:bg-[#1a4a3f]/20"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 bg-white dark:bg-gray-700"
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="5" y="2" width="14" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 17h14" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Get a New SIM</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Start fresh with a brand new phone number and SIM card</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Instant activation | New phone number | Quick setup</p>
            </div>
            <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              setupChoice === "new-sim" ? "border-[#1a4a3f] bg-[#1a4a3f]" : "border-gray-300"
            }`}>
              {setupChoice === "new-sim" && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>

          {/* Keep My Number */}
          <div
            onClick={() => setSetupChoice("keep-number")}
            className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${
              setupChoice === "keep-number"
                ? "border-[#1a4a3f] bg-[#f0faf8] dark:bg-[#1a4a3f]/20"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 bg-white dark:bg-gray-700"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Keep My Number</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Transfer your existing phone number from another carrier</p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Keep your number | No interruption | Easy transfer</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                setupChoice === "keep-number" ? "border-[#1a4a3f] bg-[#1a4a3f]" : "border-gray-300"
              }`}>
                {setupChoice === "keep-number" && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            {/* Inline MDN check */}
            {setupChoice === "keep-number" && (
              <div className="mt-4 border-t border-[#1a4a3f]/20 pt-4" onClick={(e) => e.stopPropagation()}>
                <p className="text-sm font-bold text-gray-800 dark:text-white mb-3">Check If Eligible to Port</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    value={mdn}
                    onChange={(e) => setMdn(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleCheckMdn(); }}
                    placeholder="Enter your MDN/MSISDN number"
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a8a76] transition ${
                      mdnError ? "border-red-400" : "border-gray-200 dark:border-gray-500"
                    }`}
                  />
                  <button
                    onClick={handleCheckMdn}
                    disabled={mdnChecking}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors whitespace-nowrap"
                  >
                    {mdnChecking
                      ? <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Checking…</>
                      : "Check My Number"}
                  </button>
                </div>
                {mdnError && <p className="text-red-500 text-xs mt-1.5">{mdnError}</p>}
                {mdnEligible === true && (
                  <div className="mt-3 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl px-3 py-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <p className="text-xs font-semibold text-green-800 dark:text-green-400">Your number is eligible to port!</p>
                  </div>
                )}
                {mdnEligible === false && (
                  <div className="mt-3 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-3 py-2">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-xs font-semibold text-red-700 dark:text-red-400">This number is not eligible to port. Please contact support.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className=" flex-col flex items-center md:flex-row  justify-between gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 transition-colors">
            Cancel
          </button>
          {setupChoice === "new-sim" && (
            <button
              onClick={() => { setSimChoice("esim"); setCompatResult(null); setImei(""); setStep("choose-sim-type"); }}
              className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          {setupChoice === "keep-number" && mdnEligible === true && (
            <button
              onClick={() => setStep("port-form")}
              className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </>
    );

    // ── STEP 2a: Choose SIM Type — New SIM flow ───────────────────────────────
    if (step === "choose-sim-type") return (
      <>
        <StepIndicator currentStep={2} totalSteps={2} />
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Choose Your SIM Type</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Select how you'd like to receive your SIM</p>

        <div className="space-y-3 mb-8">
          <SimOptionCard type="esim" selected={simChoice === "esim"}
            onSelect={() => { setSimChoice("esim"); setCompatResult(null); setImei(""); setStep("esim-check"); }}
          />
          <SimOptionCard type="psim" selected={simChoice === "psim"}
            onSelect={() => setSimChoice("psim")}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setStep("choose-setup")} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          {simChoice === "psim" && (
            <button onClick={handleNewSimPsimCheckout} className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200">
              Continue to Checkout
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </>
    );

    // ── STEP 2b / 3b: eSIM IMEI Check — shared by both flows ─────────────────
    if (step === "esim-check") {
      const isPortFlow = setupChoice === "keep-number";
      const backStep: ModalStep = isPortFlow ? "port-sim-type" : "choose-sim-type";
      return (
        <>
          <StepIndicator currentStep={currentStepNumber} totalSteps={totalSteps} />
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Check Device Compatibility</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Verify your device supports eSIM on our network</p>

          <div className="space-y-3 mb-4">
            {renderImeiBlock()}

            {/* Switch to pSIM fallback */}
            <button
              onClick={() => {
                setSimChoice("psim");
                setCompatResult(null); setImei("");
                setStep(isPortFlow ? "port-sim-type" : "choose-sim-type");
              }}
              className="w-full text-left rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 bg-white dark:bg-gray-700 p-4 transition-all duration-200 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#e6f4f1] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-[#1a8a76]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v5h11" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">Switch to pSIM instead</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Traditional SIM card — works with all phones</p>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => { setCompatResult(null); setImei(""); setStep(backStep); }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
            {compatResult?.compatible && (
              <button
                onClick={isPortFlow ? handlePortEsimCheckout : handleNewSimEsimCheckout}
                className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200"
              >
                Continue to Checkout
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
        </>
      );
    }

    // ── STEP 2: Port Details Form — Keep Number flow ──────────────────────────
    if (step === "port-form") return (
      <>
        <StepIndicator currentStep={2} totalSteps={3} />
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Port Your Number</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-5">Fill in your details to transfer your existing number</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <PortField label="Full Name" name="fullName" placeholder="Enter your Full Name" value={portForm.fullName} error={portErrors.fullName} onChange={handlePortFormChange} />
          <PortField label="Mobile Number" name="mobileNumber" placeholder="(352) 449-0630" value={portForm.mobileNumber} error={portErrors.mobileNumber} onChange={handlePortFormChange} />
          <PortField label="Email Address" name="email" placeholder="Enter Your Email Address" value={portForm.email} error={portErrors.email} onChange={handlePortFormChange} />
          <PortField label="Zip Code" name="zipCode" placeholder="Enter ZIP Code" required={false} value={portForm.zipCode} error={portErrors.zipCode} onChange={handlePortFormChange} />
          <PortField label="Address Line 1" name="addressLine1" placeholder="Address Line 1" value={portForm.addressLine1} error={portErrors.addressLine1} onChange={handlePortFormChange} />
          <PortField label="Address Line 2" name="addressLine2" placeholder="Address Line 2" value={portForm.addressLine2} error={portErrors.addressLine2} onChange={handlePortFormChange} />
          <PortField label="City" name="city" placeholder="City" value={portForm.city} error={portErrors.city} onChange={handlePortFormChange} />
          <PortField label="State" name="state" placeholder="State" value={portForm.state} error={portErrors.state} onChange={handlePortFormChange} />
        </div>

        <p className="text-base font-extrabold text-gray-900 dark:text-white mb-3">Current Service Provider Details</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <PortField label="Current Carrier Name" name="currentCarrierName" placeholder="Enter Carrier Name" value={portForm.currentCarrierName} error={portErrors.currentCarrierName} onChange={handlePortFormChange} />
          <PortField label="Current SIM Serial Number" name="currentSimSerial" placeholder="Enter 19 Digit SIM Serial Number" value={portForm.currentSimSerial} error={portErrors.currentSimSerial} onChange={handlePortFormChange} />
          <PortField label="Current OSP Account Number" name="currentOspAccountNumber" placeholder="Enter Account Number" value={portForm.currentOspAccountNumber} error={portErrors.currentOspAccountNumber} onChange={handlePortFormChange} />
          <PortField label="OSP Account PIN/Password" name="ospAccountPin" placeholder="Enter PIN" value={portForm.ospAccountPin} error={portErrors.ospAccountPin} onChange={handlePortFormChange} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setStep("choose-setup")} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <button onClick={handlePortFormNext} className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200">
            Next: Choose SIM
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </>
    );

    // ── STEP 3: Choose SIM Type — Keep Number flow ────────────────────────────
    if (step === "port-sim-type") return (
      <>
        <StepIndicator currentStep={3} totalSteps={3} />
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Choose Your SIM Type</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Select how you'd like to receive your new SIM for the ported number
        </p>

        <div className="space-y-3 mb-8">
          <SimOptionCard type="esim" selected={simChoice === "esim"}
            onSelect={() => { setSimChoice("esim"); setCompatResult(null); setImei(""); setStep("esim-check"); }}
          />
          <SimOptionCard type="psim" selected={simChoice === "psim"}
            onSelect={() => setSimChoice("psim")}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={() => setStep("port-form")} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          {simChoice === "psim" && (
            <button onClick={handlePortPsimCheckout} className="flex items-center gap-2 px-7 py-2.5 bg-[#1a4a3f] hover:bg-[#133830] text-white font-semibold text-sm rounded-full transition-colors duration-200">
              Continue to Checkout
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </>
    );

    return null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-modal-in">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1a8a76] via-[#37C4A0] to-[#1a4a3f] rounded-t-3xl" />
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="px-6 pt-6 pb-7">{renderStep()}</div>
      </div>
      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-modal-in { animation: modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
    </div>
  );
};

export default BuyPlanModal;