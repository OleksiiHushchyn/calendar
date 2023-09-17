import {createContext, ReactNode, useCallback, useContext, useState} from "react";


interface Props {
    children: ReactNode
}

interface LabelContextProps {
    labels: Array<Label>;
    addLabel: (label: Label) => void;
    updateLabel: (label: Label) => void
}

const LabelContext = createContext<LabelContextProps>({
    labels: [],
    addLabel: () => {},
    updateLabel: () => {}
});

const LabelContextProvider = ({ children }: Props) => {
    const [labels, setLabels] = useState<Array<Label>>([
        {color: '#c42828', text: 'hello'},
        {color: '#f1d313', text: 'world'},
        {color: '#76ec09', text: 'qwe'}
    ]);

    const addLabel = useCallback((label: Label) => {
        setLabels((prevState) => ([...prevState, label]));
    },[])

    const updateLabel = useCallback((label: Label) => {
        setLabels((prevState) => (prevState.map((item) => item.color === label.color ? label : item)));
    },[])

    return (
        <LabelContext.Provider value={{labels, addLabel, updateLabel}}>
            {children}
        </LabelContext.Provider>
    );
}

const useLabelContext = () => {
    const context = useContext(LabelContext);

    if (context === undefined) {
        throw new Error('useDateTaskContext must be used within a LabelContextProvider');
    }

    return context;

}
export { LabelContextProvider, useLabelContext };