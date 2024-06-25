import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div className="recommended">
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
