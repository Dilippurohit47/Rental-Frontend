import { createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    token:null,   
    listings: [], 
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setLogin:(state,action) =>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout :(state) =>{
            state.user=null
            state.token=null
        },
        setListings:(state,action) =>{
            state.listings = action.payload.listings
        },
        setTripList:(state,action) =>{
            state.user.triplist = action.payload
        },
        setwishList:(state,action) =>{
            state.user.wishList = action.payload
        },
        setPropertyList:(state,action) =>{
            state.user.propertyList = action.payload
        },
        setreservationList:(state,action) =>{
            state.user.reservationList = action.payload
        }
    }
})

export const {setLogin ,setLogout , setListings ,setTripList, setwishList,setPropertyList ,setreservationList} = userSlice.actions

export default  userSlice.reducer