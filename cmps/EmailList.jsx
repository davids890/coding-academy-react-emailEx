
import { EmailPreview } from "./EmailPreview"
import { Link } from "react-router-dom";


export function EmailList({emailList}) {
    console.log('emailList.map: ', emailList);
    return <ul>
        {emailList.map(email => (
            <li key={email.id}>
                <Link to={`/email_index/${email.id}`}>
                    <EmailPreview emailItem={email} />
                </Link>
            </li>
        ))}
    </ul>
    }
