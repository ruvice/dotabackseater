import "./VoteSection.css"
import { Item } from '../../../models/item';
import LazyImage from "../item/LazyImage";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { castVote } from "../voteSlice";
import { useEffect, useState } from "react";

type VoteSectionValidProps = {
    item: Item
}

function VoteSectionValid(props: VoteSectionValidProps) {
    const { item } = props;
    const countdown = useSelector((state: RootState) => state.vote.countdown);
    const dispatch = useDispatch<AppDispatch>()
    const handleVote = async () => {
        dispatch(castVote())
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
                        <LazyImage itemName={item.item_name} height={21} width={28.3} />
                    </div>
                    <p className="text-dota-text-white pl-3 font-semibold self-center">Vote {item.name}</p>
                </div>
            </div>
        </>
    );
}

export default VoteSectionValid;
