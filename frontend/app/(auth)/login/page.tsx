
import LoginForm from "@/components/auth/LoginForm";
import { pageRequiresNoAuth } from "@/lib/auth";


/*
 * Login - the login page
 */
const Login = async () => {
  await pageRequiresNoAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background-alt/15">
      <div className="tracking-tighter flex flex-col justify-center items-center w-fit h-fit px-40 py-20 bg-background border border-(--border) rounded-sm drop-shadow-md">
        <a
          href="/"
          className="text-4xl font-extrabold mb-10 hover:text-neutral-500 ease-linear duration-125"
        >
          (.dotconfig)
        </a>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
