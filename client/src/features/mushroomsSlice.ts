import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addMushroom, getMushrooms, removeMushroom, updateMushroom } from './mushroomsAPI';

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed"
}

export enum Category {
  FUNGI = "fungi",
  GROW_KIT = "grow-kit"
}

export interface mushroomsProps {
  mushroom_id?: number;
  cat?: Category;
  image: string | null;
  name: string | null;
  price: number | null;
  description: string | null;
  user_id?: number | null;

}

interface MushroomsSliceProps {
  mushrooms: mushroomsProps[] | null;
  addProductData: any;
  productDataDetails: any;
  status: Status;
}

export const initialState: MushroomsSliceProps = {
  mushrooms: null,
  productDataDetails: '',
  addProductData: {
    cat: Category.FUNGI,
    image: null,
    name: null,
    price: null,
    description: null
  },
  status: Status.IDLE,
}

export const mushroomsSlice = createSlice({
  name: 'mushrooms',
  initialState,
  reducers: {
    setAddProductData: (state, action: PayloadAction<mushroomsProps>) => {
      state.addProductData = action.payload;
    },
    setProductDataDetails: (state, action: PayloadAction<any>) => {
      state.productDataDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get mushrooms list
      .addCase(getMushrooms.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getMushrooms.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const mushrooms = action.payload
        state.mushrooms = mushrooms
      })
      .addCase(getMushrooms.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })

      // Add product to a list
      .addCase(addMushroom.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(addMushroom.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        if(action.payload) {}
        const mushrooms = action.payload
        state.mushrooms = mushrooms
      })
      .addCase(addMushroom.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })

      // Update product list
      .addCase(updateMushroom.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateMushroom.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const mushrooms = action.payload
        state.mushrooms = mushrooms
      })
      .addCase(updateMushroom.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })

      // Delete product from a list
      .addCase(removeMushroom.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(removeMushroom.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const mushrooms = action.payload
        state.mushrooms = mushrooms
      })
      .addCase(removeMushroom.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
      })
  }
})
export const { setAddProductData, setProductDataDetails } = mushroomsSlice.actions;

export const addProductDataSelector = (state: RootState) => state.mushrooms.addProductData;
export const productDataDetailsSelector = (state:RootState) => state.mushrooms.productDataDetails;
export const mushroomSelector = (state: RootState) => state.mushrooms.mushrooms;
export const mushroomStatusSelector = (state: RootState) => state.mushrooms.status;

export default mushroomsSlice.reducer

