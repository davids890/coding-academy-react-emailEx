import { useNavigate } from "react-router-dom";
import { EmailCompose } from "./EmailCompose";


export function EmailFolderList({onEmailCompose }) {
    const navigate = useNavigate();

    function onFolderClick(status) {
        console.log('status: ', status);
        navigate(`/email/${status.toLowerCase()}/`);
    }

    return (
        <div className="email-folder-list">
            <EmailCompose onEmailCompose={onEmailCompose}/> 
            <div onClick={() => onFolderClick('Inbox')} className="folder-item">Inbox</div>
            <div onClick={() => onFolderClick('Sent')} className="folder-item">Sent</div>
            <div onClick={() => onFolderClick('Starred')} className="folder-item">Starred</div>
            <div onClick={() => onFolderClick('Trash')} className="folder-item">Trash</div>
            <div onClick={() => onFolderClick('Draft')} className="folder-item">Draft</div>
        </div>

    );
}


// Mail Compose – create a new email and send it.
// <EmailCompose>
// should be a rendered according to queryStringParams inside our
// MailIndex. tip ‘/mail/:folder?compose=new’
// Keep in mind that we have 3 different view states (minimized, normal,
// fullscreen). tip use one piece of state as a string “viewState”’