import "./VoteSection.css"
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import VoteSectionValidButton from "./VoteSectionValidButton";
import VoteSectionInvalidButton from "./VoteSectionInvalidButton";
import CountdownBar from "./CountdownBar";
import { AppMode } from "../../../store/appSlice";
import { mapToVoteModel } from "../../../models/utility";
import { useEffect, useState } from "react";
import { VoteModel } from "../../../models/models";

function VoteSection() {
    const [voteSelection, setVoteSelection] = useState<VoteModel | undefined>(undefined);
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem);
    const selectedHero = useSelector((state: RootState) => state.vote.selectedHero);
    const curMode = useSelector((state: RootState) => state.app.mode);
    const hasActiveHeroVoteSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession);
    const hasVoted = useSelector((state: RootState) => state.vote.hasVoted);

    const getVoteSectionButton = () => {
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
    };
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
    }, [curMode, selectedHero, selectedItem, hasActiveHeroVoteSession])
    console.log("hasActiveHeroVoteSession", hasActiveHeroVoteSession)
    console.log("hasVoted", hasVoted)
    return (
        <div className='flex flex-col'>
            <div className="w-full">
                {getVoteSectionButton()}
            </div>
            <CountdownBar />
        </div>
    );
}

export default VoteSection;
