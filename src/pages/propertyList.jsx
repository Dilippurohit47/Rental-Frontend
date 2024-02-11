
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/userReducer"
import Loader from "../components/loader"
import "../styles/wishList.scss"
import { MdDelete } from "react-icons/md";
import OwnerList from "../components/ownerListing"

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  
  const propertyList = user?.propertyList;
  console.log(user)

  const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/users/${user._id}/properties`, {
        method: "GET"
      })
      const data = await response.json()
      console.log("data",data)
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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
            <OwnerList
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
};

export default PropertyList;