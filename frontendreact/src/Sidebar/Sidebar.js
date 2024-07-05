import Price from "./Price/Price";
import "./Sidebar.css";
import Sites from "./Sites/Sites";
import Demand from "./Demand/Demand";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
         <h1>Filters</h1>
        </div>
        <div className="solid-line"></div>
        <Sites handleChange={handleChange} />
        <div className="solid-line2"></div>
        <Price handleChange={handleChange} />
        <div className="solid-line2"></div>
        <Demand handleChange={handleChange} />
        <div className="solid-line2"></div>
      </section>
    </>
  );
};

export default Sidebar;
