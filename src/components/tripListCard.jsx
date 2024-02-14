import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteTripLlist, setwishList } from "../redux/userReducer";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { setTripList } from '../redux/userReducer';

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  bookingId,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setcurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setcurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  //   const navigate = useNavigate()
  const goToNextSlide = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch()
  const id = bookingId;
  const deleteList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/bookings/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (data?.success === true) {
      toast.success("Booking cancel!");
      dispatch(setDeleteTripLlist(id))
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div
              key={index}
              className="slide"
              onClick={() => navigate(`/properties/${listingId}`)}
            >
              <img src={photo} alt={`photo ${index + 1}`} />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <MdArrowBackIosNew style={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <MdArrowForwardIos style={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city} ,{province} ,{country}
      </h3>
      <p>{category}</p>
      <p>{type}</p>
      <p>
        {" "}
        <span>${price} per night</span>
      </p>

      <button
        className="favorite"
        disabled={!user}
        onClick={(e) => {
          e.stopPropagation();
          deleteList();
        }}
      >
        <MdDelete style={{ color: "white" }} />
      </button>
    </div>
  );
};

export default ListingCard;
