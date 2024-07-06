import { useState, useEffect } from "react";
import { useUserContext } from "./userContex";
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "./Card";
import "../index.css";
import { NavLink } from 'react-router-dom';
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import Demand from "../Sidebar/Demand/Demand";

function Homepage() {
  // const userContext = useUserContext();
  // useEffect(() => {
  //   fetch('http://localhost:5000/authorized', {
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       userContext.login(userInfo.user_exist);
  //     })
  //   })
  //   // eslint-disable-next-line
  // }, []);
  // const username = userContext.user;
  // console.log("Username=");
  // console.log(userContext.user);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [products, setProducts] = useState([]);
  const [myproducts, setMyproducts] = useState([]);
  let traderAllProduct=true;
  const [userType, setUserType] = useState(true);
  const [tempproducts, setTempproducts]= useState([]); 
    

  useEffect(() => {
    const fetchdata = async () => {
      try{
      let temp;
      const data = await fetch("http://localhost:5000/getallproducts", {
        credentials: 'include',
      });
      temp = await data.json();
      console.log(temp.listAllItems);
      setEmail(temp.listTitle);
      setfirstName(temp.listName1);
      setlastName(temp.listName2);
      if (temp.checkUser === true) {
        setUserType(false);
        setProducts(Object.values(temp.listAllItems));
        setMyproducts(Object.values(temp.listItems));
      }
      else{
        setProducts(Object.values(temp.listItems));
        setUserType(true);
      }
      setLoading(false);
    } catch(error){
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

   // Add this useEffect to log the updated value of tempproducts
   useEffect(() => {
    console.log("Updated tempproducts:", tempproducts);
    
  }, [tempproducts]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  console.log("Setproduct=")
  console.log(products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    getProductsByDemand(event.target.value);
  };
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    getProductsByDemand(event.target.value);
  };

  const getProductsByDemand = async (sortBy) => {
    let url;
    let temp;
    try {
      console.log("demand=");
      console.log(sortBy);
      if (sortBy === "MtoL") {
        url = await fetch("http://localhost:5000/trader/products_by_demand", {
          credentials: 'include',
        });
        console.log("url product=");
        console.log(url);
        temp = await url.json();
      } else if (sortBy === "LtoM") {
        url = await fetch("http://localhost:5000/trader/products_by_demand_reverse",{
          credentials: 'include',
        });
        temp = await url.json();
      }
      setTempproducts(Object.values(temp));
      console.log("tempproducts=");
      console.log(tempproducts);
      return tempproducts.map(
        ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice, lowestprice, highestprice, averageprice }) => (
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
          />
        )
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    
  };


   const mapTempProductsToCards = () => {
    return tempproducts.map(
      ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice, lowestprice, highestprice, averageprice }) => (
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
        />
      )
    );
  };
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
        else {
          filteredProducts = filteredProducts.filter(
            ({ productURL }) => productURL.search(selected) === 12
          );
        }
      }
    }
    console.log(email)
    return filteredProducts.map(
      ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice, lowestprice, highestprice,averageprice}) => (
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
  else result = filteredData(products, selectedCategory, query);
  
  return (
    <>
       <div>
      <Navbar name="collection" id="loginbtn"/>
        <div className="homepage">
          <Sidebar handleChange={handleChange} userType={userType}/>
          <Navigation query={query} handleInputChange={handleInputChange} firstName={firstName} lastName={lastName} email={email} />
          <Recommended handleClick={handleClick} NumProds={myproducts.length} />
          <Products result={result} />
        </div>
        </div>
    </>
)
};
export default Homepage;
