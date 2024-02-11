import React, { useEffect, useState } from 'react'
import "../styles/triplist.scss"
import { useDispatch, useSelector } from 'react-redux';

import ListingCard from "../components/ListingCard"
import { setreservationList } from '../redux/userReducer';
import Loader from '../components/loader';

const ReservationList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const reservationList = useSelector((state) => state?.user?.reservationList);
    console.log(reservationList)



    const dispatch = useDispatch();
  
    const getreservationList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/users/${userId}/reservations`,
          {
            method: "GET",
          }
        );
  
        const data = await response.json();
        console.log("data",data)
        dispatch(setreservationList(data));
        setLoading(false);
      } catch (err) {
        console.log("Fetch getreservationList List failed!", err.message);
      }
    };
  
    useEffect(() => {
        getreservationList();
    }, []);
  
    return loading ? (
      <Loader />
    ) : (
      <>
        <h1 className="title-list">Your Reservation List</h1>
        <div className="list">
          {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
            <ListingCard
              listingId={listingId?._id}
              creator={hostId?._id}
              listingPhotoPaths={listingId?.listingPhotoPaths}
              city={listingId?.city}
              province={listingId?.province}
              country={listingId?.country}
              category={listingId?.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          ))}
        </div>

      </>
    );
  };
  
  export default ReservationList;