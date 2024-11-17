import "./VoteSection.css"
import { Item } from '../../../models/item';
import LazyImage from "../LazyImage";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { clearQuery } from "../../search/searchSlice";
import { clearSelection } from "../voteSlice";


type VoteSectionValidProps = {
    item: Item
}

function VoteSectionValid(props: VoteSectionValidProps) {
    const { item } = props;
    const dispatch = useDispatch<AppDispatch>()
    const channelId = useSelector((state: RootState) => state.twitch.channelId);
    const userId = useSelector((state: RootState) => state.twitch.userId)
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem)
    const handleVote = async () => {
        try {
          console.log(`Voting for ${selectedItem?.item_name}`)
          const response = await fetch(`http://localhost:3000/vote/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "channel_id": channelId,
              "twitch_id": userId,
              "item_id": selectedItem?.id
            })
          })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            dispatch(clearQuery())
            dispatch(clearSelection())
          }
        } catch(err) {
          console.log("Failed to send")
        }
    }
    
    return (
        <div className="vote-sectionValid flex flex-row p-2 align-middle" onClick={handleVote}>
            <div className="h-[21] align-center">
                <LazyImage itemName={item.item_name} height={21} width={28.3} />
            </div>
            <p className="text-dota-text-white pl-3 font-semibold self-center">Vote {item.name}</p>
        </div>
    );
}

export default VoteSectionValid;
