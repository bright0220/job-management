import { TextInput, ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "~/components/AuthLayout";
import { Button } from "~/components/Button";
import { axios } from "~/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
    };
    axios
      .post("/resetPassword", data)
      .then((res) => {
        toast.success("Reset password is success!");
        router.push("/login");
      })
      .catch((e) => toast.error("Your email is invalid. Please SingUp."))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="mt-16 text-3xl lg:mt-10 lg:text-2xl">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-16 flex w-80 flex-col gap-4 text-lg lg:mt-10">
            <TextInput
              required
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <Button type="submit" isLoading={isLoading}>
              Reset
            </Button>

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

export default ResetPasswordPage;
