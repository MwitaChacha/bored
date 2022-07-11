import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import "./Home.css";
import Ape from "../../assets/bored-ape.png"

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 500000);
  });

  if (loading) {
    return (
      <div>
        <div className="welcome w-1/2 m-auto p-20 mt-20 rounded-lg">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-6xl font-bold mr-5">BORED?</h1>
            <HashLoader
              className="ml-5 text-center items-center justify-center"
              size={50}
              color="white"
            />
          </div>
          <img className="md:w-1/2 mx-auto animate-pulse duration-1000" src={Ape} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>home</p>
      </div>
    );
  }
};

export default Home;
