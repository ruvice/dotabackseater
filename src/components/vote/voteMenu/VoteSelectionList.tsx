import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { Hero, Item } from '../../../models/models';
import { RootState } from "../../../store";
import VoteSelectionCard, { VoteSelectionCardProps } from './VoteSelectionCard';
import "./VoteSelectionList.css";
  
export const mapToVoteSelectionCardProps = <T extends Hero | Item >(
    data: T
): VoteSelectionCardProps => ({
    id: data.id,
    display_name: data.name,
    image_name: `${"item_name" in data ? data.item_name : data.name}`,
    voteModel: data
});

function VoteSelectionList() {
    const query = useSelector((state: RootState) => state.search.query);
    const loading = useSelector((state: RootState) => state.item.loading)
    const itemsArr = useSelector((state: RootState) => state.item.itemsArr)
    const items = useMemo(() => { 
        return itemsArr.map((item: Item) => {
            if (query === "" || item.name.toLowerCase().includes(query.toLowerCase())) {
                const voteCardProps = mapToVoteSelectionCardProps(item)
                return <VoteSelectionCard {...voteCardProps} />
            }
        });
    }, [itemsArr, query]); // Re-runs when `someDependency` changes

    return (
        <div className="item-list-container h-[192px] custom-scrollbar">
            {loading ? <p>Loading...</p> : items}
        </div>
    );
}

export default VoteSelectionList;
