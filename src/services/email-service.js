import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
    }

_createEmails()

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}
function save(emailToSave) {
    // ? post vs get - overwrite vs update
    return storageService.post(STORAGE_KEY, emailToSave)
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = createDummyEmails()
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)

    
    // inbox search
    if (filterBy.status === 'Inbox') {
        emails = emails.filter(email => {
            return email.to === 'user@appsus.com'
        })
    }
    
    // sent search
    if (filterBy.status === 'Sent') {
        emails = emails.filter(email => {
            return email.to !== 'user@appsus.com'
        })
    }
    // star search
    if (filterBy.status === 'Star') {
        emails = emails.filter(email => {
            return email.isStarred
        })
    }
    
    // trash search
    if (filterBy.status === 'Trash') {
        emails = emails.filter(email => {
            return email.removedAt
        })
    }
    
    console.log('emails.length: ', emails.length);
    // text search
    if (filterBy.txt.length > 0) {
        emails = emails.filter(email => {
            return filterBy.txt.length === 0 || 
                    email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.from.toLowerCase().includes(filterBy.txt.toLowerCase())
            })
        }
    
    console.log('emails.length: ', emails.length);
    

    return emails
}

function getDefaultFilter() {
    return {'status': 'Inbox', 'txt': '', 'isRead': null}
}

function createDummyEmails() {
    return [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : false, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com'
            },
            {
            id: 'e102',
            subject: 'Miss you2!',
            body: 'Would love to catch up sometimes2',
            isRead: false,
            isStarred: true,
            sentAt : 1551133930594_2,
            removedAt : true, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com'
            },
            {
            id: 'e103',
            subject: 'Miss you3!',
            body: 'Would love to catch up sometimes3',
            isRead: false,
            isStarred: true,
            sentAt : 1551133930594_2,
            removedAt : false, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com'
            },
            {
            id: 'e104',
            subject: 'Miss you4!',
            body: 'Would love to catch up sometimes4',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594_2,
            removedAt : false, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com'
            },
            {
            id: 'e105',
            subject: 'Miss you5!',
            body: 'Would love to catch up sometimes5',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594_2,
            removedAt : false, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com'
            },
            {
            id: 'e106',
            subject: 'Miss you6!',
            body: 'Would love to catch up sometimes6',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594_2,
            removedAt : false, //for later use
            from: 'user@appsus.com',
            to: 'someone@someone.com'
            },

    ]
}


// export const robotService = {
//     // query,
//     save,
//     remove,
//     getById,
//     // createRobot,
// }


// function createRobot(model = '', type = '', batteryStatus = 100) {
//     return {
//         model,
//         batteryStatus,
//         type
//     }
// }

// async function query(filterBy) {
//     const robots = await storageService.query(STORAGE_KEY)
//     if (filterBy) {
//         var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
//         maxBatteryStatus = maxBatteryStatus || Infinity
//         minBatteryStatus = minBatteryStatus || 0
//         robots = robots.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase()) && robot.model.toLowerCase().includes(model.toLowerCase())
//             && (robot.batteryStatus < maxBatteryStatus)
//             && robot.batteryStatus > minBatteryStatus)
//     }
//     return robots
// }

// function save(emailToSave) {
//     if (emailToSave.id) {
//         return storageService.put(STORAGE_KEY, emailToSave)
//     } else {
//         emailToSave.isOn = false
//         return storageService.post(STORAGE_KEY, robotToSave)
//     }
// }