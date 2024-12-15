import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ItemCard from "../vote/item/ItemCard";
import { Item } from "../../models/item";
import LazyImage from "../vote/item/LazyImage";
import { useEffect, useRef, useState } from "react";


function Panel() { 
    const [item, setItem] = useState<Item | null>(null)
    const streamerConfig = useSelector((state: RootState) => state.twitch.streamerConfig)
    const lastVotedItem = useSelector((state: RootState) => state.event.lastChatVotedItemID)
    const items = useSelector((state: RootState) => state.item.items)

    useEffect(() => {
        setItem(items[lastVotedItem])
    }, [lastVotedItem, items])
    return (
        <div className="panel bg-dota-panel-background border border-border-color p-2">
            <p className="text-xl font-bold text-center text-dota-text-white">Dota 2 Backseater</p>
            <div className="chat-suggestion flex flex-col bg-dota-panel-item-box rounded-lg mt-1 p-2">
                { item ?
                    <div className="chat-suggestion-box flex flex-row items-center h-[48px] pl-2">
                        <LazyImage itemName={item?.item_name} height={48} width={63}/>
                        <div className="chat-suggestion-item flex flex-col pl-2">
                            <p className="text-dota-text-white text-m font-semibold">{item?.name}</p>
                            <p className="chat-suggestion-text text-dota-text-white text-xs font-sans">Chat's suggestion</p>
                        </div>
                    </div> :
                    <div className="chat-suggestion-box flex flex-row items-center justify-center h-[48px]">
                        <div className="chat-suggestion-item flex flex-col pl-2 items-center">
                            <p className="chat-suggestion-text text-dota-text-white text-sm">Nothing voted yet!</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Panel;
