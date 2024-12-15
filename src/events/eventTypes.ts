export interface EventState {
    lastChatVotedItemID: string
    currentCount: number
}

export type FetchExtensionVoteStatusResult = {
    currentCount: number
    lastChatVotedItemID: string
}