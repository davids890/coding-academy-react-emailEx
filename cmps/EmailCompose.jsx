    import { useState, useEffect } from "react";
    import { useNavigate, useSearchParams, useParams} from "react-router-dom";
    import { useRef } from "react";
    import { debounce, useSaveToDraft } from "../src/services/util.service";
  


    export function EmailCompose( {onExitCompose, onEmailCompose, onUpdateEmail} ) {
        const [ formData, setFormData ] = useState({'To': '', 'Subject': '', 'Content': ''})
        const [ viewState, setViewState ] = useState('normal')
        const OnSaveDraft = useSaveToDraft(formData, SaveToDraft)
        
        const [searchParams] = useSearchParams();
        const emailId = searchParams.get("emailId"); // Extract emailId from query string
        const compose = searchParams.get("compose"); // Extract compose from query string
        console.log("emailId: ", emailId);
        console.log("compose: ", compose);


        // Log the updated formData after it changes
        useEffect(() => {
        }, [formData, viewState]); // The effect runs when formData changes

        useEffect(() => {
            console.log('emailId:', emailId, 'compose:', compose);
        }, [emailId, compose]);
    
        // // Trigger save draft when formData changes
        // useEffect(() => {
        //     console.log('before OnSaveDraft');
        //     OnSaveDraft();
        //     console.log('after OnSaveDraft');
        // }, [formData]);


        function onSubmitHandler(event) {
            event.preventDefault()
            console.log('submit: ', formData);
            onEmailCompose(formData);
        }

        function handleInputChange(ev) {
            console.log('change...');
            const updatedFormData = { ...formData, [ev.target.name]: ev.target.value };
            setFormData(updatedFormData); // Update form data
            OnSaveDraft();

            // 1. change and see the delay, 2. after the delay  is dine save the email with draft + id
        }

        function SaveToDraft(){
            console.log("save draft...: ");
            onUpdateEmail(formData)
        }

        function OnsetViewState(in_) {
            setViewState(in_)
        }
        
        return (
            <div>
                <form className={`compose-form ${viewState}`} onSubmit={onSubmitHandler}>
                    <div className="header">
                        <span className="msg-text">New message</span>
                        <div className="controls"> 
                            <button type="button" className="normal-button" onClick={() => OnsetViewState('normal')} >normal</button>
                            <button type="button" className="min-button" onClick={() => OnsetViewState('min')} >minimize</button>
                            <button type="button" className="big-button" onClick={() => OnsetViewState('big')} >expand</button>
                            <button type="button" className="x-button" onClick={(e) => {e.preventDefault(); onExitCompose()}} >X</button>
                        </div>
                    </div>
                    
                    {viewState !=='min' && <input className="to" type="email" name="To" placeholder="To..." value={formData.To} onChange={(e) => {handleInputChange(e)}}/>}

                    {viewState !=='min' && <input className="subject" type="text" name="Subject" placeholder="Subject..." id="X" value={formData.Subject} onChange={(e) => {handleInputChange(e)}}/>}

                    {viewState !=='min' && <textarea className="content" name="Content" id="" placeholder="Type your content here..." value={formData.Content} onChange={(e) => {handleInputChange(e)}}></textarea>}

                    {viewState !=='min' && <div className="footer">
                        <button className="submit" type="Submit">Send</button>
                        <button className="delete" onClick={(e) => {e.preventDefault(); onExitCompose()}}>Discard Draft</button>
                    </div>}
                </form>
            </div>
        )
    }



    //TODO: 1. send an email and see it in sent + sent email to me and see it in  inbox
    //TODO: 2. implement  debounce - after 3  seconds save the email in draft + implement edits

    //TODO: On add Mail
// draft - save all the time the incoming changes, then implement the debounce and save as draft
// from the draft if the emails opens - use EmailEdit compoenent (using the email id) (anew email as no id)
// 