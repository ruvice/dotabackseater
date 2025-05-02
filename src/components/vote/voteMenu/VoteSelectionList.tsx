import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { Hero, Item } from '../../../models/models';
import { RootState } from "../../../store/store";
import VoteSelectionCard from './VoteSelectionCard';
import { AppMode } from '../../../store/appSlice';
import { mapToVoteModel } from '../../../models/utility';
import "./VoteSelectionList.css";

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
                const voteCardModel = mapToVoteModel(hero)
                return <VoteSelectionCard key={voteCardModel.id} voteCardModel={voteCardModel} />
            }
        })
    }, [heroesArr, query])
    const items = useMemo(() => { 
        return itemsArr.map((item: Item) => {
            if (query === "" || item.name.toLowerCase().includes(query.toLowerCase())) {
                const voteCardModel = mapToVoteModel(item)
                return <VoteSelectionCard key={voteCardModel.id} voteCardModel={voteCardModel} />
            }
        });
    }, [itemsArr, query]); // Re-runs when `someDependency` changes

    return (
        <div className="item-list-container h-[240px] custom-scrollbar">
            {(curMode === AppMode.Item) && (itemLoading ? <p>Loading...</p> : items)}
            {(curMode === AppMode.Hero) && (heroLoading ? <p>Loading...</p> : heroes)}
        </div>
    );
}

export default VoteSelectionList;
