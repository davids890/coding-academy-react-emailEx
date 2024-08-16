

export function EmailFolderList(){

    function onInboxClick() {
        console.log('onInboxClick');
    }
    function onSentClick() {
        console.log('onSentClick');
    }
    function onStarredClick() {
        console.log('onStarredClick');
    }
    function onTrashClick() {
        console.log('onTrashClick');
    }

    return <aside className="email-folder-list">
        <ul className="list">
            <li onClick={onInboxClick}>Inbox</li>
            <li onClick={onSentClick}>Sent</li>
            <li onClick={onStarredClick}>Starred</li>
            <li onClick={onTrashClick}>Trash</li>
        </ul>
    </aside>
}