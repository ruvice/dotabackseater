import { useEffect, useState, useMemo } from 'react';
import { Item } from './models/item';
import ItemList from './components/ItemList'

// Define the type of the data being fetched
type ItemDetail = {
  name: string;
  item_name: string;
  cost: number;
};


function App() {

  return (
    <div className="bg-dota-dark-tile-background max-h-[496px] h-[496px] w-[318px] max-w-[318px] p-3 overflow-hidden">
        <h1 className="text-dota-text-white text-2xl font-bold justify-self-center">
            Suggest an item
        </h1>
        <ItemList />
    </div>
  );
}

export default App;
