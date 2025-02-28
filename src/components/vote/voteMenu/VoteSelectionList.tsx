import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { Hero, Item } from '../../../models/models';
import { RootState } from "../../../store";
import VoteSelectionCard, { VoteSelectionCardProps } from './VoteSelectionCard';
import "./VoteSelectionList.css";
import { AppMode } from '../../../appSlice';
  
export const mapToVoteSelectionCardProps = <T extends Hero | Item >(
    data: T
): VoteSelectionCardProps => ({
    id: data.id,
    display_name: data.name,
    image_name: `${"item_name" in data ? data.item_name : data.hero_name}`,
    voteModel: data
});

function VoteSelectionList() {
    const curMode = useSelector((state: RootState) => state.app.mode)
    const query = useSelector((state: RootState) => state.search.query);
    const itemLoading = useSelector((state: RootState) => state.item.loading)
    const itemsArr = useSelector((state: RootState) => state.item.itemsArr)
    const heroLoading = useSelector((state: RootState) => state.hero.loading)
    const heroesArr = useSelector((state: RootState) => state.hero.heroesArr)
    const heroes = useMemo(() => {
        return heroesArr.map((hero: Hero) => {
            if (query === "" || hero.name.toLowerCase().includes(query.toLowerCase())) {
                const voteCardProps = mapToVoteSelectionCardProps(hero)
                return <VoteSelectionCard {...voteCardProps} />
            }
        })
    }, [heroesArr, query])
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
            {(curMode === AppMode.Item) && (itemLoading ? <p>Loading...</p> : items)}
            {(curMode === AppMode.Hero) && (heroLoading ? <p>Loading...</p> : heroes)}
        </div>
    );
}

export default VoteSelectionList;
