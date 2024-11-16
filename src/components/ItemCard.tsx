import "./ItemList.css"
import { useEffect, useState, useMemo } from 'react';
import { Item } from '../models/item';

type ItemCardProps = {
    item: Item
    handleVote: (item_id: string) => void
}

function ItemCard(props: ItemCardProps) {
    const { item, handleVote } = props

    return (
        <button className="btn-voteItem group" key={item.id} onClick={() => handleVote(item.id)}>
            <p className="text-dota-text-white text-xs">{item.name}</p>
        </button>
    );
}

export default ItemCard;
