"use client";

// ── Currency catalog + searchable dropdown ─────────────────────────────────
// One file so it's easier to drop into your existing project.

import { useEffect, useMemo, useRef, useState } from "react";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  zeroDecimal: boolean;
}

const ZERO_DECIMAL = new Set([
  "bif","clp","djf","gnf","jpy","kmf","krw","mga","pyg","rwf",
  "ugx","vnd","vuv","xaf","xof","xpf",
]);

const SYMBOLS: Record<string, string> = {
  usd:"$", eur:"€", gbp:"£", jpy:"¥", cny:"¥", krw:"₩", inr:"₹",
  aud:"A$", cad:"C$", nzd:"NZ$", sgd:"S$", hkd:"HK$", chf:"CHF",
  sek:"kr", nok:"kr", dkk:"kr", pln:"zł", czk:"Kč", huf:"Ft",
  ils:"₪", aed:"د.إ", sar:"﷼", try:"₺", brl:"R$", mxn:"Mex$",
  ars:"AR$", clp:"CLP$", cop:"COL$", pen:"S/", uyu:"UY$", zar:"R",
  rub:"₽", thb:"฿", myr:"RM", idr:"Rp", php:"₱", vnd:"₫",
  twd:"NT$", egp:"E£", kes:"KSh", ngn:"₦", ghs:"₵", uah:"₴",
  ron:"lei", bgn:"лв", bdt:"৳", pkr:"₨", lkr:"Rs", npr:"रू",
  isk:"kr", omr:"﷼", qar:"﷼", kwd:"KD", bhd:".د.ب", jod:"JD",
};

const NAMES: Record<string, string> = {
  usd:"US Dollar", eur:"Euro", gbp:"British Pound", jpy:"Japanese Yen",
  aud:"Australian Dollar", cad:"Canadian Dollar", chf:"Swiss Franc",
  cny:"Chinese Yuan", hkd:"Hong Kong Dollar", sgd:"Singapore Dollar",
  nzd:"New Zealand Dollar", inr:"Indian Rupee", krw:"South Korean Won",
  sek:"Swedish Krona", nok:"Norwegian Krone", dkk:"Danish Krone",
  pln:"Polish Złoty", czk:"Czech Koruna", huf:"Hungarian Forint",
  ils:"Israeli Shekel", aed:"UAE Dirham", sar:"Saudi Riyal",
  try:"Turkish Lira", brl:"Brazilian Real", mxn:"Mexican Peso",
  ars:"Argentine Peso", clp:"Chilean Peso", cop:"Colombian Peso",
  pen:"Peruvian Sol", uyu:"Uruguayan Peso", zar:"South African Rand",
  rub:"Russian Ruble", thb:"Thai Baht", myr:"Malaysian Ringgit",
  idr:"Indonesian Rupiah", php:"Philippine Peso", vnd:"Vietnamese Dong",
  twd:"Taiwan Dollar", egp:"Egyptian Pound", kes:"Kenyan Shilling",
  ngn:"Nigerian Naira", ghs:"Ghanaian Cedi", uah:"Ukrainian Hryvnia",
  ron:"Romanian Leu", bgn:"Bulgarian Lev", bdt:"Bangladeshi Taka",
  pkr:"Pakistani Rupee", lkr:"Sri Lankan Rupee", npr:"Nepalese Rupee",
  isk:"Icelandic Króna", omr:"Omani Rial", qar:"Qatari Riyal",
  kwd:"Kuwaiti Dinar", bhd:"Bahraini Dinar", jod:"Jordanian Dinar",
  zmw:"Zambian Kwacha", mad:"Moroccan Dirham", tnd:"Tunisian Dinar",
  fjd:"Fijian Dollar", pgk:"Papua New Guinean Kina",
  ttd:"Trinidad & Tobago Dollar", jmd:"Jamaican Dollar", xcd:"East Caribbean Dollar",
  kzt:"Kazakhstani Tenge", uzs:"Uzbekistani Som", azn:"Azerbaijani Manat",
  amd:"Armenian Dram", gel:"Georgian Lari",
};

const STRIPE_CODES = [
  "usd","eur","gbp","jpy","aud","cad","chf","cny","hkd","sgd","nzd","inr","krw",
  "sek","nok","dkk","pln","czk","huf","ils","aed","sar","try","brl","mxn","ars",
  "clp","cop","pen","uyu","zar","rub","thb","myr","idr","php","vnd","twd","egp",
  "kes","ngn","ghs","uah","ron","bgn","bdt","pkr","lkr","npr","isk","omr","qar",
  "kwd","bhd","jod","zmw","mad","tnd","fjd","pgk","ttd","jmd","xcd","kzt","uzs",
  "azn","amd","gel","afn","all","ang","aoa","awg","bam","bbd","bif","bmd","bnd",
  "bob","bsd","bwp","byn","bzd","cdf","crc","cve","djf","dop","dzd","etb","fkp",
  "gip","gmd","gnf","gtq","gyd","hnl","htg","kgs","khr","kmf","kyd","lak","lbp",
  "lrd","lsl","mdl","mga","mkd","mmk","mnt","mop","mur","mvr","mwk","mzn","nad",
  "nio","pab","pyg","rsd","rwf","sbd","scr","shp","sll","sos","srd","stn","szl",
  "tjs","top","tzs","ugx","vuv","wst","xaf","xof","xpf","yer",
];

export const CURRENCIES: Currency[] = STRIPE_CODES.map((code) => ({
  code,
  name: NAMES[code] ?? code.toUpperCase(),
  symbol: SYMBOLS[code] ?? code.toUpperCase(),
  zeroDecimal: ZERO_DECIMAL.has(code),
}));

export const CURRENCY_BY_CODE: Record<string, Currency> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c])
);

/** Format a USD amount in the chosen presentment currency. */
export function formatMoney(amount: number, code: string): string {
  const cur = CURRENCY_BY_CODE[code] ?? CURRENCY_BY_CODE.usd;
  const decimals = cur.zeroDecimal ? 0 : 2;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code.toUpperCase(),
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `${cur.symbol} ${amount.toFixed(decimals)}`;
  }
}

// ── FX rates: client-side cache + getRates() ───────────────────────────────

export interface FxRates {
  base: "USD";
  rates: Record<string, number>;
  fetchedAt: string;
  source: string;
}

let _cache: { value: FxRates; expires: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function getRates(): Promise<FxRates> {
  if (_cache && _cache.expires > Date.now()) return _cache.value;
  const res = await fetch("/api/fx-rates");
  if (!res.ok) throw new Error(`fx-rates ${res.status}`);
  const value = (await res.json()) as FxRates;
  _cache = { value, expires: Date.now() + CACHE_TTL_MS };
  return value;
}

export function convertFromUsd(usd: number, target: string, rates: FxRates | null): number {
  if (!rates || target === "usd") return usd;
  const r = rates.rates[target];
  return r && r > 0 ? usd * r : usd;
}

// ── Searchable dropdown ────────────────────────────────────────────────────

type Props = {
  value: string;
  onChange: (code: string) => void;
};

export function CurrencySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [query]);

  const current = CURRENCY_BY_CODE[value] ?? CURRENCY_BY_CODE.usd;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <span className="text-gray-500">{current.symbol}</span>
        <span className="uppercase">{current.code}</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-72 rounded-xl shadow-lg z-50 border bg-white border-gray-200 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency…"
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">No match</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={
                      "w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 " +
                      (c.code === value ? "bg-red-50 text-red-700" : "text-gray-700")
                    }
                  >
                    <span className="w-12 text-xs uppercase font-mono text-gray-500">{c.code}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-gray-400">{c.symbol}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}