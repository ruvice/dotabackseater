import { useSelector } from "react-redux";
import "./Tooltip.css"
import { RootState } from "../../store";


function Tooltip() { 
    const streamerConfig = useSelector((state: RootState) => state.twitch.streamerConfig)
    const currentCount = useSelector((state: RootState) => state.event.currentCount)
    return (
        <>
            <p className="tooltip">Votes required: {currentCount}/{streamerConfig.vote_threshold}</p>
        </>
    );
}

export default Tooltip;
