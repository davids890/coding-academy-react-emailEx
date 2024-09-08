import { useState, useEffect } from "react"
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { EmailList } from "../cmps/EmailList"
import { emailService } from "../src/services/email.service.js"
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";
import { useSearchParams } from "react-router-dom";
import { getExistingProperties } from "../src/services/util.service.js";
import { EmailCompose } from "../cmps/EmailCompose.jsx";


export function EmailIndex() {
    const [ emailList, setEmails ] = useState([])
    const [ searchParams, SetSearchParams ] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(emailService.getFilterFromSearchParams(searchParams))
    // const {id, folder, emailId} = useParams()
    const {id, folder, emailId} = useParams()
    const isCompose = searchParams.get('compose')
    const navigate = useNavigate();
    


    useEffect(() => {
        loadEmails()
        SetSearchParams(getExistingProperties(filterBy)) // SetSearchParams - put the filterBy values in the url
        // return ()=
    }, [filterBy, folder])
    
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, folder) 
            setEmails(emails)
        } catch (error) {
            console.log(error);
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    async function onEmailDelete(emailId) {
        const index = emailList.findIndex(email => email.id === emailId);
        if (index !== -1) {
            const updatedEmailList = [...emailList];
            const emailToRemove = { ...updatedEmailList[index], removedAt: new Date() };
    
            // Update the email locally
            updatedEmailList[index] = emailToRemove;
            setEmails(updatedEmailList);  // Update the local state immediately
    
            // Persist the change in storage
            try {
                if (folder === 'trash') await emailService.remove(emailToRemove.id);
                else await emailService.save(emailToRemove);
                await loadEmails();  // Re-fetch emails to ensure consistency with the server
            } catch (error) {
                console.error('Failed to delete email:', error);
            }
        }
    }

    async function onMarkUnread(emailId) {
        const email = await emailService.getById(emailId)
        console.log('email: ', email);
        const emailCopy = {...email, isRead: false}
        await emailService.save(emailCopy)
        await loadEmails()
    }

    async function onStarMark(emailId) {
        const email = await emailService.getById(emailId)
        const emailCopy = {...email, isStarred: !email.isStarred}
        await emailService.save(emailCopy)
        await loadEmails()
    }
    
    async function onEmailCompose(email){
        const newEmail = {
            'subject': email.Subject,
            'body': email.Content,
            'isRead': false,
            'isStarred': false,
            'sentAt': new Date(),
            'removedAt': false,
            'from': emailService.getCurrentUser().email,
            'to': email.To,
            'draft': false,
        }
        await emailService.save(newEmail)
        navigate(`/email/${folder}/`);
    }
    
    function onExitCompose() {
        navigate(`/email/${folder}/`);
    }

    async function onUpdateEmail(email) {
        console.log('onUpdateEmail');
        // if email has no id save new email as draft
        if (! email.id) {
            await emailService.save({...email, 'draft': true, 'from': emailService.getCurrentUser().email})
        console.log('done');

        // if email has id already just update the email content
        }
    }


    return <section className="email-index">
        {isCompose && <EmailCompose onExitCompose={onExitCompose} onEmailCompose={onEmailCompose} onUpdateEmail={onUpdateEmail} />}
        <EmailFolderList/>
        <EmailFilter filterBy={filterBy}  onFilterBy={onFilterBy}/>
        {!id && <EmailList emailList={emailList} onEmailDelete={onEmailDelete} 
            onMarkUnread={onMarkUnread} onStarMark={onStarMark} />}
        <section className="aside-right"></section>
        <section className="email-index-footer"></section>
        <Outlet /> 
        {/* add if id put details else regular list */}
    </section>
}
