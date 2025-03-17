import "./VoteSection.css"
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import VoteSectionValidButton from "./VoteSectionValidButton";
import VoteSectionInvalidButton from "./VoteSectionInvalidButton";
import CountdownBar from "./CountdownBar";
import { AppMode } from "../../../store/appSlice";
import { mapToVoteModel } from "../../../models/utility";
import { useEffect, useMemo, useState } from "react";
import { VoteModel } from "../../../models/models";

function VoteSection() {
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem);
    const selectedHero = useSelector((state: RootState) => state.vote.selectedHero);
    const curMode = useSelector((state: RootState) => state.app.mode);
    const hasActiveHeroVoteSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession);
    const hasVoted = useSelector((state: RootState) => state.vote.hasVoted);

    // 🟢 Use useMemo to avoid unnecessary re-renders
    const voteSelection = useMemo(() => {
        if (curMode === AppMode.Hero) {
        return selectedHero ? mapToVoteModel(selectedHero) : undefined;
        } 
        if (curMode === AppMode.Item) {
        return selectedItem ? mapToVoteModel(selectedItem) : undefined;
        }
        return undefined;
    }, [curMode, selectedHero, selectedItem]);

    // 🟢 Memoize the button selection logic
    const voteButton = useMemo(() => {
        if (curMode === AppMode.Hero) {
        return hasActiveHeroVoteSession && voteSelection && !hasVoted
            ? <VoteSectionValidButton voteSelection={voteSelection} />
            : <VoteSectionInvalidButton />;
        }
        
        if (curMode === AppMode.Item) {
        return voteSelection
            ? <VoteSectionValidButton voteSelection={voteSelection} />
            : <VoteSectionInvalidButton />;
        }
        
        return <VoteSectionInvalidButton />;
    }, [curMode, hasActiveHeroVoteSession, voteSelection, hasVoted]);
    
    return (
        <div className='flex flex-col'>
            {voteButton}
            {curMode === AppMode.Item && <CountdownBar />}
        </div>
    );
}

export default VoteSection;
