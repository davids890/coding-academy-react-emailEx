import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../src/services/email-service"
import { Link } from "react-router-dom"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx";


export function EmailDetails() {
    const [ email, setEmail ] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        loadEmail()
        console.log('email: ', email);
    }, [id])

    async function loadEmail() {
        const email = await emailService.getById(id)
        setEmail(email)
    }

    if (!email) return <div>Loading...</div>

    return <section>
        <EmailFolderList />
        <section  className="email-details">
            <h1>Email details</h1><br />
            <h2>From: {email.from}</h2><br />
            <h2>Subject: {email.subject}</h2><br />
            <h2>Description:</h2>
            <div>{email.body}</div><br />
            <Link to="/email_index/" >
                <button>Back</button>
            </Link>
        </section>
    </section>


}