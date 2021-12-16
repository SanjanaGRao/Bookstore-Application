import React, { useEffect, useState } from "react";
import "../styles/appbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { setSearchedBooks } from "../reduxActions/actionsOnBooks";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../reduxActions/actionsOnBooks";

export default function Appbar() {
  const [search, setSearch] = useState("");
  const myBooks = useSelector((state) => state.allBooks.books);
  const cart = useSelector((state) => state.allBooks.cartContents);
  const dispatch = useDispatch();

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    dispatch(setCurrentPage(1));
  };

  const backToDashboard = () => {
    window.location = "/dashboard";
  };

  useEffect(() => {
    console.log();
    dispatch(
      setSearchedBooks(
        myBooks.filter((item) => {
          return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
    );
    // eslint-disable-next-line
  }, [search, myBooks]);

  const handleClickIcon = () => {
    window.location = "/cart";
  };
  console.log(cart);
  return (
    <nav>
      <div className="navWide">
        <div className="wideDiv">
          <div className="heading-icon">
            <div className="heading" onClick={backToDashboard}>
              Bookstore
            </div>
          </div>

          <div className="search-bar">
            <TextField
              placeholder="Search…"
              id="search-bar"
              variant="outlined"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ margin: "0px 25% 0px 5%" }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon id="search-icon" />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { height: "40px", backgroundColor: "white" },
              }}
            />
          </div>
          <div className="rightIcons" align="right">
            <IconButton
              style={{ color: "white", padding: "0" }}
              onClick={() => {
                handleClickIcon();
              }}
            >
              <div>
                <ShoppingCartOutlinedIcon />
                {cart &&
                Object.keys(cart).length !== 0 &&
                cart.items.length > 0 ? (
                  <span className="cart-count">{cart.items.length}</span>
                ) : (
                  ""
                )}
              </div>
            </IconButton>
          </div>
          <div className="cart">Cart</div>
        </div>
      </div>
    </nav>
  );
}
