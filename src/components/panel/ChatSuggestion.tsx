import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Item } from '../../models/models'
import { RootState } from '../../store'
import LazyImage from '../vote/voteMenu/LazyImage'
import "./ChatSuggestion.css"

const ChatSuggestion = () => {
    const [item, setItem] = useState<Item | null>(null)
    const lastVotedItem = useSelector((state: RootState) => state.event.lastChatVotedItemID)
    const items = useSelector((state: RootState) => state.item.items)
    useEffect(() => {
        setItem(items[lastVotedItem])
    }, [lastVotedItem, items])
    return (
        <div className="chat-suggestion flex flex-col bg-dota-panel-item-box rounded-lg mt-1 p-2">
            <div className={`chat-suggestion-box ${item ? 'pl-2' : 'justify-center'}`}>
                {item && <LazyImage imageName={item?.item_name} height={48} width={63}/>}
                <div className="chat-suggestion-item flex flex-col pl-2">
                <p className="chat-suggestion-text text-dota-text-white font-semibold font-sans">Chat's suggestion</p>
                    <p className="text-dota-text-white text-xs">{item ? item.name : 'Nothing voted yet!'}</p>
                </div>
            </div>
        </div>
  )
}

export default ChatSuggestion