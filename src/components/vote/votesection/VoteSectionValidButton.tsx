import "./VoteSection.css"
import { VoteModel } from '../../../models/models';
import LazyImage from "../voteMenu/LazyImage";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { castItemVote, castHeroVote } from "../voteSlice";
import { useEffect, useState } from "react";
import { AppMode } from "../../../appSlice";

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
            setIsCooldown(countdown > Date.now());
            if (countdown < Date.now()) {
                clearInterval(interval)
            }
        }, 500); // Check every 500ms
        
        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [countdown]);
    return (
        <>
            <div className={isCooldown ? "tinted-container" : ""}>
                {isCooldown && <div className="overlay"></div>}
                <div
                    className={`${
                    isCooldown ? "vote-sectionCooldown" : "vote-sectionValid"
                    } flex flex-row p-2 align-middle`}
                    onClick={handleVote}
                >
                    <div className="h-[21] align-center ml-4">
                        <LazyImage imageName={voteSelection.image_name} height={21} width={28.3} />
                    </div>
                    <p className="text-dota-text-white pl-3 font-semibold self-center">Vote {voteSelection.display_name}</p>
                </div>
            </div>
        </>
    );
}

export default VoteSectionValidButton;
