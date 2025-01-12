import "./ItemSection.css"
import { useSelector } from 'react-redux';
import ItemList from "../vote/item/ItemList";
import Search from "../search/Search";

function ItemSection() {
    return (
        <div className='item-section-container flex flex-col mt-2'>
            <Search />
            <ItemList />
        </div>
    );
}

export default ItemSection;
