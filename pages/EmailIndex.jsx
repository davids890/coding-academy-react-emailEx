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
    const {id, folder} = useParams()
    const isCompose = searchParams.get('compose') === 'new'
    const navigate = useNavigate();


    useEffect(() => {
        loadEmails()
        SetSearchParams(getExistingProperties(filterBy)) // SetSearchParams - put the filterBy values in the url
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
    
    function onEmailCompose(a){
        console.log('a...', a);
        console.log('onEmailCompose...');
    }
    
    function onExitCompose() {
        console.log('folder: ', folder);
        navigate(`/email/${folder}/`);
    }

    return <section className="email-index">
        {isCompose && <EmailCompose onExitCompose={onExitCompose}/>}
        <EmailFolderList onEmailCompose={onEmailCompose}/>
        <EmailFilter filterBy={filterBy}  onFilterBy={onFilterBy}/>
        {!id && <EmailList emailList={emailList} onEmailDelete={onEmailDelete} 
            onMarkUnread={onMarkUnread} onStarMark={onStarMark} />}
        <section className="aside-right"></section>
        <section className="email-index-footer"></section>
        <Outlet /> 
        {/* add if id put details else regular list */}
    </section>
}
