import { useState, useEffect } from "react"



export function EmailFolderList( { filterBy, onFilterBy }){
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function onInboxClick() {
        console.log('onInboxClick');
        const status = 'Inbox'
        setFilterByToEdit(prev => ({...prev, ['status']: status}))
    }

    function onSentClick() {
        console.log('onSentClick');
        const status = 'Sent'
        setFilterByToEdit(prev => ({...prev, ['status']: status}))
    }

    function onStarredClick() {
        console.log('onStarredClick');
        const status = 'Star'
        setFilterByToEdit(prev => ({...prev, ['status']: status}))
    }

    function onTrashClick() {
        console.log('onTrashClick');
        const status = 'Trash'
        setFilterByToEdit(prev => ({...prev, ['status']: status}))
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