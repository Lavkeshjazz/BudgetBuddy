import { useState, useEffect } from "react";
import { useUserContext } from "./userContex";
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "./Card";
import "../index.css";
import { NavLink } from 'react-router-dom';
// import products from "../db/data";

function Homepage() {
  const userContext = useUserContext();
  let order = "";
  useEffect(() => {
    fetch('http://localhost:5000/authorized', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        userContext.login(userInfo);
      })
    })
    // eslint-disable-next-line
  }, []);
  const username = userContext.user;
  console.log(userContext.user);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      let temp;
      const data = await fetch("http://localhost:5000/getallproducts", {
        credentials: 'include',
      });
      temp = await data.json();
      console.log(temp);
      console.log(temp.listTitle);
      setEmail(temp.listTitle);
      setProducts(Object.values(temp.listItems));
      console.log(temp);
    };
    fetchdata();
    // eslint-disable-next-line
  }, []);
  console.log(products)
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
    return filteredProducts.map(
      ({ imageUrl, name, star, reviews, prevPrice, price, site, productURL, expectedPrice }) => (
        <Card
          key={Math.random()}
          img={imageUrl}
          title={name}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={price}
          site={site}
          expectedPrice={expectedPrice}
          productURL={productURL}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);
  console.log(order)
  return (
    <>
      {!username &&
        <div className="loginfirst">
          <h1>Please Login First</h1>
          <NavLink to='http://localhost:3000/login'><button className='landingbtn'>Log In</button></NavLink>
        </div>
      }
      {username &&
        <div className="homepage">
          <Sidebar handleChange={handleChange} />
          <Navigation query={query} handleInputChange={handleInputChange} email={email} />
          <Recommended handleClick={handleClick} />
          <Products result={result} />
        </div>
      }
    </>
  );
}
export default Homepage;

