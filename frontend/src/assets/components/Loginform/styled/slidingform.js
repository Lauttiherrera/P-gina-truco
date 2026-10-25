import styled from 'styled-components';

const SlidingForm = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
padding: 40px 50px;
background-color: white;
h1 {
margin: 0 0 20px;
font-size: 32px;
line-height: 1.15;
}
p {
margin: 18px 0;
font-size: 15px;
}
form {
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
}
input {
width: 100%;
max-width: 280px;
}
a {
margin: 15px 0;
}
`
export default SlidingForm;