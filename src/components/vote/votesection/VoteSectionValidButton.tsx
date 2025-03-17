import "./VoteSection.css"
import { VoteModel } from '../../../models/models';
import LazyImage from "../voteMenu/LazyImage";
import { AppDispatch, RootState, castItemVote, castHeroVote, AppMode  } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

type VoteSectionValidProps = {
    voteSelection: VoteModel
}

function VoteSectionValidButton(props: VoteSectionValidProps) {
    const { voteSelection } = props;
    const countdown = useSelector((state: RootState) => state.vote.countdown);
    const curMode = useSelector((state: RootState) => state.app.mode);
    const dispatch = useDispatch<AppDispatch>()
    const handleVote = async () => {
        if (curMode === AppMode.Hero) {
            dispatch(castHeroVote())
        } else {
            dispatch(castItemVote())
        }
    }
    // Local state to track whether the countdown has passed
    const [isCooldown, setIsCooldown] = useState(countdown > Date.now());

    // Re-evaluate `isCooldown` periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setIsCooldown(countdown > Date.now() && curMode === AppMode.Item);
            if (countdown < Date.now()) {
                clearInterval(interval)
            }
        }, 500); // Check every 500ms
        
        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [countdown, curMode]);
    return (
        <>
            <div className={isCooldown ? "tinted-container" : ""}>
                {isCooldown && <div className="overlay"></div>}
                <div
                    className={`valid-button ${
                    isCooldown ? "vote-sectionCooldown" : "vote-sectionValid"
                    } flex flex-row p-2 align-middle`}
                    onClick={handleVote}
                >
                    <div className="valid-button-cell valid-button-image">
                        <LazyImage imageName={voteSelection.image_name} height={31.5} width={42.5} />
                    </div>
                    <p className="valid-button-cell valid-button-text text-dota-text-white font-semibold">Vote {voteSelection.display_name}</p>
                </div>
            </div>
        </>
    );
}

export default VoteSectionValidButton;
