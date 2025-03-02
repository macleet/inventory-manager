import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default ({}) => {
    const [signUpPressed, setSignUpPressed] = useState<boolean>(true);
    return(
        signUpPressed
        ?
        <Register setIsOpen={setSignUpPressed} />
        :
        <Login setSignUpPressed={setSignUpPressed} />
    );
};
