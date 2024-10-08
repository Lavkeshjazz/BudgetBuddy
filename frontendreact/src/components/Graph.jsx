import React, { useState, useEffect} from 'react';
import Chart from 'react-apexcharts';

const Graph = (props) => {
  let ProductURL = props.productURL;
  const url=props.url;
  if(ProductURL===undefined){
    ProductURL=url;
  }
  console.log(ProductURL)
  const [GraphData, setGraphData] = useState([]);
  const fetchdata = async () => {
    const data = await fetch("http://localhost:5000/getcurItem", {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ProductURL,
      })
    });
    console.log(data)
    const datajson = await data.json();
    console.log(datajson)
    setGraphData(datajson.priceHistory);
  };
  useEffect(() => {
    fetchdata();
    if (GraphData.length !== 0) {
      console.log(GraphData);
      setGraphData(GraphData);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <div className='graph'>
        <Chart
          type="line"
          width={600}
          height={400}
          series=
          {[
            {
              name: "Price",
              data: GraphData.map((data) => data.price)
            },
          ]}
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: GraphData.map((data) => new Date(data.date).toLocaleDateString())
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}
export default Graph;