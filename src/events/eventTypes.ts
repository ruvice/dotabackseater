import { HeroVoteMap } from "../models/models"

export interface EventState {
    lastChatVotedItemID: string
    currentCount: number
    heroVoteMap: HeroVoteMap
    hasVoted: boolean
}

export type FetchExtensionItemVoteStatusResult = {
    currentCount: number
    lastChatVotedItemID: string
}

export type FetchExtensionHeroVoteStatusResult = {
    hero_vote_map: HeroVoteMap,
    has_voted: boolean
}