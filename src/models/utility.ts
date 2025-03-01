import { Hero, Item, VoteModel } from "./models";

export const mapToVoteModel = <T extends Hero | Item >(
    data: T
): VoteModel => ({
    id: data.id,
    display_name: data.name,
    image_name: `${"item_name" in data ? data.item_name : data.hero_name}`,
    voteModel: data
});