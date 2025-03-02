import { useSelector } from "react-redux";
import "./Tooltip.css"
import { RootState } from "../../store";
import { AppMode } from "../../appSlice";


function Tooltip() { 
    const streamerConfig = useSelector((state: RootState) => state.twitch.streamerConfig)
    const currentCount = useSelector((state: RootState) => state.event.currentCount)
    const curMode = useSelector((state: RootState) => state.app.mode)
    return (
        <>
            {curMode === AppMode.Item && <p className="tooltip">Votes required: {currentCount}/{streamerConfig.vote_threshold}</p>}
        </>
    );
}

export default Tooltip;
