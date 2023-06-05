import React, { useRef, useState } from "react";
import classes from "./Dashboard.module.css";
import { getAttachments } from "../utils";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../recoil/atoms/loginAtom";
import ConfirmationModal from "../UI/ConfirmationModal";

const url = process.env.REACT_APP_URL;

interface Email {
  subject: string;
  message: string[];
  attachments: File[];
}

const Dashboard = () => {
  const attachmentsRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<Email>({
    subject: "",
    message: [""],
    attachments: [],
  });
  const [err, setErr] = useState<string>("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const token = useRecoilValue(loginAtom);

  const handleParagraphChange = (index: number, value: string) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      message: [
        ...prevEmail.message.slice(0, index),
        value,
        ...prevEmail.message.slice(index + 1),
      ],
    }));
  };

  const addParagraph = () => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      message: [...prevEmail.message, ""],
    }));
  };

  const removeParagraph = (index: number) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      message: prevEmail.message.filter((_, i) => i !== index),
    }));
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const attachments = Array.from(files);
    setEmail((prevEmail) => ({ ...prevEmail, attachments }));
  };

  const handleSendEmail = () => {
    if (!email.subject) {
      setErr("The subject field cannot be empty.");
      return;
    }

    for (let i = 0; i < email.message.length; i++) {
      if (!email.message[i]) {
        setErr(
          "A paragraph has been left empty. Either remove it or add text to it to proceed."
        );
        return;
      }
    }

    setErr("");
    setIsConfirmationOpen(true);
  };

  const handleSubmit = async () => {
    const attachments = await getAttachments(email.attachments);

    try {
      const response = await fetch(`${url}/emails/custom`, {
        method: "POST",
        body: JSON.stringify({
          subject: email.subject,
          message: email.message,
          attachments: attachments,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEmail({
          subject: "",
          message: [""],
          attachments: [],
        });
        if (attachmentsRef.current) attachmentsRef.current.value = "";
        setErr("");
        setIsConfirmationOpen(false);
      } else if (!response.ok) {
        setIsConfirmationOpen(false);
        throw new Error("Error with response");
      }
    } catch (err) {
      setErr("Something went wrong. Please try again...");
    }
  };

  const renderParagraphs = () => {
    return email.message.map((paragraph, index) => {
      return (
        <div key={index} className={classes.paragraphContainer}>
          <textarea
            key={index}
            className={classes.paragraph}
            value={paragraph}
            onChange={(event) =>
              handleParagraphChange(index, event.target.value)
            }
            onInput={(event) => {
              event.currentTarget.style.height = "auto";
              event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
            }}
            required
          />
          {email.message.length > 1 && (
            <button
              className={classes.removeButton}
              onClick={() => removeParagraph(index)}
            >
              Remove paragraph
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div>
        <h1 className={classes.formHeader}>RADAR Email builder</h1>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          value={email.subject}
          className={classes.smallText}
          onChange={(event) =>
            setEmail((prevEmail) => ({
              ...prevEmail,
              subject: event.target.value,
            }))
          }
          required
        />
        <label htmlFor="paragraphs">Paragraphs</label>
        {renderParagraphs()}
        <button className={classes.addButton} onClick={addParagraph}>
          Add new paragraph
        </button>
        <br />
        <label htmlFor="attachments">
          Attachments:
          <input
            type="file"
            id="attachments"
            className={classes.attachments}
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            ref={attachmentsRef}
          />
        </label>
        <button className={classes.submitButton} onClick={handleSendEmail}>
          Send Email
        </button>
        {err && <p className={classes.error}>{err}</p>}
      </div>
      <ConfirmationModal
        onCancel={() => setIsConfirmationOpen(false)}
        onConfirm={handleSubmit}
        isOpen={isConfirmationOpen}
        confirmationMessage="Your email is ready to be sent to the mailing list. If you wish to proceed, click the confirm button below. If you wish to make any further adjustments to the email, you can click the cancel button."
      />
    </>
  );
};

export default Dashboard;
