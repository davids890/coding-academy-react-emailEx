import { useState, useEffect } from "react"


export function EmailFilter({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    console.log('Received filterBy:', filterBy);
    console.log('Received onFilterBy:', onFilterBy);


    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}) {
        const userTxtInput = target.value
        setFilterByToEdit(prev => ({...prev, ['txt']: userTxtInput})) // why [] ?
    }

    return <section className="filter-container">
        {/* <h1>Filter</h1> */}
        <label htmlFor="search"></label>
        <input 
            //set params
            type="text" 
            id="search" 
            
            // default value - preview
            value={filterByToEdit.txt}
            
            // catch user input
            onChange={handleChange}

            placeholder="Search..."
        />

    </section>
}