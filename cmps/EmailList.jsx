import { EmailPreview } from "./EmailPreview"
import { Link } from "react-router-dom";
import { useState } from "react";


export function EmailList({emailList, onEmailDelete, onMarkUnread, status, onStarMark}) {

    function onDeleteEmail(id) {
        // Notify parent about the change in filter
        onEmailDelete({id});
    }
    function onUnreadMark(id) {
        onMarkUnread(id)
    }
    function onStarMarkCallback(id) {
        onStarMark(id)
    }
    function starButton(email) {
        return email.isStarred ?  "Unstar email" : "Star email"
    }

    return <ul className="email-preview-list">
        {emailList.map(email => {
            let className
            if (status !== "Inbox") {className = "email-item clicked"}
            else {className = email.isRead === true ? "email-item clicked" : "email-item";}
            return (
                <li key={email.id} className={className}>
                    <button onClick={() => onDeleteEmail(email.id)}>delete</button>
                    <button onClick={() => onUnreadMark(email.id)}>Mark as unread</button>
                    <button onClick={() => onStarMarkCallback(email.id)}>{starButton(email)}</button>
                    <Link to={`/email/${email.id}`}>
                        <EmailPreview emailItem={email} />
                    </Link>
                </li>
            )
        })}
    </ul>
    }
