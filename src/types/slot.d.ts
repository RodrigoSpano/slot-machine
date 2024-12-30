export interface IDb_item {
  name: string
  image: string
}

export interface IColumn {
  duration: number
  isSpinning: boolean
  items: IDb_item[]
}

export type TButtonProps = {
  onClick: () => void
  disabled: boolean
}

export type TColumnProps = IColumn & {}
export type TUseColumnsProps = TColumnProps & {}