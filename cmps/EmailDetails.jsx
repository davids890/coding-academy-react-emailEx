import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { emailService } from "../src/services/email-service"
import { Link } from "react-router-dom"


export function EmailDetails() {
    const [ email, setEmail ] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        loadEmailAndMark()
    }, [id])

    async function loadEmailAndMark() {
        const email = await emailService.getById(id)
        // console.log(email);
        const emailRead = { ...email, isRead: true }
        emailService.save(emailRead)
        setEmail(emailRead)
        // console.log(email);
    }

    if (!email) return <div>Loading...</div>

    return <section>
        <section  className="email-details">
            <h1>Email details</h1><br />
            <h2>From: {email.from}</h2><br />
            <h2>Subject: {email.subject}</h2><br />
            <h2>Description:</h2>
            <div>{email.body}</div><br />
            <Link to="/email/" >
                <button>Back</button>
            </Link>
        </section>
    </section>


}