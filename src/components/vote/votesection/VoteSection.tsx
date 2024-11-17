import "./VoteSection.css"
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import VoteSectionValid from "./VoteSectionValid";
import VoteSectionInvalid from "./VoteSectionInvalid";

function VoteSection() {
    const selectedItem = useSelector((state: RootState) => state.vote.selectedItem);

    return (
        <div className='flex flex-row'>
            <div className="w-full">
                {selectedItem ? <VoteSectionValid item={selectedItem} /> : <VoteSectionInvalid />}
            </div>
        </div>
    );
}

export default VoteSection;
