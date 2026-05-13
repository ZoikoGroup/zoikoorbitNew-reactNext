// Currency catalog — all Stripe-supported currencies. Sourced from
// https://docs.stripe.com/currencies (presentment currencies).
//
// We charge in USD always (per current design decision). The currency
// selector affects DISPLAY only — we convert USD → chosen currency for
// the visible amounts and tell Stripe to bill in USD.

export interface Currency {
  code: string;     // ISO 4217 (lowercase, Stripe's convention)
  name: string;
  symbol: string;
  zeroDecimal: boolean; // Stripe zero-decimal currencies (no fractional unit)
}

// Stripe's official zero-decimal currency list. Amounts for these are NOT
// multiplied by 100 when sent to Stripe. We don't bill in these (we bill
// USD), but the formatter still needs to know so the display rounds right.
const ZERO_DECIMAL = new Set([
  "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga", "pyg", "rwf",
  "ugx", "vnd", "vuv", "xaf", "xof", "xpf",
]);

// Symbol lookup — a curated list covers ~95% of real-world picks; everything
// else falls back to the ISO code in the formatter.
const SYMBOLS: Record<string, string> = {
  usd: "$", eur: "€", gbp: "£", jpy: "¥", cny: "¥", krw: "₩", inr: "₹",
  aud: "A$", cad: "C$", nzd: "NZ$", sgd: "S$", hkd: "HK$", chf: "CHF",
  sek: "kr", nok: "kr", dkk: "kr", pln: "zł", czk: "Kč", huf: "Ft",
  ils: "₪", aed: "د.إ", sar: "﷼", try: "₺", brl: "R$", mxn: "Mex$",
  ars: "AR$", clp: "CLP$", cop: "COL$", pen: "S/", uyu: "UY$", zar: "R",
  rub: "₽", thb: "฿", myr: "RM", idr: "Rp", php: "₱", vnd: "₫",
  twd: "NT$", egp: "E£", kes: "KSh", ngn: "₦", ghs: "₵", uah: "₴",
  ron: "lei", bgn: "лв", bdt: "৳", pkr: "₨", lkr: "Rs", npr: "रू",
  isk: "kr", omr: "﷼", qar: "﷼", kwd: "KD", bhd: ".د.ب", jod: "JD",
};

// Curated short-name list — Stripe supports many more than we name here;
// missing ones get a generic name ("Currency: xyz").
const NAMES: Record<string, string> = {
  usd: "US Dollar", eur: "Euro", gbp: "British Pound", jpy: "Japanese Yen",
  aud: "Australian Dollar", cad: "Canadian Dollar", chf: "Swiss Franc",
  cny: "Chinese Yuan", hkd: "Hong Kong Dollar", sgd: "Singapore Dollar",
  nzd: "New Zealand Dollar", inr: "Indian Rupee", krw: "South Korean Won",
  sek: "Swedish Krona", nok: "Norwegian Krone", dkk: "Danish Krone",
  pln: "Polish Złoty", czk: "Czech Koruna", huf: "Hungarian Forint",
  ils: "Israeli Shekel", aed: "UAE Dirham", sar: "Saudi Riyal",
  try: "Turkish Lira", brl: "Brazilian Real", mxn: "Mexican Peso",
  ars: "Argentine Peso", clp: "Chilean Peso", cop: "Colombian Peso",
  pen: "Peruvian Sol", uyu: "Uruguayan Peso", zar: "South African Rand",
  rub: "Russian Ruble", thb: "Thai Baht", myr: "Malaysian Ringgit",
  idr: "Indonesian Rupiah", php: "Philippine Peso", vnd: "Vietnamese Dong",
  twd: "Taiwan Dollar", egp: "Egyptian Pound", kes: "Kenyan Shilling",
  ngn: "Nigerian Naira", ghs: "Ghanaian Cedi", uah: "Ukrainian Hryvnia",
  ron: "Romanian Leu", bgn: "Bulgarian Lev", bdt: "Bangladeshi Taka",
  pkr: "Pakistani Rupee", lkr: "Sri Lankan Rupee", npr: "Nepalese Rupee",
  isk: "Icelandic Króna", omr: "Omani Rial", qar: "Qatari Riyal",
  kwd: "Kuwaiti Dinar", bhd: "Bahraini Dinar", jod: "Jordanian Dinar",
  // Africa
  zmw: "Zambian Kwacha", mad: "Moroccan Dirham", tnd: "Tunisian Dinar",
  // Pacific
  fjd: "Fijian Dollar", pgk: "Papua New Guinean Kina",
  // Caribbean
  ttd: "Trinidad & Tobago Dollar", jmd: "Jamaican Dollar", xcd: "East Caribbean Dollar",
  // CIS
  kzt: "Kazakhstani Tenge", uzs: "Uzbekistani Som", azn: "Azerbaijani Manat",
  amd: "Armenian Dram", gel: "Georgian Lari",
};

// Stripe's full set of presentment currencies. Trimmed to the codes
// you're most likely to need; add to this list as Stripe expands.
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
  "tjs","top","ttd","tzs","ugx","vuv","wst","xaf","xof","xpf","yer",
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

/**
 * Format an amount in the given currency. Uses Intl.NumberFormat where
 * possible, falling back to a manual symbol + fixed-decimal render for
 * exotic codes that Intl doesn't recognise.
 */
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
    // Intl doesn't know this currency code — fall back to our symbol
    return `${cur.symbol} ${amount.toFixed(decimals)}`;
  }
}