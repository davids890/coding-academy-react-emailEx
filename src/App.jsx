import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { EmailIndex } from "../pages/EmailIndex"
import { EmailDetails } from "../cmps/EmailDetails"


export function App() {
    return <Router>
        <AppHeader />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/email" element={<EmailIndex />}>
                    <Route path="/email/:id" element={<EmailDetails />} />
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
// starr 
// read or undread
// limit number of words in the preview
