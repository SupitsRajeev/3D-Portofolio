"use client";

import { LayoutGroup } from "framer-motion";
import { OrbProvider } from "@/context/OrbContext";
import { FloatingOrb } from "@/components/FloatingOrb";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OrbProvider>
      <LayoutGroup>
        {children}
        <FloatingOrb />
      </LayoutGroup>
    </OrbProvider>
  );
}
