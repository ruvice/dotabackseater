import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from "../models/models"

export type HeroMap = {
    [key: string]: Hero
}

export type FetchHeroResult = {
    heroes: HeroMap
    heroesArr: Hero[]
}

export interface HeroState {
    loading: boolean
    heroesArr: Hero[]
    heroes: HeroMap
}
  
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
    const response = await fetch(apiURL + "hero");
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