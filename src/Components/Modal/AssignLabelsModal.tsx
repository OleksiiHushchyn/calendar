import {useLabelContext} from "../Labels/LabelContextProvider.tsx";
import styled from "styled-components";
import Modal from "./Modal.tsx";
import {useCallback, useState} from "react";

const ColorWrapper = styled.div<{ selected?: boolean }>`
  padding: 2px;
  background: white;
  border: ${props => props.selected ? '2px solid black': 'none'};
  border-radius: 50%;
`

const Color = styled.div<{ color: string;}>`
  background: ${props => props.color};
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

const ColorsWrapper = styled.div`
  display: flex;
`

interface Props {
    handleClose: () => void,
    handleAssignLabels: (labels: Array<Label>) => void
    selectedLabels: Array<Label>
}
const AssignLabelsModal = ({handleClose, handleAssignLabels, selectedLabels}:Props) => {
    const {labels} = useLabelContext();
    const [selected, setSelected] = useState<Array<Label>>(selectedLabels);

    const handleClickToColor = useCallback((label:Label) => {
        const isSelected = selected.find((item) => item.color === label.color)
        if(isSelected){
            setSelected((prevState) => prevState.filter((item) => item.color !== label.color))
        }else{
            setSelected((prevState) => [...prevState, label])
        }
    },[selected])

    const handleAssign = useCallback(() => {
        handleAssignLabels(selected)
    },[selected, handleAssignLabels])
    return (
        <Modal handleClose={handleClose} handleOk={handleAssign}>
            <ColorsWrapper>
                {labels.map((item) =>
                    <ColorWrapper onClick={()=> {handleClickToColor(item)}} selected={!!selected.find((label) => item.color === label.color)}>
                        <Color color={item.color} />
                    </ColorWrapper>
                )}
            </ColorsWrapper>
        </Modal>
    )
}

export default AssignLabelsModal;