
import { EmailPreview } from "./EmailPreview"
import { Link } from "react-router-dom";


export function EmailList({emailList}) {
    return <ul className="email-preview-list">
        {emailList.map(email => (
            <li key={email.id} className="li">
                <Link to={`/email_index/${email.id}`}>
                    <EmailPreview emailItem={email} />
                </Link>
            </li>
        ))}
    </ul>
    }
