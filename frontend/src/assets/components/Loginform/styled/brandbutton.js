import styled from "styled-components";
const BrandButton = styled.button`
background-color: ${({ theme }) => theme.color.brand};
color: white;
border: 2px solid ${({ theme }) => theme.color.brand};
border-radius: 30px;
min-width: 128px;
height: 40px;
padding: 0 20px;
font-family: "Montserrat", sans-serif;
font-size: 12px;
font-weight: bold;
cursor: pointer;
transition: transform 80ms ease-in;
&:active {
transform: scale(0.95);
}
`;
export default BrandButton;