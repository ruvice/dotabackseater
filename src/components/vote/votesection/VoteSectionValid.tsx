import "./VoteSection.css"
import { Item } from '../../../models/item';
import LazyImage from "../LazyImage";


type VoteSectionValidProps = {
    item: Item
}

function VoteSectionValid(props: VoteSectionValidProps) {
    const { item } = props;
    return (
        <div className="vote-sectionValid flex flex-row p-2 align-middle">
            <div className="h-[21] align-center">
                <LazyImage itemName={item.item_name} height={21} width={28.3} />
            </div>
            <p className="text-dota-text-white pl-3 text-xs font-semibold self-center">Vote {item.name}</p>
        </div>
    );
}

export default VoteSectionValid;
