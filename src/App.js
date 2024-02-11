import React from 'react'
import './App.css'
import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import HomePage from "./pages/Homepage"
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'

import Navbar from './components/navbar'
import Footer from "./components/Footer"
import TripList from './pages/Triplist'
import WishList from './pages/WishList'
import PropertyList from './pages/propertyList'
import ReservationList from './pages/ReservationList'
import CategoryPage from './pages/CategoryPage'
import SearchPage from './pages/SearchPage'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <div>
  
<BrowserRouter>
<Navbar/>
<Routes>
<Route path='/' element={<HomePage/>} />
<Route path='/register' element={<Registerpage/>} />
<Route path='/login' element={<Loginpage/>} />
<Route path='/create-listing' element={<CreateListing/>} />
<Route path='/properties/:listingId' element={<ListingDetails/>} />
<Route path='/properties/category/:category' element={<CategoryPage/>} />
<Route path='/properties/search/:search' element={<SearchPage/>} />
<Route path='/:userId/trips' element={<TripList/>} />
<Route path='/:userId/wishList' element={<WishList/>} />
<Route path='/:userId/properties' element={<PropertyList/>} />
<Route path='/:userId/reservations' element={<ReservationList/>} />

</Routes>
<Footer/>
<Toaster position='bottom-center'/>
</BrowserRouter>


    </div>
  )
}

export default App
