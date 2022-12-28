import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addCartOrders, getPaidOrders, removeOrders } from './ordersAPI';

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed"
}

// ------  Interface   Section  ------ //
export interface OrderServerSideProps {
  order_id?: number;
  order_date?: string;
  user_id?: number;
  mushroom_id: number;
  quantity: number;
  status?: string;
}

export interface orderClientSideProps {
  mushroom_id?: number ;
  quantity?: number ;
}

interface OrdersSliceProps {
  orders: OrderServerSideProps[] | null;
  orderClientSide: orderClientSideProps[];
  itemQuantity: number;
  status: Status
}
// ------ Interface Section END ------ //


export const initialState: OrdersSliceProps = {
  orders: null,
  status: Status.IDLE,
  orderClientSide: [],
  itemQuantity: 0,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {

    incrPrdctClientSide: (state: OrdersSliceProps, action: PayloadAction<number>) => {
      if (state.orderClientSide?.find((item:orderClientSideProps) => item.mushroom_id === action.payload) == null) {
        state.orderClientSide = [...state.orderClientSide, { mushroom_id: action.payload, quantity: 1 }]

      } else {
        const newArr = state.orderClientSide.map((item: any) => {
          if (item.mushroom_id === action.payload) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
        state.orderClientSide = newArr
      }
    },

    decrPrdctClientSide: (state: OrdersSliceProps, action: PayloadAction<number>) => {
      const updatedOrderClientSide = state.orderClientSide?.map((item: any) => {
        if (item.mushroom_id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      const filteredOrderClientSide = updatedOrderClientSide?.filter((item: any) => item.quantity > 0);
      const newState = Object.assign({}, state, { orderClientSide: filteredOrderClientSide });
      console.log(newState)
      return newState;
    },

    removePrd: (state:any, action: PayloadAction<number>) => {
      if(state.orderClientSide?.find((item:orderClientSideProps) => item.mushroom_id === action.payload)) {
         const newArr = state.orderClientSide?.filter((item:orderClientSideProps) => item.mushroom_id !== action.payload)
        state.orderClientSide = newArr
        }      
    },

    removeAllPrds: (state:any, action: PayloadAction) => {
      state.orderClientSide = []
    }
  },

  extraReducers: (builder) => {
    builder
      // Getting orders for user from useEffect Cart page
      .addCase(getPaidOrders.pending, (state: any) => {
        state.status = Status.LOADING;
      })
      .addCase(getPaidOrders.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const ordersServerSide = action.payload;
        state.orders = ordersServerSide;
      })
      .addCase(getPaidOrders.rejected, (state: any) => {
        state.status = Status.FAILED;
      })

      // Adding orders from cart by user
      .addCase(addCartOrders.pending, (state: any) => {
        state.status = Status.LOADING;
      })
      .addCase(addCartOrders.fulfilled, (state: any, action: PayloadAction) => {
        state.status = Status.IDLE;
        const ordersServerSide = action.payload;
        state.orders = ordersServerSide;
      })
      .addCase(addCartOrders.rejected, (state: any) => {
        state.status = Status.FAILED;
      })

      // Reset orders state
      .addCase(removeOrders.fulfilled, (state:any, action: PayloadAction<any>) => {
        const resetOrders = action.payload;
        state.orders = resetOrders;      
      })
  }
})

export const { incrPrdctClientSide, decrPrdctClientSide, removePrd, removeAllPrds } = ordersSlice.actions;

export const paidOrdersSelector = (state: RootState) => state.orders.orders;
export const paidOrdersStatus = (state: RootState) => state.orders.status;

// export const orderStatusSelector = (state: RootState) => state.orders.status;
export const orderQuantitySelector = (state: RootState)=> state.orders.itemQuantity

export const ordersClientSideSelector = (state: RootState) => state.orders.orderClientSide;


export default ordersSlice.reducer

