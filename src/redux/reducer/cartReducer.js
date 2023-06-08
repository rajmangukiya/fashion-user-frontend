import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        add(state, action) {
            let reduxItem = [{
                item: action.payload,
                quantity: 1
            }]
            state.cartItems = [
                ...(state.cartItems.map(cartItem => {
                    if(cartItem.item._id == reduxItem[0].item._id) {
                        reduxItem = []
                        return {
                            item: cartItem.item,
                            quantity: cartItem.quantity + 1
                        }
                    }
                    return cartItem
                })),
                ...reduxItem
            ]
        },
        remove(state, action) {
            state.filter(item => item.id !== action.payload)
        }
    }
})

export const {add, remove, saveToLocal} = cartSlice.actions; 
export default cartSlice.reducer;