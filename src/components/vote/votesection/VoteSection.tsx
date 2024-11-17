import "./VoteSection.css"
import { RootState, AppDispatch } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
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
