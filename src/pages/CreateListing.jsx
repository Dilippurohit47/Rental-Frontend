import React, { useState } from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/navbar";
import { categories, types, facilities } from "../data";
// import { Category } from '@mui/icons-material'
import { RemoveCircleOutline, AddCircleOutline, Bathroom } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { IoIosImages } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateListing = () => {
  const [photos, setphotos] = useState([]);

  const [category,setcategory] = useState("")

  const[type,settype]=useState("")


  // location func
  const [formLocation,setformLocation] = useState({
    streetAddress:"",
    aptSuite :"",
    city:"",
    province:"",
    country:"",

  })

  const handleChangeLoaction =(e) =>{
    const {name , value} =e.target
    setformLocation({
      ...formLocation,
      [name] : value
    })

  }


  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);


  /* AMENITIES */
  const [amenities, setAmenities] = useState([]); 

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };




  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setphotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setphotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setphotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };


   const [formDescription,setformDescription] = useState({
    title : "",
    description : "",
    highlight: "",
    highlightDesc: "",
    price:"",
   })

   const handleChangeDescription =(e)=>{
    const {name , value} = e.target
    setformDescription({
      ...formDescription,
      [name] :value,

    })
   }
   const navigate = useNavigate();


   const creatorId  = useSelector((state) =>state.user._id)

   const handlePost =async(e) =>{
    e.preventDefault();

    try {
      const listingForm = new FormData()
 
      listingForm.append("creator" , creatorId)
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);


      photos.forEach((photos) =>{
        listingForm.append("listingPhotos",photos)
      })

      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/properties/create`,{
        method:"POST",
        body:listingForm
      })

      const data = response;
      // console.log("data fromcreate " ,data)
      if(response.ok) {
        navigate("/")
        toast.success("Property created successfully")
      }
      else{
        toast.error("fill all fields")

      }
      
    } catch (error) {
      console.log("Publish listing failed",error.message)

    }

   }



  return (
    <>


      <div className="create-listing">
        <h1>Public Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about yourself</h2>
            <hr />
            <h3>Which of these categories best decide your place ?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div key={index} className={`category ${category === item.label ? "selected": ""}`} onClick={() =>setcategory(item.label)}>
                  <div className="category_icons">{item?.icon}</div>
                  <p>{item?.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guest have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div className={`type ${type === item.name ? "selected": ""}`} key={index} onClick={() =>settype(item.name)}>
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icons">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Wheres your place located</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="street Address"
                  name="streetAddress"
                  required
                  value={formLocation.streetAddress}
                  onChange={handleChangeLoaction}

                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment ,Suite,etc. (id applicable)</p>
                <input
                  type="text"
                  className=""
                  placeholder="Apartment ,Suite,etc. (id applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  required
                  onChange={handleChangeLoaction}

                />
              </div>

              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  className=""
                  placeholder="city"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLoaction}

                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  className=""
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLoaction}

                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  className=""
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLoaction}

                  required
                />
              </div>
            </div>

            <h3>share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                   onClick={() =>{guestCount > 1 && setGuestCount(guestCount - 1)}}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                       onClick={() =>{ setGuestCount(guestCount + 1)}}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                  onClick={() =>{bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                         onClick={() =>setBedroomCount(bedroomCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>{bedCount > 1 && setBedCount(bedCount - 1)}}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                   onClick={() =>{setBedCount(bedCount + 1)}}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                  onClick={() =>{bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
             
                  <AddCircleOutline
                       onClick={() =>setBathroomCount(bathroomCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell your guest What your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div className={`facility ${amenities.includes(item.name) ? "selected" : ""}`} key={index} onClick={() =>handleSelectAmenities(item.name)}>
                  <div className="facility_icon">{item?.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                required
                value={formDescription.title}
                onChange={(e) =>handleChangeDescription(e)}

              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                required
                value={formDescription.description}

                onChange={(e) =>handleChangeDescription(e)}


              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"l
                name="highlight"
                required
                onChange={(e) =>handleChangeDescription(e)}
                value={formDescription.highlight}


              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                required
                value={formDescription.highlightDesc}

                onChange={(e) =>handleChangeDescription(e)}



              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="price"
                required
                value={formDescription.price}

                onChange={handleChangeDescription}

              />
            </div>
          </div>

          <button className="submit_btn" type="submit" >
            CREATE YOUR LISTING
          </button>
        </form>
      </div>

    </>
  );
};

export default CreateListing;