import { AuthenticationContextAPI } from "./AuthenticationContextAPI.JSX";

const AuthenticationContextApiProvider = ({children}) => {

const value = {}

    return (
        <AuthenticationContextAPI.Provider value={value}>
            {children}
        </AuthenticationContextAPI.Provider>
    );
};

export default AuthenticationContextApiProvider;