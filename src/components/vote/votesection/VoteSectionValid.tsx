import "./VoteSection.css"
import { Item } from '../../../models/item';
import LazyImage from "../LazyImage";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { castVote } from "../voteSlice";

type VoteSectionValidProps = {
    item: Item
}

function VoteSectionValid(props: VoteSectionValidProps) {
    const { item } = props;
    const dispatch = useDispatch<AppDispatch>()
    const handleVote = async () => {
        dispatch(castVote())
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
