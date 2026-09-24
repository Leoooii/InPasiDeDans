'use client';

import { createContext, useContext } from 'react';
import type { Instructor, TarifeGrupate } from '@/lib/public-data';

export type PublicData = {
  tarife: TarifeGrupate | null;
  instructori: Instructor[] | null;
  grupe: Record<string, any>[] | null;
};

const PublicDataContext = createContext<PublicData>({ tarife: null, instructori: null, grupe: null });

export function PublicDataProvider({ value, children }: { value: PublicData; children: React.ReactNode }) {
  return <PublicDataContext.Provider value={value}>{children}</PublicDataContext.Provider>;
}

export function usePublicData() {
  return useContext(PublicDataContext);
}
