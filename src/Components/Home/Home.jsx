import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import "./Home.css";
import Ape from "../../assets/bored-ape.png";
import { motion } from "framer-motion";
import axios from "axios";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 5000);
  });

  useEffect(() => {
    axios.get("https://www.boredapi.com/api/activity").then((response) => {
      console.log(response.data);
      setActivity(response.data);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <motion.div
          animate={{ y: 10 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="welcome w-1/2 m-auto p-20 mt-20 rounded-lg"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-6xl font-bold mr-5">BORED?</h1>
            <HashLoader
              className="ml-5 text-center items-center justify-center"
              size={50}
              color="white"
            />
          </div>
          <img
            className="md:w-1/2 mx-auto animate-pulse duration-1000"
            src={Ape}
            alt=""
          />
        </motion.div>
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
