import { Item } from "../../../models/models"

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
  