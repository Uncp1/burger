import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../../api/api'

export const fetchIngredients = createAsyncThunk('fetchIngredients', async() => {
  try {
    const responce = await api.getIngredients();
    return responce.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
})

const ingredientSlice = createSlice({
  name: 'ingredientSlice',
  initialState: {
    ingredients :[],
    loading: false, 
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(state.error);
      })
  }
})

export default ingredientSlice.reducer;

