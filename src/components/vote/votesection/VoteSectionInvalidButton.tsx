import { useSelector } from "react-redux";
import "./VoteSection.css"
import { RootState } from "../../../store";
import { AppMode } from "../../../appSlice";

function VoteSectionInvalidButton() {

    const curMode = useSelector((state: RootState) => state.app.mode)
    const hasActiveHeroVoteSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession);
    const hasVoted = useSelector((state: RootState) => state.vote.hasVoted);

    const getMessage = () => {
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
    }

    return (
        <div className="vote-sectionInvalid flex justify-center">
            {/* <p className="text-dota-text-white self-center">Select {curMode === AppMode.Hero ? "a hero" : "an item"} to vote</p> */}
            <p className="text-dota-text-white self-center">{getMessage()}</p>
        </div>
    );
}

export default VoteSectionInvalidButton;
