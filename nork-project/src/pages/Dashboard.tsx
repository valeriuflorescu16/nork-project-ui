import React, { useState } from "react";
import classes from "./Dashboard.module.css";

interface Email {
  subject: string;
  body: string[];
  attachments: File[];
}

const Dashboard = () => {
  const [email, setEmail] = useState<Email>({
    subject: "",
    body: [""],
    attachments: [],
  });

  const handleParagraphChange = (index: number, value: string) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      body: [
        ...prevEmail.body.slice(0, index),
        value,
        ...prevEmail.body.slice(index + 1),
      ],
    }));
  };

  const addParagraph = () => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      body: [...prevEmail.body, ""],
    }));
  };

  const removeParagraph = (index: number) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      body: prevEmail.body.filter((_, i) => i !== index),
    }));
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const attachments = Array.from(files);
    setEmail((prevEmail) => ({ ...prevEmail, attachments }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate form here
  };

  const renderParagraphs = () => {
    return email.body.map((paragraph, index) => {
      return (
        <div className={classes.paragraphContainer}>
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
          />
          {email.body.length > 1 && (
            <button
              type="button"
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
    <form onSubmit={handleSubmit}>
      <h1 className={classes.formHeader}>Email builder</h1>
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
      <button
        type="button"
        className={classes.addButton}
        onClick={addParagraph}
      >
        Add new paragraph
      </button>
      <br />
      <label htmlFor="attachments">
        Attachments:{" "}
        <input
          type="file"
          id="attachments"
          className={classes.attachments}
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </label>
      <button type="submit" className={classes.submitButton}>
        Send Email
      </button>
    </form>
  );
};

export default Dashboard;
