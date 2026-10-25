import styled from 'styled-components';
const Container = styled.div`
background-color: white;
border-radius: 10px;
box-shadow:
0 14px 28px rgba(0, 0, 0,
0.25),
0 10px 10px rgba(0, 0, 0,
0.22);
position: relative;
overflow: hidden;
width: 768px;
max-width: calc(100vw - 40px);
min-height: 560px;
margin: 40px auto;
display: grid;
grid-template-columns: 1fr 1fr;
.container__form {
width: 100%;
min-height: 560px;
overflow: hidden;
}
.container__form--one {
grid-column: 1;
grid-row: 1;
}
.container__form--two {
grid-column: 2;
grid-row: 1;
}
`
export default Container;