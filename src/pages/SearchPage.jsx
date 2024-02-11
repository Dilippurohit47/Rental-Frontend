import React, { useEffect, useState } from 'react'
import "../styles/triplist.scss"
import Loader from '../components/loader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from "../redux/userReducer";
import ListingCard from '../components/ListingCard';

const SearchPage = () => {

const dispatch = useDispatch();

const [loading,setloading] = useState(true);
    const {search} =useParams();
    const listings = useSelector((state) =>state.listings)
console.log("search",search)
    const getSearchListing = async(req,res) =>{
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/properties/search/${search}`,{
                method: "GET",
            })

            const data  = await response.json()
            console.log("data from search",data)
               dispatch(setListings({listings:data})) 
               setloading(false)

        } catch (error) {
            console.log("fetch search list failed",error.message)
        }
    }


    useEffect(() =>{
        getSearchListing()
    },[search])

    return loading ? <Loader/> : (
        <>
    
          <h1 className="title-list">{search}</h1>
          <div className="list">


            {listings.length === 0 ? <p className='title-list'>Sorry! No properties with this name available.</p> :   listings?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )}
          </div>
       
        </>
      );
}

export default SearchPage
