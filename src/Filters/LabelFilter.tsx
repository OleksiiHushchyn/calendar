import {useCallback, useState} from "react";
import AssignLabelsModal from "../Task/AssignLabelsModal.tsx";
import {useFilterContext} from "./FiltersContextProvider.tsx";
import {Color} from "../Components/Color.tsx";
import styled from "styled-components";

const LabelFilterContainer = styled.div`
  display: flex;
`

const Selected = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px
`
const LabelFilter = () => {
    const [showModal, setShowModal] = useState(false)
    const {colorFilter, setColorFilter} = useFilterContext();

    const handleSelectColor = useCallback((labels: Array<Label>) => {
        setColorFilter(labels);
        setShowModal(false)
    },[setColorFilter])

    return (
        <LabelFilterContainer>
            <button onClick={() => {setShowModal(true)}}>Label filter</button>
            <Selected>
                {colorFilter.map((item) => <Color color={item.color} height={10} width={20} />)}
            </Selected>
            {showModal && (
                <AssignLabelsModal
                    handleClose={() => {setShowModal(false)}}
                    handleAssignLabels={handleSelectColor}
                    selectedLabels={colorFilter}
                />
            )}
        </LabelFilterContainer>
    )
}

export default LabelFilter;