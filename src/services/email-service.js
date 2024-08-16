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
    console.log('query filterBy: ', filterBy);
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        emails = emails.filter(email => {
            console.log(' email.body: ',  email.body);
            console.log(' filterBy.txt: ',  filterBy.txt);
            console.log('email.body.includes(filterBy.txt): ',  email.body.includes(filterBy.txt));
            return filterBy.txt.length === 0 || 
                    email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.from.toLowerCase().includes(filterBy.txt.toLowerCase())
        })
    }

    return emails
}

function getDefaultFilter() {
    return {'status': ' ', 'txt': '', 'isRead': null}
}

function createDummyEmails() {
    return [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Miss you2!',
            body: 'Would love to catch up sometimes2',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594_2,
            removedAt : null, //for later use
            from: 'momo@momo_2.com',
            to: 'user@appsus_2.com'
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