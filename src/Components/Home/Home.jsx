import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import "./Home.css";
import Ape from "../../assets/bored-ape.png";
import { motion } from "framer-motion";
import axios from "axios";
import Modal from "react-modal";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 5000);
  });

  useEffect(() => {
    axios
      .get("https://www.boredapi.com/api/activity")
      .then((response) => {
        console.log(response.data);
        setActivity(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextActivity = () => {
    axios.get("https://www.boredapi.com/api/activity").then((response) => {
      console.log(response.data);
      setActivity(response.data);
    });
  };
  const customStyles = {
    content: {
      backgroundImage: "linear-gradient(#6E7582 1%, #BB8082)",
      width: "50%",
      height: "50%",
      margin: "auto",
    },
  };
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
      <div className="home">
        <motion.div
          animate={{ y: 200 }}
          initial="hidden"
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <h2 className="text-2xl md:text-7xl font-bold text-slate-800">
            Generate an activity
          </h2>
          <button
            className="btn px-6 py-3 mt-3 rounded-md text-white  active:text-slate-500 hover:text-slate-400"
            onClick={openModal}
          >
            Click Here
          </button>
        </motion.div>

        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex items-center mb-7">
            <p className="text-xs text-slate-300">#{activity.key}</p>
            <svg
              onClick={closeModal}
              className="w-8 h-10 ml-auto"
              fill="white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-center">
            <h4 className="text-4xl text-white text-center">
              "{activity.activity}"
            </h4>
            <div className="text-slate-300 text-sm mt-3">
              <p>{activity.type}</p>
              <p>Participants: {activity.participants}</p>
              <p>${activity.price}</p>
            </div>
            <div className="flex items-center justify-center">
            {
              activity.link ?
              <a href={activity.link} target="_blank" rel="noreferrer">
                <button className="new-btn px-6 py-3 mt-3 mr-2 rounded-md text-white  active:text-slate-500 hover:text-slate-400">
                  Have a look
                </button>
              </a>
              :
              null
            }
              
              <button onClick={nextActivity} className="look-btn px-6 py-3 mt-3 ml-2 rounded-md text-white  active:text-slate-500 hover:text-slate-400">
                New Activity
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};

export default Home;
