import { EmailPreview } from "./EmailPreview"
import { Link } from "react-router-dom";
import { useState } from "react";


export function EmailList({emailList, onEmailDelete}) {
    const [clickedEmailId, setClickedEmailId] = useState(null);

    function onDeleteEmail(id) {
        // Notify parent about the change in filter
        onEmailDelete({id});
    }
    function onEmailClicked(id) {
        setClickedEmailId(id)
    }

    return <ul className="email-preview-list">
        {emailList.map(email => {
            const className = email.isRead === true ? "email-item clicked" : "email-item";
            return (
                <li key={email.id} className={className}>
                    <button onClick={() => onDeleteEmail(email.id)}>delete</button>
                    <Link onClick={() => onEmailClicked(email.id)} to={`/email/${email.id}`}>
                        <EmailPreview emailItem={email} />
                    </Link>
                </li>
            )
        })}
    </ul>
    }
