import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";


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

    useEffect(() => {
        const savedLabels = localStorage.getItem("labels");
        if(savedLabels){
            setLabels(JSON.parse(savedLabels))
        }
    }, []);

    const saveLabels = useCallback((data:Array<Label>) => {
        localStorage.setItem("labels", JSON.stringify(data));
    },[])

    const addLabel = useCallback((label: Label) => {
        setLabels((prevState) => {
            const data = [...prevState, label];
            saveLabels(data);
            return data;
        });
    },[saveLabels])

    const updateLabel = useCallback((label: Label) => {
        setLabels((prevState) => {
            const data = prevState.map((item) => item.color === label.color ? label : item)
            saveLabels(data);
            return data;
        });
    },[saveLabels])

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