import { useState, useEffect } from "react"


export function EmailFilter({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}) {
        const userTxtInput = target.value
        setFilterByToEdit(prev => ({...prev, ['txt']: userTxtInput})) // why [] ?
    }

    return <section className="email-filter">
        <h1>Filter</h1>
        <label htmlFor="search">Search </label>
        <input 
            //set params
            type="text" 
            id="search" 
            
            // default value - preview
            value={filterByToEdit.txt}
            
            // catch user input
            onChange={handleChange}
        />

    </section>
}