import { Item } from "../../../models/item"

export type ItemMap = {
    [key: string]: Item
}

export type FetchItemResult = {
    items: ItemMap
    itemsArr: Item[]
}

export interface ItemState {
    loading: boolean
    itemsArr: Item[]
    items: ItemMap
}
  