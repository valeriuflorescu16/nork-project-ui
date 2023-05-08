import React, { FC } from "react";

import classes from "./ImageModal.module.css";

const ImageModal: FC<{
  image: string;
  imageDescription: string;
  closeModal: () => void;
}> = (props) => {
  return (
    <div className={classes.modal} onClick={props.closeModal}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={props.image}
          alt="Selected Garden"
          className={classes.modalImage}
        />
        <p className={classes.modalDescription}>{props.imageDescription}</p>
        <button onClick={props.closeModal} className={classes.closeModalButton}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
