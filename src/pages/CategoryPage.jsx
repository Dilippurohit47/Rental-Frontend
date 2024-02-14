import React, { useEffect, useState } from 'react'
import "../styles/triplist.scss"
import Loader from '../components/loader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from "../redux/userReducer";
import ListingCard from '../components/ListingCard';


const CategoryPage = () => {

    const [loading ,setloading] =useState(true)

        const {category}= useParams();
        const listings = useSelector((state) => state.listings.listings);
const dispatch = useDispatch()

        const getFeedListings = async () => {
            try {
              const response = await fetch(
                  `${process.env.REACT_APP_BACKEND_SERVER}/properties?category=${category}`,
                {
                  method: "GET",
                }
              );
        
              const data = await response.json();

              dispatch(setListings({ listings: data }));
              setloading(false);
            } catch (error) {
              console.log("fetch listing failed", error.message);
            }
          };


useEffect(() =>{
    getFeedListings()
},[category])

  return loading ? <Loader/> : <>
  
  <h1 className="title-list">{category} </h1>
      <div className="list">





        { listings.length === 0 ?  <p className='title-list'> sorry! No properties available</p> :  
        
          listings?.map(
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



        )   }
      </div>
  </>
}


export default CategoryPage
