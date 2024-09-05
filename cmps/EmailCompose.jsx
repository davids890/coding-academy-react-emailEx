import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams, } from "react-router-dom";


export function EmailCompose( {onExitCompose} ) {
    console.log('compose in');
    const [ formData, setFormData ] = useState({'To': 'To...', 'Subject': 'Subject...', 'Content': 'Content...'})
    const [ viewState, setViewState ] = useState('normal')
    
    // SetwindowViewState
    // Log the updated formData after it changes
    useEffect(() => {
    }, [formData, viewState]); // The effect runs when formData changes

    function onSubmitHandler(event) {
        const { To, Subject, Content } = event.target;
        // console.log('onSubmitHandler');
        // event.preventDefault()
        // const data = {'To': event.target.to.value, 'Subject': event.target.subject.value, 'Content': event.target.content.value}
        // setForm(data)

        //TODO: On add Mail
        // draft - save all the time the incoming changes, then implement the debounce and save as draft
        // from the draft if the emails opens - use EmailEdit compoenent (using the email id) (anew email as no id)
        // 
    }

    function handleInputChange(ev) {
        setFormData({...formData, [ev.target.name]: ev.target.value})
    }

    function SetwindowViewState(viewStatus){
        switch (viewStatus) {
            case 'normal':
                return normal
        }
    }
    function OnsetViewState(in_) {
        setViewState(in_)
    }
    
    return (
        <div>
            <form className={`compose-form ${viewState}`} onSubmit={onSubmitHandler}>
                <div className="header">
                    <span className="msg-text">New message</span>
                    <button className="view-big" onClick={() => OnsetViewState('big')} >big view</button>
                </div>
                
                <input className="to" type="email" name="To" placeholder="To..." value={formData.To} onChange={handleInputChange}/>

                <input className="subject" type="text" name="Subject" placeholder="Subject..." id="X" value={formData.Subject} onChange={handleInputChange}/>

                <textarea className="content" name="Content" id="" placeholder="Type your content here..." value={formData.Content} onChange={handleInputChange}></textarea>

                <div className="footer">
                    <button className="submit" type="Submit">Send</button>
                    <button className="delete" onClick={(e) => {e.preventDefault(); onExitCompose()}}>Discard Draft</button>
                </div>
            </form>
        </div>
    )
}
