export function EmailFolderList({ filterBy, onFilterBy }) {
    function onFolderClick(status) {
        // Notify parent about the change in filter
        onFilterBy({ ...filterBy, status });
    }

    return (
        <aside className="email-folder-list">
            <ul className="list">
                <li onClick={() => onFolderClick('Inbox')}>Inbox</li>
                <li onClick={() => onFolderClick('Sent')}>Sent</li>
                <li onClick={() => onFolderClick('Starred')}>Starred</li>
                <li onClick={() => onFolderClick('Trash')}>Trash</li>
            </ul>
        </aside>
    );
}
