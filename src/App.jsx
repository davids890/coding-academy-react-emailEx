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
// limit number of words in the preview
// 1. Give visual indication for read/unread in the email preview, and support hover state (show buttons instead of date)
// 3. round the grid - need help
// 4. add gmail icon - text next to the icon
// 5. add mark email box
// 2. hover email list - need help
// fix the search
// add menu 
// take care of the email preview

// 5. there is input checkbox (type) ?
// 1.  ? the button should be in hiden mode, then check if we are in  hover preview -> the buttons will in display block/flex, all the buttons should be in div - buttom container class, and on this container put the opacity on 0
// ? fix the star size
// add compose
// fix email details
// import icons from icons.service doesn't work
