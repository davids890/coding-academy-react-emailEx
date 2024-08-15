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
                <Route path="/email_index" element={<EmailIndex />} />
                    <Route path="/email_index/:id" element={<EmailDetails />} />
            </Routes>
        </main>
    </Router>
}