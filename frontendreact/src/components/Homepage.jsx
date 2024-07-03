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
  useEffect(() => {
    const fetchdata = async () => {
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
        setProducts(Object.values(temp.listAllItems));
        setMyproducts(Object.values(temp.listItems));
      }
      else setProducts(Object.values(temp.listItems));
      setLoading(false);
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
      ({ imageUrl, name, prevPrice, price, site, productURL, expectedPrice}) => (
        <Card
          key={Math.random()}
          img={imageUrl}
          title={name}
          prevPrice={prevPrice}
          newPrice={price}
          site={site}
          expectedPrice={expectedPrice}
          productURL={productURL}
          email={email}
        />
      )
    );
  }
  if (loading) {
    return (
      <div className="loader-container">
        <Navbar name="login" id="loginbtn"/>
        <div className="loader"></div>
      </div>
    )
  }
  let result = null;
  if (selectedCategory === "MyProds") {
    console.log(myproducts);
    result = filteredData(myproducts, selectedCategory, query);
  }
  else result = filteredData(products, selectedCategory, query);
  if(email){
  return (
       <div>
      <Navbar name="collection" id="loginbtn"/>
        <div className="homepage">
          <Sidebar handleChange={handleChange} />
          <Navigation query={query} handleInputChange={handleInputChange} firstName={firstName} lastName={lastName} email={email} />
          <Recommended handleClick={handleClick} NumProds={myproducts.length} />
          <Products result={result} />
        </div>
        </div>
    )}
    else{
      return (
        <div className="loginfirst">
          <h1>Please Login First</h1>
          <NavLink to='http://localhost:3000/login'><button className='landingbtn'>Log In</button></NavLink>
        </div>
      )
      }
}
export default Homepage;

