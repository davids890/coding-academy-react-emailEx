
    export function EmailPreview({ emailItem, starButton, onEmailDelete, onMarkUnread, onStarMark, readUnreadButton}) {
        return (
            <>
                <div className="email-name">{emailItem.from.split('@')[0]}</div>
                <div className="email-body">{emailItem.subject} {emailItem.body}</div>
                <div className="email-date">
                    {emailItem.sentAt}<br />
                    <button onClick={(e) => { e.preventDefault(); onEmailDelete(emailItem.id); }} 
                            className="email-date"><span class="material-symbols-outlined">delete</span></button>
                    <button onClick={(e) => { e.preventDefault(); onMarkUnread(emailItem.id); }} 
                            className="email-date">{readUnreadButton(emailItem)}</button>
                    <button onClick={(e) => { e.preventDefault(); onStarMark(emailItem.id); }} 
                            className="email-date">{starButton(emailItem)}</button>
                </div>
            </>
        );
    }

    <div>
        
    </div>
    
    