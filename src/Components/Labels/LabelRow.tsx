import {Color} from "../Ui/Color.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import {useCallback, useState} from "react";
import {useLabelContext} from "./LabelContextProvider.tsx";

const Actions = styled.td`
  .edit-mode{
    display: flex;
    svg {
      cursor: pointer;
      margin: auto;
    }
  }
  
`
const LabelRow = ({label}:{label: Label}) => {
    const {updateLabel} = useLabelContext();
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(label.text)

    const handleSubmit = useCallback(() => {
        updateLabel({...label, text});
        setEditMode(false)
    },[text,label, updateLabel])
    return (
        <tr>
            <td><Color color={label.color} height={30} /></td>
            {editMode ? <input value={text} onChange={(e) => {setText(e.target.value)}} /> : <td>{label.text}</td>}
            <Actions>
                {editMode ? (
                    <div className='edit-mode'>
                        <FontAwesomeIcon color={'blue'} onClick={handleSubmit} icon={faCheck} />
                        <FontAwesomeIcon color={'blue'} onClick={() => {setEditMode(false)}} icon={faXmark} />
                    </div>
                ) : (
                    <FontAwesomeIcon color={'blue'} onClick={() => {setEditMode(true)}} icon={faPenToSquare} />
                )}
            </Actions>
        </tr>
    )
}

export default LabelRow