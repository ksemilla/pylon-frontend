import { useCallback, useEffect, useRef, useState } from "react"
import useDidMountEffect from "./useDidMountEffect"

const AutoSuggest = ({
  choices,
  attribute,
  value,
  onSelect,
}) => {

  const inputRef = useRef(null)
  const [query, setQuery] = useState(value[attribute])
  // const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [index, setIndex] = useState(-1)
  const [allowSuggestionsHide, setAllowSuggestionsHide] = useState(true)
  const [showSuggesttions, setShowSuggestions] = useState(false)

  const [toggle, setToggle] = useState(false)

  useEffect(()=>{
    // console.log("VALUE", value)
    const tempSuggestions = choices.filter((choice)=> choice[attribute].trim().toLowerCase() === value[attribute].trim().toLowerCase())
    setSuggestions(tempSuggestions)
  }, [choices])


  const onFocus = () => {
    setShowSuggestions(true)
    if (suggestions.length === 1) {
      setIndex(0)
    }
  }

  const filterChoices = useCallback((query)=>{
		return choices.filter((choice)=> choice[attribute].toLowerCase().trim().startsWith(query.toLowerCase().trim()) )
	}, [attribute, choices])

  const inChoices = (query) => {
		return choices.filter((choice)=> choice[attribute].trim().toLowerCase() === query.trim().toLowerCase()).length > 0
	}

  const handleQueryChange = (e) => {
    const currValue = e.target.value
    setQuery(() => currValue)
    setSuggestions(filterChoices(currValue))
  }

  const onBlur = () => {
    const tempSuggestions = choices.filter((choice)=> choice[attribute].trim().toLowerCase() === query.trim().toLowerCase())
    
    if (tempSuggestions.length === 1) {
      setQuery(tempSuggestions[0][attribute])
      setShowSuggestions(false)
    } else if (tempSuggestions.length === 0) {
      if (allowSuggestionsHide) {
        setQuery("")
        setSuggestions([])
        setShowSuggestions(false)
        setIndex(-1)
      }
    }
  }
  

  const onKeydown = (e) => {
    if (e.keyCode === 38) {
      e.preventDefault()
      setIndex((prevState)=>{
        if (prevState <= 0) {
          return suggestions.length - 1
        } else {
          return prevState - 1
        }
      })
    } else if (e.keyCode === 40) {
      e.preventDefault()
      setIndex((prevState)=>{
        if (prevState === suggestions.length - 1) {
          return 0
        } else {
          return prevState + 1
        }
      })
    } else if (e.keyCode === 13) {
      e.preventDefault()
      setQuery(suggestions[index][attribute])
      setToggle(prevState => !prevState)
    }
  }
  useDidMountEffect(()=>{
    if (onSelect) {
      onSelect(suggestions[index])
      setShowSuggestions(false)
      inputRef.current.blur()
    }
  }, [toggle])

  const onClickSelect = (e) => {
    e.preventDefault()
    setQuery(suggestions[index][attribute])
    if (onSelect) {
      onSelect(suggestions[index])
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeydown}
        ref={inputRef}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
      />
      {showSuggesttions && <div className="absolute top-8 right-0 left-0 z-50 bg-white">
        {suggestions.map((suggestion, idx) => {
          return (
            <div
              key={suggestion.id}
              className={idx === index ? "bg-gray-300" : ""}
              onMouseEnter={()=>{
                setIndex(idx)
                setAllowSuggestionsHide(false)
              }}
              onMouseLeave={()=>{
                setAllowSuggestionsHide(true)
              }}
              onClick={onClickSelect}
            >
                {suggestion[attribute]}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default AutoSuggest