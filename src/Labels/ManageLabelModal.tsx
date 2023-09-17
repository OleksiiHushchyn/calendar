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
const ManageLabelModal = () => {
    const [show, setShow] = useState(false)
    const [text, setText] = useState('');
    const [color, setColor] = useState('');
    const {labels, addLabel} = useLabelContext();

    const handleAddLabel = useCallback(() => {
        addLabel({text, color});
        setText('')
        setColor('')
    },[text, color, addLabel])

    return (
        <>
            <button onClick={() => {setShow(true)}}>Manage Labels</button>
            {show && (
                <Modal handleClose={() => setShow(false)}>
                    <h3>Add new label</h3>
                    <input value={color} onChange={(e) => {setColor(e.target.value)}} type="color"/>
                    <input value={text} onChange={(e) => {setText(e.target.value)}} type="text"/>
                    <button onClick={handleAddLabel}>ok</button>
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
                    hello world
                </Modal>
            )}
        </>
    )
}

export default ManageLabelModal;