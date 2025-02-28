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