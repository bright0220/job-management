import { AuthLayout } from "~/components/AuthLayout";
import { TextInput } from "flowbite-react";
import { Button } from "~/components/Button";
import Link from "next/link";
import { useState } from "react";
import { axios } from "~/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import storage from "~/utils/storage";
import { LoginResponse } from "~/types";

const LoginPage = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const { setAuthState } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    axios
      .post("signIn/", data)
      .then(({ data }) => {
        storage.setToken(data.token);
        router.push("/");
      })
      .catch((err) => {
        const { type, message } = err.response.data;
        if (type === "invalid") toast.error(message);
        else toast.warn(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // userLogin({ email, password })
    //   .then((userInfo: LoginResponse) => {
    //     // TODO: proper handling for the sign in

    //     storage.setToken(userInfo.token);

    //     setAuthState({
    //       user: {
    //         id: "1",
    //       },
    //       token: userInfo.token,
    //     });
    //     const from = location.state?.from?.pathname || "/";
    //     navigate(from, { replace: true });
    //     return userInfo.token;
    //   })
    //   .catch((e) => {
    //     const { code } = e;
    //     if (code) {
    //       toast(FirebaseMessagesMapper[code] || "Something went wrong");
    //     }

    //     console.error(e);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="mt-16 text-3xl lg:mt-10 lg:text-2xl">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-16 flex w-80 flex-col gap-4 text-lg lg:mt-10">
            <TextInput
              required
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <TextInput
              required
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button type="submit">Sign in</Button>

            <div className="flex flex-col gap-1 text-sm text-neutral-500">
              <Link className="" href="/signup">
                New to bionl? <span className="text-primary-500">Sign up</span>
              </Link>
              <Link href="/reset">Forgot password?</Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
