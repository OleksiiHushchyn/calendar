import {ReactNode, useCallback, useEffect} from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode,
    handleOk?: () => void,
    handleClose: () => void;
}

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
`
const Modal = ({children, handleOk, handleClose}: Props) => {

    const onKeyDown = useCallback((event:KeyboardEvent) => {
        if(event.key === 'Escape'){
            handleClose()
        }
    },[handleClose])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    const handleSubmit = useCallback(() => {
        handleOk && handleOk();
        handleClose();
    },[handleOk, handleClose])

    return (
        <ModalContainer>
            <ModalContent>
                {children}
                <div>
                    {
                        handleOk && <button onClick={handleSubmit}>ok</button>
                    }
                    <button onClick={handleClose}>close</button>
                </div>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal;