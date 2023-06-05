import React, { FC } from "react";
import classes from "./ConfirmationModal.module.css";

const ConfirmationModal: FC<{
  onCancel: () => void;
  onConfirm: () => void;
  confirmationMessage: string;
  isOpen: boolean;
}> = ({ onCancel, onConfirm, confirmationMessage, isOpen }) => {
  return (
    <div className={isOpen ? classes.modalBackdrop : classes.hidden}>
      <div className={classes.modal}>
        <h2>Confirmation</h2>
        <p>{confirmationMessage}</p>
        <div className={classes.buttonContainer}>
          <button onClick={onCancel} className={classes.cancelButton}>Cancel</button>
          <button onClick={onConfirm} className={classes.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
