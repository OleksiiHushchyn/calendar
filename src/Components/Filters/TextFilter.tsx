import {useFilterContext} from "./FiltersContextProvider.tsx";

const TextFilter = () => {
    const {textFilter, setTextFilter} = useFilterContext()

    return (
        <div className='text-filter'>
            <label htmlFor='text-filter'>Search text: </label>
            <input id="text-filter" value={textFilter} onChange={(e) => {setTextFilter(e.target.value)}} type="text"/>
        </div>
    )
}

export default TextFilter;