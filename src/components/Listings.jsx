import React, { useEffect, useState } from "react";
import "../styles/Listings.scss";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/userReducer";

const Listings = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const listings = useSelector((state) => state.listings.listings);

  const [selectedCategory, setselectedCategory] = useState("All");

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${process.env.REACT_APP_BACKEND_SERVER}/properties?category=${selectedCategory}`
          : `${process.env.REACT_APP_BACKEND_SERVER}/properties`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("fetch listing failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);


  return (
    <>
      <div className="category-list">
        {categories?.map((item, index) => (
          <div
            className={`category ${
              selectedCategory === item.label ? "selected" : ""
            }`}
            key={index}
            onClick={() => setselectedCategory(item.label)}
          >
            <div className="category_icon">{item.icon}</div>
            <div>{item.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="listings">
            { listings.length === 0 ?  <p className='title-list'> sorry! No properties in {selectedCategory} category available</p> : listings?.map(
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
                booking=false}
              ) => (
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
      )}
    </>
  );
};

export default Listings;
