import React from "react";
import StyledOverlay, {
InnerLogin,
InnerSignup,
} from "./styled/StyledOverlay";
import { STATE_LOG_IN } from "./useToggle";
const WelcomeOverlay = () => (
<InnerLogin>
<h1>Welcome Back!</h1>
<p>
To keep connected with us please login
with your personal info
</p>
</InnerLogin>
);
const NewOverlay = () => (
<InnerSignup>
<h1>Hello, Friend!</h1>
<p>
Enter your details below to start your
journey with us
</p>
</InnerSignup>
);
const Overlay = ({ toggleMode, mode }) => {
const login = mode === STATE_LOG_IN;
return (
<StyledOverlay $login={login}>
{login ? <NewOverlay /> : <WelcomeOverlay />}
<button type="button" onClick={toggleMode}>
{login ? "Sign in" : "Sign up"}
</button>
</StyledOverlay>
);
};
export default Overlay;