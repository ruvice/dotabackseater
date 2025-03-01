import './VoteSelectionCard.css'
import { Hero, Item, VoteModel } from '../../../models/models';
import LazyImage from "./LazyImage";
import { AppDispatch } from '../../../store';
import { select } from '../voteSlice';
import { useDispatch } from 'react-redux';

// Define the type of the data being fetched
export type VoteSelectionCardProps = {
    voteCardModel: VoteModel
};

function VoteSelectionCard(props: VoteSelectionCardProps) {
    const { voteCardModel } = props
    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = (voteModel: Hero | Item) => {
        dispatch(select(voteModel))
    }
    return ( props ?
        <button className="btn-voteItem group" key={voteCardModel.id} onClick={() => handleClick(voteCardModel.voteModel)}>
            <div className="div-voteItem group flex flex-row pl-4 content-center">
                <LazyImage imageName={voteCardModel.image_name} height={32} width={42}/>
                <p className="text-dota-text-white text-xs pl-2">{voteCardModel.display_name}</p>
            </div>
        </button> : <div>Unknown item</div>
    );
}

export default VoteSelectionCard;
