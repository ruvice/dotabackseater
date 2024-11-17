import "./ItemList.css"
import { useEffect, useState, useMemo } from 'react';
import { Item } from '../../models/item';
import ItemCard from './ItemCard'
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Define the type of the data being fetched
function ItemList() {
  const [clientId, setClientId] = useState("")
  const [userId, setUserId] = useState("")
  const [token, setToken] = useState("")
  const [channelId, setChannelId] = useState("")
  const [itemsArr, setItemsArr] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const query = useSelector((state: RootState) => state.search.query);

  // Fetch data only once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/item");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: Item[] = await response.json();
        console.log(result)
        setItemsArr(result);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = useMemo(() => { 
    // Your logic for generating items
    return itemsArr.map((item: Item) => {
      if (query == "" || item.name.toLowerCase().includes(query.toLowerCase())) {
          return <ItemCard key={item.id} item={item} />
      }
    });
  }, [itemsArr, query]); // Re-runs when `someDependency` changes

  return (
    <div className="flex flex-col overflow-y-auto h-[320px] mt-3 custom-scrollbar">
        {items}
    </div>
  );
}

export default ItemList;
