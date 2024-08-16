import { useState, useEffect } from "react";
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "./Card";
import "../index.css";
import Navbar from "./Navbar";
import Swal from "sweetalert2";



function Homepage() {
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [products, setProducts] = useState([]);
  const [myproducts, setMyproducts] = useState([]);
  const [userType, setUserType] = useState(true);
  const [tempproducts, setTempproducts] = useState([]);
  const [tempproducts2, setTempproducts2] = useState([]);
  let traderAllProduct = true;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let temp;
        const data = await fetch("https://budgetbuddy-1-s4a6.onrender.com/getallproducts", {
          credentials: 'include',
        });
        temp = await data.json();
        setEmail(temp.listTitle);
        setfirstName(temp.listName1);
        setlastName(temp.listName2);
        if (temp.checkUser === true) {
          setUserType(false);
          setProducts(Object.values(temp.listAllItems));
          setMyproducts(Object.values(temp.listItems));
        }
        else {
          setProducts(Object.values(temp.listItems));
          setUserType(true);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.code,
          text: error.message,
          confirmButtonText: "Try Again",
        });
      }
    };
    fetchdata();
    // eslint-disable-next-line
  }, []);
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const getProductsByDemand = async () => {
      try {
        const response = await fetch("https://budgetbuddy-1-s4a6.onrender.com/trader/products_by_demand", {credentials: 'include'});
        console.log("url product=");
        const temp = await response.json();
        console.log(temp);
        setTempproducts(Object.values(temp));
      }
      catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsByDemand();
  }, []);

  useEffect(() => {
    const getProductsByDemand2 = async () => {
      try {
        const response = await fetch("https://budgetbuddy-1-s4a6.onrender.com/trader/products_by_demand_least", {credentials: 'include'});
        console.log("url product=");
        const temp = await response.json();
        console.log(temp);
        setTempproducts2(Object.values(temp));
      }
      catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsByDemand2();
  }, []);

  function filteredData(products, selected, query) {
    let filteredProducts = products;
    if (selected) {
      console.log(selected);
      console.log(filteredProducts)
      if (selected !== "MyProds") {
        if (selected === "LtoH") {
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        }
        else if (selected === "HtoL") {
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }
        else if (selected !== "MtoL" && selected !== "LtoM") {
          filteredProducts = filteredProducts.filter(({ productURL }) => {
            console.log(`Selected: ${selected}, ProductURL: ${productURL}`);
            return productURL && productURL.includes(selected);
          });
        }
      }
    }
    // console.log(email)
    return filteredProducts.map(
      ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice, lowestprice, highestprice, averageprice, url }) => (
        <Card
          key={Math.random()}
          img={imageUrl}
          title={name}
          prevPrice={prevPrice}
          newPrice={price}
          site={site}
          expectedPrice={expectedPrice}
          lowestprice={lowestprice}
          averageprice={averageprice}
          highestprice={highestprice}
          productURL={productURL}
          email={email}
          traderAllProduct={traderAllProduct}
          userType={userType}
          url={url}
        />
      )
    );
  }
  let result = null;
  if (selectedCategory === "MyProds") {
    traderAllProduct = false;
    console.log(myproducts);
    result = filteredData(myproducts, selectedCategory, query);
  }
  else if (selectedCategory === "MtoL") result = filteredData(tempproducts, selectedCategory, query);
  else if (selectedCategory === "LtoM") result = filteredData(tempproducts2, selectedCategory, query);
  else result = filteredData(products, selectedCategory, query);

  return (
    <>
      <div>
        <Navbar name="collection" id="loginbtn" />
        <div className="homepage">
          <Sidebar handleChange={handleChange} userType={userType} />
          <Navigation query={query} handleInputChange={handleInputChange} firstName={firstName} lastName={lastName} email={email} />
          <Recommended handleClick={handleClick} NumProds={myproducts.length} />
          <Products result={result} />
        </div>
      </div>
    </>
  )
};
export default Homepage;
