import { Item } from "../../models/item";

export interface VoteState {
    selectedItem: Item | null
    countdown: number
}
  