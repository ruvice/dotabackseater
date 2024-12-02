import "./VoteSection.css"
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import VoteSectionValid from "./VoteSectionValid";
import VoteSectionInvalid from "./VoteSectionInvalid";
import CountdownBar from "./CountdownBar";

function VoteSection() {
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem);
    return (
        <div className='flex flex-col'>
            <div className="w-full">
                {selectedItem ? <VoteSectionValid item={selectedItem} /> : <VoteSectionInvalid />}
            </div>
            <CountdownBar />
        </div>
    );
}

export default VoteSection;
