import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom";


import { EmailList } from "../cmps/EmailList"
import { emailService } from "../src/services/email-service.js"
import { EmailFilter } from "../cmps/EmailFilter.jsx";
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";

export function EmailIndex() {
    const [ emailList, setEmails ] = useState([])
    const [ filterBy, setFilterBy ] = useState(emailService.getDefaultFilter())
    // const [ filterBy, setFilterBy ] = useState(emailService.getDefaultFilter())
    // useEffect(() => {
    //     loadEmails()
    // }, [filterBy])

    useEffect(() => {
        loadEmails()
    }, [filterBy])
    
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy) 
            setEmails(emails)
        } catch (error) {
            console.log(error);
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    return <section className="email-index">
        <EmailFolderList />
        <EmailFilter filterBy={filterBy}  onFilterBy={onFilterBy}/>
        <EmailList emailList={emailList}/>

        <Outlet /> 
    </section>
}

//TODO: implement: <EmailFilter>, <EmailFolderList>
//TODO: aside bar EmailFolderList
//TODO: limit number of words in the preview