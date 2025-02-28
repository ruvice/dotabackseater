import { Hero } from "../../../models/models"

export type HeroMap = {
    [key: string]: Hero
}

export type FetchHeroResult = {
    heroes: HeroMap
    heroesArr: Hero[]
}

export interface HeroState {
    loading: boolean
    heroesArr: Hero[]
    heroes: HeroMap
}
  