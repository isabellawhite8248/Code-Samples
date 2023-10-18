import { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import "./styles.scss";

/**
 * Searchbar component that is in charge of getting user search queries in the search box in the header
 * @returns - SearchBar component
 */
 function SearchBar() {

	const [inputVal, setInputVal] = useState('')

	// updates when inputVal changes which is only when enter is pressed
	useEffect(() => {
		document.addEventListener('keydown', detectSearchSubmit)
		console.log(inputVal)
		
	}, [inputVal])

	// function that checks if enter button is pressed 
	const detectSearchSubmit = (e) => {
		const input = document.getElementById('search-bar')
		if (e.key === "Enter" && input.value !== "") {
			setInputVal(input.value)
			// reset the input value when search inputted 
			input.value = ''
		}
	}

	// only return an input element 
	return (
		<div className='search-bar-div'>
			<button type="submit" className='search-bar-button'readOnly="readonly"><FaSearch/></button>
			<input 
			className='search-bar'
			id='search-bar'
			type='text'
			placeholder='Search...'
			></input>
		</div>
	)
}

export default SearchBar;