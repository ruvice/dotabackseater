import { useSelector } from "react-redux";
import "./Tooltip.css"
import { RootState } from "../../store";


function Tooltip() { 
    const streamerConfig = useSelector((state: RootState) => state.twitch.streamerConfig);
    return (
        <>
            <p className="tooltip">{streamerConfig.vote_threshold} votes required</p>
        </>
    );
}

export default Tooltip;
