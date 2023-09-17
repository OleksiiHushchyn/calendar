import {useFilterContext} from "./FiltersContextProvider.tsx";

const TextFilter = () => {
    const {textFilter, setTextFilter} = useFilterContext()

    return (
        <>
            <label htmlFor='text-filter'>Search text: </label>
            <input id="text-filter" value={textFilter} onChange={(e) => {setTextFilter(e.target.value)}} type="text"/>
        </>
    )
}

export default TextFilter;