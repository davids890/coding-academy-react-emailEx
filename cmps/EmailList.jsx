// import { EmailPreview } from "./EmailPreview"
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import starImage from "../images/star-filled.svg"

// export function EmailList({emailList, onEmailDelete, onMarkUnread, status, onStarMark}) {

//     function starButton(email) {
//         if (email.isStarred) {return <img src={starImage} alt="star" className="star-icon" style={{ width: 14, height: 14 }} />}
//         else {return <span class="material-symbols-outlined material-star">star_outline</span>}
//     }
//     function readUnreadButton(email) {
//         if (email.isRead) {return <span class="material-symbols-outlined">mark_email_read</span>}
//         else {return <span class="material-symbols-outlined">mark_email_unread</span>}
//     }
//     function deleteButton(email) {
//         return <span class="material-symbols-outlined">delete</span>
//     }

//     return (
//         <div className="email-preview-list">
//             {emailList.map((email) => {
                
//                 // check if email was clicked or not
//                 let className;
//                 if (status !== "Inbox") {
//                     className = "email-item clicked";
//                 } else {
//                     className = email.isRead ? "email-item clicked" : "email-item";
//                 }
//                 // preview the email
//                 return (
//                         <Link 
//                             to={`/email/${email.id}`} 
//                             key={email.id} 
//                             className={className}
//                             style={{ display: 'contents' }}  // Ensures that the link doesn't break the grid structure
//                         >
//                             <EmailPreview emailItem={email} 
//                                 starButton={starButton}
//                                 onEmailDelete={onEmailDelete}
//                                 onMarkUnread={onMarkUnread}
//                                 onStarMark ={onStarMark}
//                                 readUnreadButton={readUnreadButton}
//                                 deleteButton={deleteButton}
//                             />
//                         </Link>

//                         //TODO: div that act like Link, modify the url

//                 );
//             })}
//         </div>
//     );
    
//     }



import { EmailPreview } from "./EmailPreview";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import starImage from "../images/star-filled.svg";
import { iconsService } from "../src/services/icons.service.js"



export function EmailList({ emailList, onEmailDelete, onMarkUnread, status, onStarMark }) {
    const navigate = useNavigate(); // Hook for navigation

    function starButton(email) {
        if (email.isStarred) {
            return <img src={starImage} alt="star" className="star-icon" style={{ width: 14, height: 14 }} />;
        } else {
            // return <span className="material-symbols-outlined material-star" >star_outline</span>;
            return <span className="material-symbols-outlined material-star" >star</span>;
            // const a = iconsService.getFullStar()
            // console.log(a);
            // return null
        }
    }

    function readUnreadButton(email) {
        if (email.isRead) {
            return <span className="material-symbols-outlined">mark_email_read</span>;
        } else {
            return <span className="material-symbols-outlined">mark_email_unread</span>;
        }
    }

    function deleteButton(email) {
        return <span className="material-symbols-outlined">delete</span>;
    }

    return (
        <div className="email-preview-list">
            {emailList.map((email) => {
                // Check if email was clicked or not
                let className;
                if (status !== "Inbox") {
                    className = "email-item clicked";
                } else {
                    className = email.isRead ? "email-item clicked" : "email-item";
                }

                // Handle click to navigate to email detail
                const handleEmailClick = (e) => {
                    // Check if the click was on the checkbox
                    if (e.target.type === "checkbox") return; // Prevent navigation when checkbox is clicked

                    // Navigate to the email detail page
                    navigate(`/email/${email.id}`);
                };

                return (
                    <div 
                        key={email.id} 
                        className={className} 
                        onClick={handleEmailClick} // Handle navigation on div click
                    >
                        {/* /email checkbox mark */}
                        <div className="email-mark-side">
                            <input
                                type="checkbox"
                                className="input-checkbox"
                                onClick={(e) => e.stopPropagation()} // Prevent propagation to stop navigation
                            />
                        {/* /email input mark */}
                            <div 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onStarMark(email.id); }} 
                            >
                                {starButton(email)}
                            </div>
                        </div>

                        <EmailPreview
                            emailItem={email}
                            starButton={starButton}
                            onEmailDelete={onEmailDelete}
                            onMarkUnread={onMarkUnread}
                            onStarMark={onStarMark}
                            readUnreadButton={readUnreadButton}
                            deleteButton={deleteButton}
                        />
                    </div>
                );
            })}
        </div>
    );
}
