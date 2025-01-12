import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchItemResult, ItemMap, ItemState } from './itemTypes';
import { Item } from '../../../models/item';

const initialState: ItemState = {
  loading: true,
  itemsArr: [],
  items: {}
}

export const getItems = createAsyncThunk('getItems', async (_, { getState, rejectWithValue }) => {
  const apiURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URI
      : process.env.REACT_APP_API_DEV;
  const response = await fetch(apiURL + "item");
  if (!response.ok) { 
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const itemsArr: Item[] = await response.json();
  const items = getItemsFromArr(itemsArr)
  const result: FetchItemResult = {
    items: items,
    itemsArr: itemsArr
  }
  return result
});

const getItemsFromArr = (itemsArr: Item[]) => {
  const itemsMap = itemsArr.reduce((map: ItemMap, item) => {
    map[item.id] = item;
    return map;
  }, {});
  return itemsMap
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.fulfilled, (state, action: PayloadAction<FetchItemResult>) => {
        state.loading = false
        state.itemsArr = action.payload.itemsArr
        state.items = action.payload.items
      })
  },
});

export const { } = itemSlice.actions;
export default itemSlice.reducer;