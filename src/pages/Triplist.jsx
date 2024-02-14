import React, { useEffect, useState } from 'react'
import "../styles/triplist.scss"
import { useDispatch, useSelector } from 'react-redux';

import ListingCard from "../components/ListingCard"
import { setTripList } from '../redux/userReducer';
import Loader from '../components/loader';
import OwnerList from "../components/ownerListing"
import TriplistCard from "../components/tripListCard"

const TripList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const triplist = useSelector((state) => state?.user?.tripList?.trips);
    

    const dispatch = useDispatch();
  
    const getTripList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/users/${userId}/trips`,
          {
            method: "GET",
          }
        );
  
        const data = await response.json();
        dispatch(setTripList(data));
        setLoading(false);
      } catch (err) {
        console.log("Fetch Trip List failed!", err.message);
      }
    };
  
    useEffect(() => {
      getTripList();
    }, []);


  
    return loading ? (
      <Loader />
    ) : (
      <>
        <h1 className="title-list">Your Trip List</h1>
        {
         !triplist || triplist.length === 0 ?  <p className='emptydiv'> currently Triplist is empty ! </p> : <>
          
          <div className="list">
          {triplist?.map(({ _id, listingId, hostId, customerId, startDate,totalPrice, endDate, booking=true }) => (
            <TriplistCard
              listingId={listingId?._id}
              creator={hostId?._id}
              listingPhotoPaths={listingId?.listingPhotoPaths}
              city={listingId?.city}
              province={listingId?.province}
              country={listingId?.country}
              category={listingId?.category}
              startDate={startDate}
              endDate={endDate}
              price={listingId?.price}
              booking={booking}
              bookingId= {_id}
            />
          ))}
        </div>
           </>
        }
     

      </>
    );
  };
  
  export default TripList;