import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom";


import { EmailList } from "../cmps/EmailList"
import { emailService } from "../src/services/email-service.js"



export function EmailIndex() {
    const [ emailList, setEmails ] = useState([])
    const [ filterBy, setFilterBy ] = useState(emailService.getDefaultFilter())
    
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

    return <section className="email-index">
        <EmailList emailList={emailList}/>
        <h1>Email Index page</h1>

        <Outlet /> 
    </section>
}

//TODO: implement: <EmailFilter>, <EmailFolderList>
//TODO: aside bar EmailFolderList
//TODO: limit number of words in the preview