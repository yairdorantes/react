import { useAuth0 } from "@auth0/auth0-react";
import Menu from "./Menu";
const LoginAuth = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          log out
        </button>
      ) : (
        <button
          onClick={() => {
            loginWithRedirect();
          }}
        >
          LoginAuth
        </button>
      )}

      {
        isAuthenticated && <Menu></Menu>
        // <div>
        //   <div>welcome {user.given_name ? user.nickname : user.name}</div>
        //   {console.log(user)}
        //   <img src={user.picture} alt="" />
        //   <h1>{user.given_name}</h1>
        // </div>
      }
    </>
  );
};

export default LoginAuth;
