import React, { useState } from "react";

import classes from "./Home.module.css";
import SubscribeModal from "../UI/SubscribeModal";
import Subscribe from "./Subscribe";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const getSubscribed = (v: boolean) => {
    setSubscribed(v);
  };

  return (
    <>
      {subscribed ? (
        <Subscribe />
      ) : (
        <div className={classes.homeContainer}>
          <div className={classes.homeCard}>
            <h1 className={classes.homeTitle}>Welcome to RADAR</h1>
            <p className={classes.homeInfo}>
              A community-based digital alert system notifying Nork residents to
              new development in your area. The council's current approach to
              paper distribution of notifications to new development is too
              narrow, and therefore, undemocratic. The wider the warning the
              higher number of residents have the opportunity to comment and log
              their objections without missing vital deadlines. Don't let new
              development take you by surprise and overshadow your and your
              neighbor's family homes and gardens!
            </p>
            <button
              className={classes.homeButton}
              onClick={() => setShowModal(true)}
            >
              Sign up now
            </button>
          </div>
          <SubscribeModal
            showModal={showModal}
            onCloseModal={onCloseModal}
            subscribed={getSubscribed}
          />
        </div>
      )}
    </>
  );
};

export default Home;
