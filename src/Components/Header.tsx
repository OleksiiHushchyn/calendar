import {months, yearsArray} from "../utils.ts";
import ManageLabelModal from "./Labels/ManageLabelModal.tsx";
import TextFilter from "./Filters/TextFilter.tsx";
import LabelFilter from "./Filters/LabelFilter.tsx";
import ExportToFile from "./ExportAndImport/ExportToFile.tsx";
import ImportFromFile from "./ExportAndImport/ImportFromFile.tsx";
import ImportToImage from "./ExportAndImport/ImportToImage.tsx";
import {Dispatch, SetStateAction, useCallback, useEffect} from "react";
import dayjs from "dayjs";
import styled from "styled-components";

interface Props {
    setCurrentDate: Dispatch<SetStateAction<dayjs.Dayjs>>
    currentDate: dayjs.Dayjs
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  position: relative;
`

const RowContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  .filters {
    margin-left: auto;
    display: flex;
    gap: 10px;
    .text-filter{
      display: flex;
      label {
        margin-top: auto;
      }
    }
  }
`

const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']

const Header = ({setCurrentDate, currentDate}:Props) => {

    const onKeyDown = useCallback((event:KeyboardEvent) => {
        const wasAnyKeyPressed = keys.some((key) => event.key === key);
        if (wasAnyKeyPressed) {
            event.preventDefault();
        }
        switch (event.key){
            case 'ArrowRight': setCurrentDate((prev) => prev.add(1, 'month')); return;
            case 'ArrowLeft': setCurrentDate((prev) => prev.subtract(1, 'month')); return;
            case 'ArrowUp': setCurrentDate((prev) => prev.add(1, 'year')); return;
            case 'ArrowDown': setCurrentDate((prev) => prev.subtract(1, 'year')); return;
            default: return;
        }
    },[setCurrentDate])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <HeaderWrapper>
            <RowContainer>
                <ExportToFile selectedYear={currentDate.year()} selectedMonth={currentDate.month()} />
                <ImportFromFile />
                <ImportToImage />
            </RowContainer>
            <RowContainer>
                <button onClick={() => {setCurrentDate((prev) => prev.subtract(1, 'month'))}}>{'<'}</button>
                <button onClick={() => {setCurrentDate((prev) => prev.add(1, 'month'))}}>{'>'}</button>
                <select onChange={(event) => {
                    console.log(event.target.value)
                    setCurrentDate((prev) => prev.set('month', Number(event.target.value)))
                }}>
                    {months.map((month) => <option key={month.label} selected={currentDate.month() === month.value} value={month.value}>{month.label}</option>)}
                </select>

                <select onChange={(event) => {
                    setCurrentDate((prev) => prev.set('year', Number(event.target.value)))
                }}>
                    {yearsArray.map((year) => <option key={year} selected={currentDate.year() === year} value={year}>{year}</option>)}
                </select>
                <ManageLabelModal />
                <div className='filters'>
                    <TextFilter />
                    <LabelFilter />
                </div>
            </RowContainer>
        </HeaderWrapper>
    )
}

export default Header;