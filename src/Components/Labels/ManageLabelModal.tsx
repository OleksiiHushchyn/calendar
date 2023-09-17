import {useCallback, useState} from "react";
import Modal from "../Modal/Modal.tsx";
import {useLabelContext} from "./LabelContextProvider.tsx";
import styled from "styled-components";
import LabelRow from "./LabelRow.tsx";

const Table = styled.table`
  color: black;
  width: 100%;
  th, td {
    border: 1px solid;
  }
`

const LabelForm = styled.div`
  display: flex;
  gap: 5px;
  label, input {
    margin: auto;
  }
`
const ManageLabelModal = () => {
    const [show, setShow] = useState(false)
    const [text, setText] = useState('');
    const [color, setColor] = useState('');
    const {labels, addLabel} = useLabelContext();

    const handleAddLabel = useCallback(() => {
        if(text && color){
            addLabel({text, color});
            setText('')
            setColor('')
        }
    },[text, color, addLabel])

    return (
        <>
            <button onClick={() => {setShow(true)}}>Manage Labels</button>
            {show && (
                <Modal handleClose={() => setShow(false)}>
                    <h3>Add new label</h3>
                    <LabelForm>
                        <label htmlFor="color-picker">Color:</label>
                        <input id="color-picker" value={color} onChange={(e) => {setColor(e.target.value)}} type="color"/>
                        <input id="label-text" placeholder="Label text" value={text} onChange={(e) => {setText(e.target.value)}} type="text"/>
                        <button onClick={handleAddLabel}>ok</button>
                    </LabelForm>
                    <h3>Labels</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>color</th>
                                <th>text</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {labels.map((label) => (
                            <LabelRow label={label} />
                        ))}
                        </tbody>
                    </Table>
                </Modal>
            )}
        </>
    )
}

export default ManageLabelModal;