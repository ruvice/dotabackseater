import "./VoteSelectionSection.css"
import { useSelector } from 'react-redux';
import VoteSelectionList from "../vote/voteMenu/VoteSelectionList";
import Search from "../search/Search";

function VoteSelectionSection() {
    return (
        <div className='item-section-container flex flex-col mt-2'>
            <Search />
            <VoteSelectionList />
        </div>
    );
}

export default VoteSelectionSection;
