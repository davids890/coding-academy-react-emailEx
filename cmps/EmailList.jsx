import { EmailPreview } from "./EmailPreview"
import { Link } from "react-router-dom";
import { useState } from "react";
import starImage from "../images/star-filled.svg"

export function EmailList({emailList, onEmailDelete, onMarkUnread, status, onStarMark}) {

    function starButton(email) {
        if (email.isStarred) {return <img src={starImage} alt="star" style={{ width: 24, height: 24 }} />}
        else {return <span class="material-symbols-outlined">star_outline</span>}
    }
    function readUnreadButton(email) {
        if (email.isRead) {return <span class="material-symbols-outlined">mark_email_read</span>}
        else {return <span class="material-symbols-outlined">mark_email_unread</span>}
    }
    
    return (
        <div className="email-preview-list">
            {emailList.map((email) => {
                
                // check if email was clicked or not
                let className;
                if (status !== "Inbox") {
                    className = "email-item clicked";
                } else {
                    className = email.isRead ? "email-item clicked" : "email-item";
                }
                // preview the email
                return (
                        <Link 
                            to={`/email/${email.id}`} 
                            key={email.id} 
                            className={className}
                            style={{ display: 'contents' }}  // Ensures that the link doesn't break the grid structure
                        >
                            <EmailPreview emailItem={email} 
                                starButton={starButton}
                                onEmailDelete={onEmailDelete}
                                onMarkUnread={onMarkUnread}
                                onStarMark ={onStarMark}
                                readUnreadButton={readUnreadButton}
                            />
                        </Link>

                );
            })}
        </div>
    );
    
    }
