import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";

import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";

import Loader from "../components/loader";
import toast from "react-hot-toast";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();

  const [listingNested, setlisting] = useState(null);

  const getListingDetails = async (req, res) => {
    try {
      const respose = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await respose.json();
      setlisting(data);
      setLoading(false);
    } catch (error) {
      console.log("fetch listing data failed ", error.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // booking calndrr
  const [dateRange, sedateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    sedateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);

  // calculate difference of dates
  const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const listing = listingNested?.listing;

  const customerId = useSelector((state) => state.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing?.creator?._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing?.price * dayCount,
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      console.log("booking button working");
      if (response.ok) {
        toast.success("booking successfull")
        navigate(`/${customerId}/trips`);
      }
    } catch (error) {
      console.log("submit booking failed", error.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="listing-details">
        <div className="title">
          <h1>{listing?.title} </h1>
          <div></div>
        </div>
        <div className="photos">
          {listing?.listingPhotoPaths?.map((item) => (
            <img
              src={item}
              alt="Images"
            />
          ))}
        </div>
        <h2>
          {listing?.type} in {listing?.city} , {listing?.province} ,
          {listing?.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom -{" "}
          {listing.bedCount} bed - {listing.bathroomCount} bathroom{" "}
        </p>
        <hr />

        <div className="profile">
          <img
            src={listing?.creator?.profileImagepath}
          />

          <h3>
            Hosted by {listing?.creator?.firstName} {listing.creator?.lastName}
          </h3>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>

        <hr />
        <div className="booking">
          <div>
            <h2>What this place offer</h2>
            <div className="amenities">
              {listing?.amenities?.[0]?.split(",").map((item, index) => (
                <div key={index} className="facility">
                  <div className="facility_icon">
                    {facilities?.find((facility) => facility.name === item)
                      ?.icon ?? <span>No icon found</span>}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <>
                  <h2>
                    ${listing?.price}x {dayCount} nights
                  </h2>
                </>
              ) : (
                <>
                  <h2>
                    ${listing?.price}x {dayCount} night
                  </h2>
                </>
              )}
              <h2>Total Price : ${listing?.price * dayCount}</h2>
              <p>Start Date : {dateRange[0].startDate.toDateString()}</p>
              <p>End Date : {dateRange[0].endDate.toDateString()}</p>

              <button type="submit" className="button" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
