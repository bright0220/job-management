import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "~/components/AuthLayout";
import { Button } from "~/components/Button";

const ResetPasswordPage = () => {
  //   const [email, setEmail] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);

  //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setEmail(e.target.value);
  //   };

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setIsLoading(true);
  //     sendPasswordResetEmail(auth, email)
  //       .then(() => {
  //         toast("A reset password email has been sent to you", {
  //           type: "success",
  //         });
  //       })
  //       .catch((e) => {
  //         const { code } = e;
  //         if (code) {
  //           toast(FirebaseMessagesMapper[code] || "Something went wrong");
  //         }

  //         console.error(e);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   };

  return (
    <AuthLayout>
      <div>
        <h2 className="mt-16 text-3xl lg:mt-10 lg:text-2xl">Reset Password</h2>

        <form>
          <div className="mt-16 flex w-80 flex-col gap-4 text-lg lg:mt-10">
            <TextInput
              required
              placeholder="Email"
              type="email"
              //   value={email}
              //   onChange={handleEmailChange}
            />

            <Button type="submit">Reset</Button>

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
