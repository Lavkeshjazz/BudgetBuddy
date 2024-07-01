import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Graph from "./Graph";
import { useLocation, Link } from "react-router-dom";

const Display = () => {
  const location = useLocation();
  const productdata = location.state;
  const { img, title, newPrice, expectedPrice, productURL } = productdata;
  return (
    <div className="bg-blue-100 w-full flex items-center justify-center p-6">
      <div className="w-full  h-fit  py-8  flex bg-primary rounded-xl overflow-hidden shadow-xl bg-white translate-y-10 m-16">
        {/* PRODUCT AREA */}
      <div className='w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
        
        
        <div className='flex flex-col gap-10'>
          <div className='magnifier bg-gray-400'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: `${img}`,
              },
              largeImage: {
                src: `${img}`,
                width: 1100,
                height: 750
              },
              shouldUsePositiveSpaceLens: true,
              isHintEnabled: true,
            }} />
          </div>
          <div className='bg-gray-100 rounded-xl p-3 shadow-xl shadow-gray-300 cursor-pointer'>
          <h2 className="border-gray-300 border-b w-fit">{title}</h2>
          <h3 className='text-green-500'>Current Price: ₹{newPrice}</h3>
          <h4 className="text-blue-500">Expected Price: ₹{expectedPrice}</h4>
          </div>
        </div>
      </div>


      {/* GRAPH PORTION */}
      <div className=' w-1/2 h-full lg:flex flex-col items-center justify-center object-fill gap-20 mx-10'>
           
            <div className="flex-1">
            <Graph productURL={productURL} />
            </div>
             <div className="flex-1">
            <Link to='/collections'><button className='gobackbtn'>Go Back</button></Link>
             </div>
          </div>
      
      </div>
    </div>
  );
};

export default Display;
