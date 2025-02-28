import './VoteSelectionCard.css'
import { Hero, Item } from '../../../models/models';
import LazyImage from "./LazyImage";
import { AppDispatch } from '../../../store';
import { select } from '../voteSlice';
import { useDispatch } from 'react-redux';

// Define the type of the data being fetched
export type VoteSelectionCardProps = {
    id: string;
    display_name: string;
    image_name: string;
    voteModel: Item | Hero;
};

function VoteSelectionCard(props: VoteSelectionCardProps) {
    const { id, display_name, image_name, voteModel } = props
    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = (voteModel: Hero | Item) => {
        dispatch(select(voteModel))
    }
    return ( props ?
        <button className="btn-voteItem group" key={id} onClick={() => handleClick(voteModel)}>
            <div className="div-voteItem group flex flex-row pl-4 content-center">
                <LazyImage itemName={image_name} height={32} width={42}/>
                <p className="text-dota-text-white text-xs pl-2">{display_name}</p>
            </div>
        </button> : <div>Unknown item</div>
    );
}

export default VoteSelectionCard;
