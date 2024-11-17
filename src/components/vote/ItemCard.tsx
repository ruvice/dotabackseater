import './ItemCard.css'
import { useEffect, useState, useMemo } from 'react';
import { Item } from '../../models/item';
import LazyImage from "./LazyImage";
import { RootState, AppDispatch } from '../../store';
import { select } from './voteSlice';
import { useSelector, useDispatch } from 'react-redux';

type ItemCardProps = {
    item: Item | null
}


function ItemCard(props: ItemCardProps) {
    const { item } = props
    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = (item: Item) => {{
        dispatch(select(item))
    }}
    return ( item ?
        <button className="btn-voteItem group" key={item.id} onClick={() => handleClick(item)}>
            <div className="group flex flex-row pl-4">
                <LazyImage itemName={item.item_name} height={16} width={21}/>
                <p className="text-dota-text-white text-xs pl-2">{item.name}</p>
            </div>
        </button> : <div>Unknown item</div>
    );
}

export default ItemCard;
