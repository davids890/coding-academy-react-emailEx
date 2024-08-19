// import { useState, useEffect } from "react"


// export function EmailFilter({ filterBy, onFilterBy }) {
//     const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

//     useEffect(() => {
//         onFilterBy(filterByToEdit)
//         console.log('EmailFilter, filterByToEdit: ', filterByToEdit);
//     }, [filterByToEdit])

//     function handleChange({target}) {
//         const userTxtInput = target.value
//         setFilterByToEdit(prev => ({...prev, ['txt']: userTxtInput})) // why [] ?
//     }

//     return <section className="filter-container">
//         {/* <h1>Filter</h1> */}
//         <label htmlFor="search"></label>
//         <input 
//             //set params
//             type="text" 
//             id="search" 
            
//             // default value - preview
//             value={filterByToEdit.txt}
            
//             // catch user input
//             onChange={handleChange}

//             placeholder="Search..."
//         />

//     </section>
// }

import { useState, useEffect } from "react";

export function EmailFilter({ filterBy, onFilterBy }) {
    const [filterText, setFilterText] = useState(filterBy.txt || '');

    useEffect(() => {
        setFilterText(filterBy.txt || '');
    }, [filterBy]);

    function handleChange({ target }) {
        const userTxtInput = target.value;
        setFilterText(userTxtInput);

        // Notify parent about the change in filter
        onFilterBy({ ...filterBy, txt: userTxtInput });
    }

    return (
        <section className="filter-container">
            <input
                type="text"
                id="search"
                value={filterText}
                onChange={handleChange}
                placeholder="Search..."
            />
        </section>
    );
}


// understand better what is the difference beetween the this and the comment out one 
