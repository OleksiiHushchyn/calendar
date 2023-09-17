import styled from "styled-components";
import {Dispatch, DragEvent, SetStateAction, useCallback, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faTrash} from '@fortawesome/free-solid-svg-icons'
import ManageTask from "./ManageTask.tsx";
import AssignLabelsModal from "../Components/Modal/AssignLabelsModal.tsx";
import {Color} from "../Components/Ui/Color.tsx";


interface Props {
    task: Task
    index: number
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    handleUpdate: (task: Task) => void
    handleDelete: (task: Task) => void
}

const TaskWrapper = styled.div`
  width: 150px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  padding: 5px;
  margin: 5px auto;
  position: relative;
`

const Text = styled.div`
  display: inline-block;
  word-wrap: break-word;
  width: 100%;
`

const TaskContent = styled.div`
  width: 80%;
  margin: auto;
`

const OptionsWrapper = styled.span`
  margin-left: auto;
  display: flex;

  div {
    margin: auto;

    svg {
      margin: 3px;

      :hover {
        color: #d01c1c;
      }
    }
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px
`
const TaskComponent = ({task, index, setCurrentIndex, handleDelete, handleUpdate}:Props) => {
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const onDragStart = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = "move";
    },[task.id])

    const onDragEnter = useCallback(() => {
        setCurrentIndex(index)
    },[setCurrentIndex, index])

    const handleAssignLabels = useCallback((labels: Array<Label>) => {
        handleUpdate({...task, labels})
    },[handleUpdate, task])

    return (
        <TaskWrapper className="border border-primary" onDragEnter={onDragEnter} onDragStart={onDragStart} draggable>
            <TaskContent>
            <LabelContainer>
                {task.labels.map((label) => <Color color={label.color} width={30} height={10} />)}
            </LabelContainer>
            {
                editMode ?
                    (
                        <ManageTask
                            handleClose={() => setEditMode(false)}
                            handleSubmit={(text) => {handleUpdate({...task, text})}}
                            text={task.text}
                        />
                    ) :
                    <Text onClick={() => {setEditMode(true)}}>{task.text}</Text>
            }
            </TaskContent>

            <OptionsWrapper>
                <div>
                    {showModal && <AssignLabelsModal selectedLabels={task.labels} handleClose={() => {setShowModal(false)}} handleAssignLabels={handleAssignLabels} />}
                    <FontAwesomeIcon onClick={() => {setShowModal(true)}} icon={faCircle} />
                    <FontAwesomeIcon onClick={() => {handleDelete(task)}} icon={faTrash} />
                </div>
            </OptionsWrapper>
        </TaskWrapper>
    )
}

export default TaskComponent;