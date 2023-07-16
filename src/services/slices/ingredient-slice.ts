import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TIngredientType } from "../../utils/types";
import { getIngredients } from "../api/api";

export type IngredientsState = {
  ingredients: TIngredientType[];
  loading: boolean;
  failed: boolean;
};

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  failed: false,
};

export const fetchIngredients = createAsyncThunk(
  "fetchIngredients",
  async () => {
    try {
      const responce = await getIngredients();
      return responce.data;
    } catch (err) {
      console.log(err);
      //return err.message;
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredientSlice",
  initialState: initialState,
  reducers: {},
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
        state.failed = true;
        console.log(action.error.message);
      });
  },
});

export default ingredientSlice.reducer;
