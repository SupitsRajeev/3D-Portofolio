"use client";

import { LayoutGroup } from "framer-motion";
import { OrbProvider } from "@/context/OrbContext";
import { FloatingOrb } from "@/components/FloatingOrb";
import { CustomCursor } from "@/components/CustomCursor";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OrbProvider>
      <LayoutGroup>
        {children}
        <FloatingOrb />
        <CustomCursor />
      </LayoutGroup>

      {/* Hidden SVG filter — used by project cards for turbulence distortion on hover */}
      <svg
        aria-hidden="true"
        className="absolute w-0 h-0 overflow-hidden"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id="card-turbulence" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </OrbProvider>
  );
}
