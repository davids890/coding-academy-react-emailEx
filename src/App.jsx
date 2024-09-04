import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { EmailIndex } from "../pages/EmailIndex"
import { EmailDetails } from "../cmps/EmailDetails"
import { EmailList } from "../cmps/EmailList"

export function App() {
    return <Router>
        <AppHeader />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/email" element={<Navigate to="/email/inbox/" />} />
                <Route path="/email/:folder" element={<EmailIndex />}>
                    <Route path="/email/:folder/:id" element={<EmailDetails />} />
                </Route>
            </Routes>
        </main>
    </Router>
}

// Q
// 1. github pages
// 2. compose
// 3. how to add buttons to the list


// TODO: 
// undelete from trash
// limit number of words in the preview
// 1. Give visual indication for read/unread in the email preview, and support hover state (show buttons instead of date)

// 2. hover email list - need help
// fix the search
// add menu 
// take care of the email preview

// ? fix the star size ? import button ?
// 5. there is input checkbox (type) ?
// add compose
// fix email details

// is it possible to remove: ?status= from the url ?


// unread email doesn;t work
// delete doesn't work