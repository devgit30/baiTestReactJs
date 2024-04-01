import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
        meal: '',
        numberPeople: 0,
        restaurant: '',
        dish: '',
        numberServing: 0,
    }
  },
  reducers: {
    incremented: (state: any): any => {
     return {
        ...state.value
     }
    },
    decremented: state => {
      return {
        ...state
      }
    }
  }
})


export const { incremented, decremented } = counterSlice.actions as any
export const store = configureStore({
  reducer: counterSlice.reducer
})



// store.dispatch(incremented())
// store.dispatch(incremented())
// store.dispatch(decremented())   