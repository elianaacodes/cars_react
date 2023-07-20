import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        vin: "VIN",
        make: "Make",
        model: "Model",
        year: "Year",
        color: "Color"
    },
    reducers: {
        chooseVIN: (state, action) => { state.vin = action.payload }, 
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseColor: (state, action) => { state.color = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseVIN, chooseMake, chooseModel, chooseYear, chooseColor  } = rootSlice.actions