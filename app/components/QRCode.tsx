"use client";

import { QRCodeSVG } from "qrcode.react";

/**
 * Renders an eSIM activation QR code from an LPA payload string.
 *
 * The payload is expected to be the value stored in
 * `SimInventory.deviceSerialNumber` — typically formatted as
 * `LPA:1$<smdp-server>$<activation-code>`. iOS and Android's eSIM setup
 * screens scan that string directly and offer to install the profile.
 *
 * Empty payload → renders nothing. Callers should branch on whether they
 * have a payload to show or fall back to "Contact support" copy (same as
 * the activation email's fallback).
 *
 * SVG is preferred over canvas/PNG: crisp at any zoom level, can be saved
 * by the browser without a screenshot, and styles cleanly with the rest
 * of the page.
 */
export default function QRCode({
  value,
  size = 200,
  label,
  className = "",
}: {
  value: string;
  size?: number;
  /** Visible caption under the QR (e.g. "Scan to install eSIM"). */
  label?: string;
  className?: string;
}) {
  if (!value) return null;

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <QRCodeSVG
          value={value}
          size={size}
          // Medium error correction — robust enough for screen photos.
          level="M"
          // Include a small margin (`includeMargin` is for the bordered
          // "quiet zone"; visually the wrapper border handles it).
          includeMargin={false}
          bgColor="#ffffff"
          fgColor="#111827"
        />
      </div>
      {label && (
        <span className="text-xs font-medium text-gray-500">{label}</span>
      )}
    </div>
  );
}
