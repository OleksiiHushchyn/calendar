import styled from "styled-components";
import {useCallback, useState} from "react";

const CreateTaskWrapper = styled.div`
  max-width: 65%;
  input {
    max-width: 100%;
  }
`

interface Props {
    text?: string
    handleSubmit: (text:string) => void
    handleClose: () => void
}
const ManageTask = ({handleSubmit, handleClose, text}:Props) => {
        const [description, setDescription] = useState(text || '')

    const handleOk = useCallback(() => {
        handleSubmit(description);
        setDescription('');
        handleClose()
    },[handleSubmit, handleClose, description])
        return (
            <CreateTaskWrapper>
                <input value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Task description" type="text" />
                <button onClick={handleOk}>ok</button>
                <button onClick={handleClose}>x</button>
            </CreateTaskWrapper>
        )
}

export default ManageTask;