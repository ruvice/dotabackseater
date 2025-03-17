// models/item.ts
export interface Item {
    id: string;
    name: string;
    item_name: string;
    cost: number;
    type: "item";
}

export interface Hero {
    id:  string;
    name: string;
    hero_name: string;
    type: "hero";
}

export interface VoteModel {
    id: string;
    display_name: string;
    image_name: string;
    voteModel: Item | Hero;
}

export type HeroVoteMap = Record<string, number> | undefined;


export enum ToastType {
    Success = "success",
    Error = "error",
    Loading = "loading",
}

export interface ToastEvent {
    message: string;
    type: ToastType;
    id: number;
}