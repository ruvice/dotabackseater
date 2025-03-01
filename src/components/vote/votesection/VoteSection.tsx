import "./VoteSection.css"
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import VoteSectionValidButton from "./VoteSectionValidButton";
import VoteSectionInvalidButton from "./VoteSectionInvalidButton";
import CountdownBar from "./CountdownBar";
import { AppMode } from "../../../appSlice";
import { mapToVoteModel } from "../../../models/utility";
import { useEffect, useState } from "react";
import { VoteModel } from "../../../models/models";

function VoteSection() {
    const [voteSelection, setVoteSelection] = useState<VoteModel | undefined>(undefined);
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem);
    const selectedHero = useSelector((state: RootState) => state.vote.selectedHero);
    const curMode = useSelector((state: RootState) => state.app.mode);
    
    useEffect(() => {
        if (curMode === AppMode.Hero) {
            if (selectedHero) {
                setVoteSelection(mapToVoteModel(selectedHero));
            } else {
                setVoteSelection(undefined)
            }
        } else if (curMode === AppMode.Item) {
            if (selectedItem) {
                setVoteSelection(mapToVoteModel(selectedItem));
            } else {
                setVoteSelection(undefined)
            }
        }
    }, [curMode, selectedHero, selectedItem])
    return (
        <div className='flex flex-col'>
            <div className="w-full">
                { voteSelection ? <VoteSectionValidButton voteSelection={voteSelection} /> : <VoteSectionInvalidButton /> }
            </div>
            <CountdownBar />
        </div>
    );
}

export default VoteSection;
