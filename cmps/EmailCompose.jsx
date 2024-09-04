import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams, } from "react-router-dom";


export function EmailCompose( {onExitCompose} ) {
    console.log('compose in');
    const [ formData, setForm ] = useState({'To': 'To...', 'Subject': 'Subject...', 'Content': 'Content...'})
    
    // Log the updated formData after it changes
    useEffect(() => {
    }, [formData]); // The effect runs when formData changes

    function onSubmitHandler(event) {
        event.preventDefault();
        const data = {'To': event.target.To.value, 'Subject': event.target.Subject.value, 'Content': event.target.Content.value, }
        setForm(data)
    }
    
    return (
        <div className="compose">
            <form onSubmit={onSubmitHandler}>
                <div className="header">New message</div>
                <div className="to-cell">
                    <input type="text" name="To" placeholder="To..." />
                </div>

                <div className="subject-cell">
                    <input type="text" name="Subject" placeholder="Subject..."/>
                </div>

                <div className="content-cell">
                    <input type="text" name="Content" placeholder="Content..."/>
                </div>

                <div className="submit-cell">
                <button type="Submit">Submit</button>
                <button onClick={(e) => {e.preventDefault(); onExitCompose()}} >X</button>
                </div>
            </form>
        </div>

    )
}

// onClick={(e) => { e.preventDefault(); e.stopPropagation(); onStarMark(email.id); }} 