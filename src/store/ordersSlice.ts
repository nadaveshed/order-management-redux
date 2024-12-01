// src/store/ordersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/order';

interface OrdersState {
    orders: Order[];
    selectedOrder: Order | null;
    loading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    selectedOrder: null,
    loading: false,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await fetch('/orders.json');
    const data = await response.json();
    return data;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        selectOrder: (state: OrdersState, action: PayloadAction<number>) => {
            state.selectedOrder =
                state.orders.find((order: Order) => order.id === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { selectOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
