import Price from "./Price/Price";
import "./Sidebar.css";
import Sites from "./Sites/Sites";
const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          {/* <h1>🛒</h1> */}
          MENU
        </div>
        <Sites handleChange={handleChange} />
        <Price handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
