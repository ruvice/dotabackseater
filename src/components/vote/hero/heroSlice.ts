import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchHeroResult, HeroMap, HeroState } from './heroTypes';
import { Hero } from '../../../models/models';

const initialState: HeroState = {
  loading: true,
  heroesArr: [],
  heroes: {}
}

export const getHeroes = createAsyncThunk('getHeroes', async (_, { getState, rejectWithValue }) => {
    const apiURL =
        process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    // TODO: Rename this
    const response = await fetch(apiURL + "item");
    if (!response.ok) { 
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const heroesArr: Hero[] = await response.json();
    const heroes = getHeroesFromArr(heroesArr)
    const result: FetchHeroResult = {
        heroes: heroes,
        heroesArr: heroesArr
    }
    return result
});

const getHeroesFromArr = (heroesArr: Hero[]) => {
  const heroesMap = heroesArr.reduce((map: HeroMap, hero) => {
    map[hero.id] = hero;
    return map;
  }, {});
  return heroesMap
}

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.fulfilled, (state, action: PayloadAction<FetchHeroResult>) => {
        state.loading = false
        state.heroesArr = action.payload.heroesArr
        state.heroes = action.payload.heroes
      })
  },
});

export const { } = heroSlice.actions;
export default heroSlice.reducer;