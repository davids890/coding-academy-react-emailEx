import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    getCurrentUser,
}

const STORAGE_KEY = 'emails'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
    }

_createEmails()

function getCurrentUser() {
    return loggedinUser
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}
function save(emailToSave) {
    console.log('emailToSave.id: ', emailToSave.id);
    if (emailToSave.id) {
        // Update existing email (overwrite it)
        return storageService.put(STORAGE_KEY, emailToSave);
    } else {
        // Create a new email if no id exists
        emailToSave.id = utilService.makeId();  // Ensure a new id is created
        return storageService.post(STORAGE_KEY, emailToSave);
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = createDummyEmails()
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

async function query(filterBy, folder) {
    let emails = await storageService.query(STORAGE_KEY)
    // text search
    // read/unread/all
    if (filterBy.txt.length > 0) {
        if (filterBy.txt.startsWith("label:read")) {
            emails = emails.filter(email => {return email.isRead})
            console.log(emails);
            return emails
        }
        else if (filterBy.txt.startsWith("label:unread")){
            emails = emails.filter(email => {return !email.isRead})
            return emails
        }
        else if (filterBy.txt.startsWith("label:all")) {
            return emails
        }

        // regular text search - based on the email content
        emails = emails.filter(email => {
            return filterBy.txt.length === 0 || 
                    email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.from.toLowerCase().includes(filterBy.txt.toLowerCase())
            })
        }

    //TODO: use switch case for the folder ifltering + you can split to filter by folder and filter by text functions
    // inbox search
    if (folder === 'inbox' && !filterBy.txt.length > 0) {
        console.log('inbox');
        emails = emails.filter(email => {
            return email.to === 'user@appsus.com' && !email.removedAt;
        })
    }
    
    // sent search
    if (folder === 'sent') {
        emails = emails.filter(email => {
            return email.to !== 'user@appsus.com' && !email.removedAt && !email.draft;
        })
    }
    // star search
    if (folder === 'starred') {
        emails = emails.filter(email => {

            return email.isStarred && !email.removedAt && !email.draft;
        })
    }
    
    // trash search
    if (folder === 'trash') {
        emails = emails.filter(email => {
            return email.removedAt
        })
    }
    
    // draft search
    console.log('draft search');
    if (folder === 'draft') {
        emails = emails.filter(email => {
            return email.draft
        })
    }
    
    return emails
}

function getDefaultFilter() {
    // return {'status': 'Inbox', 'txt': '', 'isRead': null, 'compose': false} TODO: remove status
    return {'txt': '', 'isRead': null, 'compose': false}
}

function createDummyEmails() {
    return [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            draft: false,
            },
            {
            id: 'e102',
            subject: 'Miss you2!',
            body: 'Would love to catch up sometimes2',
            isRead: false,
            isStarred: true,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            draft: false,
            },
            {
            id: 'e103',
            subject: 'Miss you3!',
            body: 'Would love to catch up sometimes3: lkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjlkj',
            isRead: false,
            isStarred: true,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com',
            draft: false,
            },
            {
            id: 'e104',
            subject: 'Miss you4!',
            body: 'Would love to catch up sometimes4',
            isRead: false,
            isStarred: false,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com',
            draft: false,
            },
            {
            id: 'e105',
            subject: 'Miss you5!',
            body: 'Would love to catch up sometimes5',
            isRead: false,
            isStarred: false,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com',
            draft: false,
            },
            {
            id: 'e106',
            subject: 'Miss you6!',
            body: 'Would love to catch up sometimes6',
            isRead: false,
            isStarred: false,
            sentAt : "2024-08-26",
            removedAt : null, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com',
            draft: false,
            },

    ]
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}