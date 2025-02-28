import { Item, Hero } from "../../models/models";

export interface VoteState {
    selectedItem: Item | null
    selectedHero: Hero | null
    countdown: number
}
  