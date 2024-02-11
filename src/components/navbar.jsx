import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/userReducer"

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  // console.log("navbar",user)

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <a href="/">
        {/* <img src="/assets/logo.png" alt="logo" /> */}
        LOGO
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="ex: windmills,beachfront"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={!search}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {
              navigate(`/properties/search/${search}`);
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (

            <img
            src={user?.profileImagepath}
            alt="profile photo"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />

          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login" onClick={() =>setDropdownMenu(false)}>Log In</Link>
            <Link to="/register" onClick={() =>setDropdownMenu(false)}>Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}  onClick={() => setDropdownMenu(false)}  >Trip List</Link>
            <Link to={`/${user._id}/wishList`} onClick={() => setDropdownMenu(false)}>Wish List</Link>
            <Link to={`/${user._id}/properties`} onClick={() => setDropdownMenu(false)}>Property List</Link>
            {/* <Link to={`/${user._id}/reservations`} onClick={() => setDropdownMenu(false)}>Reservation List</Link> */}
            <Link to="/create-listing" onClick={() => setDropdownMenu(false)}>Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                 setDropdownMenu(false);
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
