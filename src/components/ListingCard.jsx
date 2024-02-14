import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setwishList } from "../redux/userReducer";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

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
}) => {
  const navigate = useNavigate();
  const [currentIndex, setcurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setcurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // add to wishlist
  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const wishList = user?.wishList;

  const isLiked = wishList?.find((item) => item?._id === listingId);


  const patchWishList = async () => {
    if (user?._id === creator?._id) {
      toast.error("You can't add your own listing to your wishlist");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/users/${user?._id}/${listingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data" ,data)

    if (data?.wishList?.length === 0) {
      toast.error(data?.message); 

  dispatch(setwishList(null));


    } else {
      toast.success(data?.message);
    dispatch(setwishList(data?.wishList));
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
              <img
                src={photo}
                alt=""
              />
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
          patchWishList();
        }}
      >
 {isLiked ? (
          <>
           <FaHeart style={{ color: "red" }} />
          </>
        ) : (
          <>
            <FaHeart style={{ color: "white" }} />
          </>
        )}
      </button>
    </div>
  );
};

export default ListingCard;
