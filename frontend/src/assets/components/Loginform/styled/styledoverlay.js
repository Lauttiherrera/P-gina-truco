import styled from "styled-components";
export const InnerSignup = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 100%;
`;
export const InnerLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 100%;
`;
const StyledOverlay = styled.div`
position: absolute;
top: 0;
left: ${({ $login }) => ($login ? "0" : "50%")};
width: 50%;
height: 100%;
z-index: 10;
background: ${({ theme }) => theme.gradient};
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
padding: 40px;
transition: left 0.4s ease-in-out;
h1 {
margin: 0 0 20px;
font-size: 32px;
}
p {
padding: 0 20px;
margin: 0 0 28px;
font-size: 15px;
line-height: 1.4;
}
button {
background: transparent;
color: white;
border: 2px solid white;
border-radius: 30px;
min-width: 128px;
height: 40px;
padding: 0 20px;
font-family: "Montserrat", sans-serif;
font-size: 12px;
font-weight: bold;
cursor: pointer;
transition: transform 80ms ease-in;
}
button:active {
transform: scale(0.95);
}
`
export default StyledOverlay;