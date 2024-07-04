
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";

const Card = ({ img, title, star, reviews, newPrice, site, expectedPrice, productURL ,email, lowestprice, averageprice, highestprice}) => {
  const data = {
    img, title, newPrice, expectedPrice, productURL,email, lowestprice,averageprice,highestprice
  }
  const Navigate = useNavigate();
  const sendtodisplay = () => {
    Navigate('/display', { state: data });
  }

  // --------------------------------------------------------------
  const del_function = async (e) => {
    e.preventDefault();
    const deleteItemId=productURL;
    console.log("Deleting item...");
    const res = await fetch('http://localhost:5000/delete', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteItemId,
        email
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      swal("Item Deleted","Refresh page to see changes", "success");
      console.log('data to deleted successfully');
      console.log(data.message);
    }
    else if (res.status === 400) {
      console.log(data);
      window.alert(data.error.message);
    }
  };
  // --------------------------------------------------------------
  return (
    <div>
      <section className="card">
        <img src={img} alt={title} className="card-img" onClick={sendtodisplay}/>
        <div className="card-details">
          <h3 className="card-title" onClick={sendtodisplay}>{title}</h3>
          <section className="card-reviews">
            {Array.from({ length: 4 }, () => <AiFillStar className="rating-star" />)}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              ₹{newPrice}
            </div>
            <div className="bag" role="img" alt="Delete">
              {site}
              <MdDelete className="trashicon" onClick={del_function}/>
              <h6 className="hovertext">Remove</h6>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Card;
