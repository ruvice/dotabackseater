import "./ItemList.css"
import { useMemo } from 'react';
import { Item } from '../../../models/item';
import ItemCard from './ItemCard'
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// Define the type of the data being fetched
function ItemList() {
  const query = useSelector((state: RootState) => state.search.query);
  const loading = useSelector((state: RootState) => state.item.loading)
  const itemsArr = useSelector((state: RootState) => state.item.itemsArr)
  const items = useMemo(() => { 
    // Your logic for generating items
    return itemsArr.map((item: Item) => {
      if (query === "" || item.name.toLowerCase().includes(query.toLowerCase())) {
          return <ItemCard key={item.id} item={item} />
      }
    });
  }, [itemsArr, query]); // Re-runs when `someDependency` changes

  return (
    <div className="item-list-container flex flex-col overflow-y-auto h-[200px] mt-3 custom-scrollbar">
        {loading ? <p>Loading...</p> : items}
    </div>
  );
}

export default ItemList;
