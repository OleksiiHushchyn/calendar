import styled from "styled-components";

interface Props {
    value: DayWithTasks
}

const DayWrapper = styled.div`
  border: 1px solid white;
  border-radius: 10%;
`
const Day = ({value}: Props) => {
    return (
        <>
            <DayWrapper>{value.formattedDayValue}</DayWrapper>
        </>
    )
}

export default Day;