import { useSelector } from "react-redux";
import "./VoteSection.css"
import { RootState } from "../../../store/store";
import { AppMode } from "../../../store/appSlice";
import { useMemo } from "react";

function VoteSectionInvalidButton() {

    const curMode = useSelector((state: RootState) => state.app.mode)
    const hasActiveHeroVoteSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession);
    const hasVoted = useSelector((state: RootState) => state.vote.hasVoted);

    const message = useMemo(() => {
        if (curMode === AppMode.Hero) {
            if (hasActiveHeroVoteSession) {
                if (!hasVoted) {
                    return "Select a hero to vote"
                } else {
                    return "Already voted"
                }
            } else {
                return "No vote session"
            }
        } else {
            return "Select an item to vote"
        }
    }, [curMode, hasActiveHeroVoteSession, hasVoted]);

    return (
        <div className="vote-sectionInvalid flex justify-center">
            <p className="text-dota-text-white self-center">{message}</p>
        </div>
    );
}

export default VoteSectionInvalidButton;
