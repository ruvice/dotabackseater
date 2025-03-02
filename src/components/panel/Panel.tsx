import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ChatSuggestion from "./ChatSuggestion";
import HeroVoteResultView from "./HeroVoteResultView";
import { AppMode } from "../../store/appSlice";


function Panel() { 
    const curMode = useSelector((state: RootState) => state.app.mode)
    return (
        <div className="panel bg-dota-panel-background border border-border-color p-2">
            {curMode === AppMode.Hero ? <HeroVoteResultView /> : <ChatSuggestion />}
        </div>
    )
}

export default Panel;
