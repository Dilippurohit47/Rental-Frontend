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
            state.user.tripList = action.payload
        },
        setDeleteTripLlist :(state,action) =>{
            const bookingId= action.payload;
            const removeTrip = state?.user?.tripList?.trips?.findIndex?.((item) => item._id === bookingId);

            console.log("remove",removeTrip)
            
            if(removeTrip !== -1) {
                state?.user?.tripList?.trips?.splice?.(removeTrip,1);
                console.log("booking removed from redux")
            }
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

export const {setLogin ,setLogout ,setDeleteTripLlist, setListings ,setTripList, setwishList,setPropertyList ,setreservationList} = userSlice.actions

export default  userSlice.reducer