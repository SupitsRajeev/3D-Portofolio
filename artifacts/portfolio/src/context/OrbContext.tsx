"use client";

import { createContext, useContext, useState } from "react";

interface OrbContextValue {
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
}

const OrbContext = createContext<OrbContextValue>({
  isExpanded: false,
  setIsExpanded: () => {},
});

export function OrbProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <OrbContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </OrbContext.Provider>
  );
}

export function useOrb() {
  return useContext(OrbContext);
}
