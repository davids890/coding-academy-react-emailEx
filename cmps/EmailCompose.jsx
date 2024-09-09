import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useRef } from "react";
import { debounce, useSaveToDraft } from "../src/services/util.service";
import { emailService } from "../src/services/email.service";

export function EmailCompose({ onExitCompose, onEmailCompose, onUpdateEmail }) {
  const [viewState, setViewState] = useState("normal");
  const [searchParams] = useSearchParams();
  const compose = searchParams.get("compose"); // Extract compose from query string
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
      console.log("isDraftLoaded: ", isDraftLoaded);
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

//TODO: 1. send an email and see it in sent + sent email to me and see it in  inbox
//TODO: 2. implement  debounce - after 3  seconds save the email in draft + implement edits

//TODO: On add Mail
// draft - save all the time the incoming changes, then implement the debounce and save as draft
// from the draft if the emails opens - use EmailEdit compoenent (using the email id) (anew email as no id)
//

// 1. change and see the delay, 2. after the delay  is dine save the email with draft + id = useSaveToDraft(formData, SaveToDraft)

//     // Log the updated formData after it changes
//     useEffect(() => {
//         const emailId = searchParams.get("emailId");
//         console.log('emailId: ', emailId);
//         if (emailId) {
//             emailService.getById(emailId).then(data => {setFormData(data);})
//         }
//     }, []);

//     function onSubmitHandler(event) {
//         event.preventDefault()
//         console.log('submit: ', formData);
//         onEmailCompose(formData);
//     }

//     function handleInputChange(ev) {
//         console.log('change...');
//         const updatedFormData = { ...formData, [ev.target.name]: ev.target.value };
//         setFormData(updatedFormData); // Update form data
//         OnSaveDraft();
//     }

//     function SaveToDraft(){
//         console.log("save draft...: ");
//         onUpdateEmail(formData)
//     }

//     function OnsetViewState(in_) {
//         setViewState(in_)
//     }

//     return (

//         <div>
//             <form className={`compose-form ${viewState}`} onSubmit={onSubmitHandler}>
//                 <div className="header">
//                     <span className="msg-text">New message</span>
//                     <div className="controls">
//                         <button type="button" className="normal-button" onClick={() => OnsetViewState('normal')} >normal</button>
//                         <button type="button" className="min-button" onClick={() => OnsetViewState('min')} >minimize</button>
//                         <button type="button" className="big-button" onClick={() => OnsetViewState('big')} >expand</button>
//                         <button type="button" className="x-button" onClick={(e) => {e.preventDefault(); onExitCompose()}} >X</button>
//                     </div>
//                 </div>

//                 {viewState !=='min' && <input className="to" type="email" name="to" placeholder="to..." value={formData.to} onChange={(e) => {handleInputChange(e); e.preventDefault()}}/>}

//                 {viewState !=='min' && <input className="subject" type="text" name="subject" placeholder="subject..." id="X" value={formData.subject} onChange={(e) => {handleInputChange(e); e.preventDefault()}}/>}

//                 {viewState !=='min' && <textarea className="content" name="body" id="" placeholder="Type your content here..." value={formData.body} onChange={(e) => {handleInputChange(e); e.preventDefault()}}></textarea>}

//                 {viewState !=='min' && <div className="footer">
//                     <button className="submit" type="Submit">Send</button>
//                     <button className="delete" onClick={(e) => {e.preventDefault(); onExitCompose()}}>Discard Draft</button>
//                 </div>}
//             </form>
//         </div>
//     )
// }

// //TODO: 1. send an email and see it in sent + sent email to me and see it in  inbox
// //TODO: 2. implement  debounce - after 3  seconds save the email in draft + implement edits

// //TODO: On add Mail
// // draft - save all the time the incoming changes, then implement the debounce and save as draft
// // from the draft if the emails opens - use EmailEdit compoenent (using the email id) (anew email as no id)
// //

// // 1. change and see the delay, 2. after the delay  is dine save the email with draft + id
