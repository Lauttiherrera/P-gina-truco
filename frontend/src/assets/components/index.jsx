import React from "react";
import FormLogin from "./FormLogin";
import FormSignup from "./FormSignup";
import Overlay from "./Overlay";
import Container from "./styled/Container";
import useToggle, { STATE_LOG_IN } from "./useToggle";
const Form = ({ initialState = STATE_LOG_IN }) => {
const [mode, toggleMode] = useToggle(initialState);
return (
<Container>
<div className="container__form container__form--one">
<FormLogin />
</div>
<div className="container__form container__form--two">
<FormSignup />
</div>
<Overlay
toggleMode={toggleMode}
mode={mode}
/>
</Container>
);
};
export default Form;