
import { useRef } from "react";
import { useEffect } from "react";


export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

export function getExistingProperties(obj) {
    const truthyObj = {}
    for (const key in obj) {
        const val = obj[key]
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val
        }
    }
    return truthyObj
}

export function debounce(func, time) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, time)
    }
}



export function useSaveToDraft(mailToEdit, onSaveDraft, time=3000) {
    const timeoutRef = useRef()
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        timeoutRef.current = setTimeout(() => onSaveDraft(mailToEdit), time)
    }, [mailToEdit])

    return () => clearTimeout(timeoutRef.current)
}

// export function useSaveToDraft(mailToEdit, onSaveDraft, time = 3000) {
//     const timeoutRef = useRef();

//     useEffect(() => {
//         // Clear previous timeout if it exists
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//         }

//         // Set a new timeout to save the draft
//         timeoutRef.current = setTimeout(() => {
//             onSaveDraft(mailToEdit);
//         }, time);

//         // Cleanup function to clear the timeout when the component unmounts or before the next effect runs
//         return () => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//         };
//     }, [mailToEdit, onSaveDraft, time]);

//     return;
// }