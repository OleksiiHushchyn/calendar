import styled from "styled-components";

export const Color = styled.div<{ color: string; width?: number; height?: number }>`
  background: ${props => props.color};
  height: ${props => props.height ? `${props.height}px`: '100%'};
  width: ${props => props.width ? `${props.width}px`: '100%'};
  border-radius: 5%;
`