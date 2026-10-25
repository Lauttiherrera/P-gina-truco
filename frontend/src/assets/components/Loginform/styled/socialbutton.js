import styled from "styled-components";
const SocialButton = styled.div`
background-color: white;
border: 1px solid #dddddd;
border-radius: 50%;
display: inline-flex;
align-items: center;
justify-content: center;
margin: 0 5px;
width: 56px;
height: 56px;
cursor: pointer;
transition: transform 0.15s ease;
&:hover {
transform: scale(1.08);
}
&:active {
transform: scale(0.95);
}
img {
width: 20px;
height: 20px;
display: block;
object-fit: contain;
}
`
export default SocialButton;