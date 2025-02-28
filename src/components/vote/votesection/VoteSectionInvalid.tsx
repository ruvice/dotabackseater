import { useSelector } from "react-redux";
import "./VoteSection.css"
import { RootState } from "../../../store";
import { AppMode } from "../../../appSlice";

function VoteSectionInvalid() {

    const curMode = useSelector((state: RootState) => state.app.mode)
    return (
        <div className="vote-sectionInvalid flex justify-center">
            <p className="text-dota-text-white self-center">Select {curMode === AppMode.Hero ? "a hero" : "an item"} to vote</p>
        </div>
    );
}

export default VoteSectionInvalid;
