import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useSaveToDraft } from "../src/services/util.service";
import { emailService } from "../src/services/email.service";

export function EmailCompose({ onExitCompose, onEmailCompose, onUpdateEmail }) {
  const [viewState, setViewState] = useState("normal");
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ to: "", subject: "", body: "" });
  const OnSaveDraft = useSaveToDraft(formData, SaveToDraft);
  const isDraftLoaded = useRef(false); // Flag to track whether the draft is loaded

  // Log the updated formData after it changes
  useEffect(() => {
    const emailId = searchParams.get("emailId");
    console.log("emailId: ", emailId);
    if (emailId) {
      emailService.getById(emailId).then((data) => {
        setFormData(data);
        isDraftLoaded.current = true;
      });
    }
  }, []);

  function onSubmitHandler(event) {
    event.preventDefault();
    console.log("submit: ", formData);
    onEmailCompose(formData);
  }

  function handleInputChange(ev) {
    console.log("change...");
    const updatedFormData = { ...formData, [ev.target.name]: ev.target.value };
    setFormData(updatedFormData); // Update form data
    OnSaveDraft();
  }

  function SaveToDraft() {
    if (
      formData.to.length > 0 ||
      formData.subject.length > 0 ||
      formData.body.length > 0
    ) {
      console.log("save draft...: ");
      console.log("SaveToDraft formData: ", formData);
      onUpdateEmail(formData);
    }
  }

  function OnsetViewState(in_) {
    setViewState(in_);
  }

  return (
    <div>
      <form className={`compose-form ${viewState}`} onSubmit={onSubmitHandler}>
        <div className="header">
          <span className="msg-text">New message</span>
          <div className="controls">
            <button
              type="button"
              className="normal-button"
              onClick={() => OnsetViewState("normal")}
            >
              normal
            </button>
            <button
              type="button"
              className="min-button"
              onClick={() => OnsetViewState("min")}
            >
              minimize
            </button>
            <button
              type="button"
              className="big-button"
              onClick={() => OnsetViewState("big")}
            >
              expand
            </button>
            <button
              type="button"
              className="x-button"
              onClick={(e) => {
                e.preventDefault();
                onExitCompose();
              }}
            >
              X
            </button>
          </div>
        </div>

        {viewState !== "min" && (
          <input
            className="to"
            type="email"
            name="to"
            placeholder="to..."
            value={formData.to}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          />
        )}

        {viewState !== "min" && (
          <input
            className="subject"
            type="text"
            name="subject"
            placeholder="subject..."
            id="X"
            value={formData.subject}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          />
        )}

        {viewState !== "min" && (
          <textarea
            className="content"
            name="body"
            id=""
            placeholder="Type your content here..."
            value={formData.body}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          ></textarea>
        )}

        {viewState !== "min" && (
          <div className="footer">
            <button className="submit" type="Submit">
              Send
            </button>
            <button
              className="delete"
              onClick={(e) => {
                e.preventDefault();
                onExitCompose();
              }}
            >
              Discard Draft
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
