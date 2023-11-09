import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types
interface Character {
  name: string;
  height: string;
  gender: string;
}

interface InitialState {
  data: Character[];
  isLoading: boolean;
  error: null | string;
  speciesData: object;
}

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
  speciesData: {},
};

export const fetchCharacterData = createAsyncThunk('characters/fetchData', async (pageNumber) => {
  try {
    let url = `https://swapi.dev/api/people/?page=${pageNumber}`;
    console.log(url)
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
});
export const fetchSpeciesData = createAsyncThunk(
    'characters/fetchSpeciesData',
    async (speciesURL:string, characterURL) => {
      const response = await fetch(speciesURL);
      const data = await response.json();
      return { speciesURL, data };
    }
);
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setData: (state: InitialState, action) => {
      state.data = action.payload;
    },
    setError: (state: InitialState, action) => {
      state.error = action.payload;
    },
    setLoading: (state: InitialState, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCharacterData.pending, (state: InitialState) => {
          state.isLoading = true;
        })
        .addCase(fetchCharacterData.fulfilled, (state: any, action) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchSpeciesData.fulfilled, (state, action) => {
        const { speciesURL, data } = action.payload;
         // @ts-ignore
          state.speciesData[speciesURL] = data;
            })
        .addCase(fetchCharacterData.rejected, (state: any, action: any) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
  },
});

export default characterSlice.reducer;