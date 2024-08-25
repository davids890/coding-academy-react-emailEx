export function EmailFolderList({ filterBy, onFilterBy }) {
    function onFolderClick(status) {
        // Notify parent about the change in filter
        onFilterBy({ ...filterBy, status });
    }

    return (
        // <aside className="email-folder-list">
        //     <ul className="list">
        //         <li onClick={() => onFolderClick('Inbox')}>Inbox</li>
        //         <li onClick={() => onFolderClick('Sent')}>Sent</li>
        //         <li onClick={() => onFolderClick('Starred')}>Starred</li>
        //         <li onClick={() => onFolderClick('Trash')}>Trash</li>
        //     </ul>
        // </aside>
        <div className="email-folder-list">
            <div onClick={() => onFolderClick('Inbox')} className="folder-item">Inbox</div>
            <div onClick={() => onFolderClick('Sent')} className="folder-item">Sent</div>
            <div onClick={() => onFolderClick('Starred')} className="folder-item">Starred</div>
            <div onClick={() => onFolderClick('Trash')} className="folder-item">Trash</div>
        </div>

    );
}
