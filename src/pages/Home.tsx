import React, { useEffect, useState } from "react";

import classes from "./Home.module.css";
import SubscribeModal from "../UI/SubscribeModal";
import Subscribe from "./Subscribe";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

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
              Residents Against Development Alert Response (RADAR) is a
              community-based service used to notify Nork residents about
              upcoming developments. By signing up to our subscription service,
              you will be informed of all the upcoming developments in Nork and
              how many days you will have to send an objection. Our alert system
              is designed so that you won’t miss vital deadlines, and can feel
              more in control of our family homes and green spaces.
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
