import { useState, useEffect } from "react"
import { Outlet, useParams } from "react-router-dom";


import { EmailList } from "../cmps/EmailList"
import { emailService } from "../src/services/email-service.js"
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";

export function EmailIndex() {
    const [ emailList, setEmails ] = useState([])
    const [ filterBy, setFilterBy ] = useState(emailService.getDefaultFilter())
    const {id} = useParams()

    useEffect(() => {
        loadEmails()
    }, [filterBy, id])
    
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy) 
            setEmails(emails)
        } catch (error) {
            console.log(error);
        }
    }

    function onFilterBy(filterBy) {
        console.log('filterBy: ', filterBy);
        setFilterBy(filterBy)
    }

    async function onEmailDelete(emailId) {
        const index = emailList.findIndex(email => email.id === emailId.id);
        if (index !== -1) {
            const updatedEmailList = [...emailList];
            const emailToRemove = { ...updatedEmailList[index], removedAt: new Date() };
    
            // Update the email locally
            updatedEmailList[index] = emailToRemove;
            setEmails(updatedEmailList);  // Update the local state immediately
    
            // Persist the change in storage
            try {
                if (filterBy.status === 'Trash') await emailService.remove(emailToRemove.id);
                else await emailService.save(emailToRemove);
                await loadEmails();  // Re-fetch emails to ensure consistency with the server
            } catch (error) {
                console.error('Failed to delete email:', error);
            }
        }
    }
    

    return <section className="email-index">
        <EmailFolderList filterBy={filterBy}  onFilterBy={onFilterBy}/>
        <EmailFilter filterBy={filterBy}  onFilterBy={onFilterBy}/>
        {!id && <EmailList emailList={emailList} onEmailDelete={onEmailDelete} />}

        <Outlet /> 
    </section>
}
