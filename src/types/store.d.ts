export interface IColumnsResultStore {
  // prize: boolean
  result: string[]
  appendResults: (value: string) => void
  clearResults: () => void
}