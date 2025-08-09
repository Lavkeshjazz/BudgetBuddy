import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert";
import Navbar from "./Navbar";
import Swal from "sweetalert2";


const Searchitempage = () => {
  const token= localStorage.getItem('authToken');
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const params = useParams();
  const expectedPrice = params.expectedPrice;
  console.log(expectedPrice);
  // -----------------------------------------------------------------------
  const location = useLocation();
  const productdata = location.state;
  console.log(productdata);

  // -----------------------------------------------------------------------
  const AddFunction = async (e) => {
    setOpen(true);
    console.log("hehhehe");
    e.preventDefault();
    const { url } = productdata;
    const ProductURL = url;
    console.log(ProductURL);
    console.log(expectedPrice);
    const res = await fetch("http://localhost:5000/addUrlinDatabase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({
        ProductURL,
        expectedPrice,
      }),
    });
    console.log("ho gya add");
    if (res.ok) {
      setOpen(false);
      Swal.fire({
        title: "Item Added!",
        icon: "success",
        text: "Click OK to continue",
        confirmButtonText: "OK",
      }).then(() => {
        Navigate("/collections");
      });
    } else if (res.status === 400) {
      const data = await res.json();
      console.log(data);
      window.alert(data.error.message);
    }
  };
  // -----------------------------------------------------------------------
  const [user, setUser] = useState({
    P_URL: "",
    ePrice: null,
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const Itemdata = async (e) => {
    setOpen(true);
    e.preventDefault();

    const { P_URL, ePrice } = user;
    const ProductURL = P_URL;
    const expectedPrice = ePrice;

    // Get token from localStorage
   
    console.log("searchitepage toke=",token)
    if (!token) {
      swal("You must be logged in to search");
      setOpen(false);
      return;
    }

    console.log("Sending product details...");
    const res = await fetch("http://localhost:5000/searchproduct/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Now it's from localStorage
      },
      body: JSON.stringify({
        ProductURL,
        expectedPrice,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setOpen(false);
      swal("Item found!", "Click OK to continue", "success");
      Navigate(`/searchitempage/${expectedPrice}`, { state: data });
    } else if (res.status === 400) {
      setOpen(false);
      window.alert(data.error.message);
    }
  };

  // -----------------------------------------------------------------------
  return (
    <div>
      <Navbar name="login" id="loginbtn" />
      <div className="search">
        <div className="searchpage">
          <div className="searchanother">
            <input
              className="searchanotherinput"
              type="text"
              name="P_URL"
              id="P_URL"
              autoComplete="off"
              value={user.P_URL}
              onChange={handleInputs}
              placeholder="Paste Product Link"
            />
            <input
              className="searchanotherinput"
              type="text"
              name="ePrice"
              id="ePrice"
              autoComplete="off"
              value={user.ePrice}
              onChange={handleInputs}
              placeholder="Enter Expected Priadsasfsfbsfbsvfsdvceeefef"
            />
            <button
              type="search"
              className="searchanotherbtn"
              onClick={Itemdata}
            >
              Search
            </button>
          </div>
          <div className="searchitempage">
            <div className="imagesection">
              <div className="imgcontainer">
                <img
                  src={productdata.imageUrl}
                  alt={productdata.name}
                  className="searchimg"
                />
              </div>
              <button
                type="search"
                className="addtotrack"
                onClick={AddFunction}
              >
                ADD TO TRACK
              </button>
            </div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <div className="searchdetails">
              <h1 className="searchtitle">{productdata.name}</h1>
              <h1 className="currentpricetag">Current Price</h1>
              <h1 className="currentprice">₹ {productdata.price}</h1>
              <h1 className="expectedpricetag">Expected Price</h1>
              <h1 className="expectedprice">₹ {expectedPrice}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchitempage;
