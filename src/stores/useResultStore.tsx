import type { IColumnsResultStore } from '@/types'
import { create } from 'zustand'

export const useColumnResult = create<IColumnsResultStore>()((set) => ({
  result: [],
  appendResults: (value: string) => set((state) => ({result: [...state.result, value]})),
  clearResults: () => set(() => ({result: []}))
}))