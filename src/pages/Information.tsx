import React, { useEffect, useState } from "react";
import classes from "./Information.module.css";
import ImageModal from "../UI/ImageModal";

const Information = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage("");
        setImageDescription("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, imageDescription]);

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src="garden-1.jpg"
          alt="Stage 1 of development"
          className={classes.image}
          onClick={() => {
            setSelectedImage("garden-1.jpg");
            setImageDescription("Prior to development being approved");
          }}
        />
        <img
          src="garden-2.JPG"
          alt="Stage 2 of development"
          className={classes.image}
          onClick={() => {
            setSelectedImage("garden-2.JPG");
            setImageDescription(
              "Huge areas of woodland demolished to provide space for development"
            );
          }}
        />

        <img
          src="garden-3.jpg"
          alt="Stage 3 of development"
          className={classes.image}
          onClick={() => {
            setSelectedImage("garden-3.jpg");
            setImageDescription("New development overlooking property");
          }}
        />
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          closeModal={() => setSelectedImage("")}
          imageDescription={imageDescription}
        />
      )}
      <div className={classes.infoContainer}>
        <h2>About Us</h2>
        <p>
          We have created this subscription service to ensure that our local
          residents never miss out on objecting to an upcoming development. Our
          goal is to bring locals together and use our power in numbers to stop
          developers from urbanising our green garden land.
        </p>
        <p>
          Simply sign up with your email address to receive updates as soon as
          they’ve been announced.
        </p>
        <h2>Contact Us</h2>
        <p>Email: nork.first@outlook.com</p>
      </div>
    </div>
  );
};

export default Information;
