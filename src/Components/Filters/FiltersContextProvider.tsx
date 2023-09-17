import {createContext, ReactNode, useContext, useState} from "react";


interface Props {
    children: ReactNode
}
interface FilterContextProps {
    textFilter: string;
    colorFilter: Array<Label>;
    setTextFilter: (text: string) => void
    setColorFilter: (colors: Array<Label>) => void
}

const FilterContext = createContext<FilterContextProps>({
    textFilter: '',
    colorFilter: [],
    setTextFilter: () => {},
    setColorFilter: () => {}
});

const FilterContextProvider = ({ children }: Props) => {
    const [textFilter, setTextFilter] = useState('');
    const [colorFilter, setColorFilter] = useState<Array<Label>>([]);


    return (
        <FilterContext.Provider value={{textFilter, setTextFilter, setColorFilter, colorFilter}}>
            {children}
        </FilterContext.Provider>
    );
}

const useFilterContext = () => {
    const context = useContext(FilterContext);

    if (context === undefined) {
        throw new Error('useDateTaskContext must be used within a FilterContextProvider');
    }

    return context;

}
export { FilterContextProvider, useFilterContext };