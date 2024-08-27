
    export function EmailPreview({ emailItem, starButton, onEmailDelete, onMarkUnread, onStarMark, readUnreadButton, deleteButton}) {
        return (
            <>

                <div className="email-name">{emailItem.from.split('@')[0]}</div>
                <div className="email-body">{emailItem.subject} {emailItem.body}</div>
                <div className="email-date">
                    {emailItem.sentAt}<br />
                </div>

                <div className="email-buttons">
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEmailDelete(emailItem.id); }} 
                            className="email-date">{deleteButton(emailItem)}</div>
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMarkUnread(emailItem.id); }} 
                            className="email-date">{readUnreadButton(emailItem)}</div>
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); onStarMark(emailItem.id); }} 
                            className="email-date">{starButton(emailItem)}</div>
                </div>
            </>
        );
    }

    <div>
        
    </div>
    
    