
    export function EmailPreview({ emailItem, starButton, onEmailDelete, onMarkUnread, onStarMark, readUnreadButton, deleteButton}) {
        return (
            <>
                <div className="email-mark-side">
                    <input type="checkbox" className="input-checkbox" ></input>
                    <label></label>
                    <button onClick={(e) => { e.preventDefault(); onStarMark(emailItem.id); }} 
                                className="email-mark-side-star-button">{starButton(emailItem)}</button>
                </div>

                <div className="email-name">{emailItem.from.split('@')[0]}</div>
                <div className="email-body">{emailItem.subject} {emailItem.body}</div>
                <div className="email-date">
                    {emailItem.sentAt}<br />
                </div>

                <div className="email-buttons">
                    <button onClick={(e) => { e.preventDefault(); onEmailDelete(emailItem.id); }} 
                            className="email-date">{deleteButton(emailItem)}</button>
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
    
    