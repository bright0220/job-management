import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { AuthLayout } from "~/components/AuthLayout";
import { Button } from "~/components/Button";
import { axios } from "~/lib/axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const router = useRouter();

  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFristName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
      firstName,
      lastName,
      organization,
    };
    axios
      .post("register/", data)
      .then(({ data }) => {
        toast.success(data);
        localStorage.setItem("email", email);
        localStorage.setItem("firstNmae", firstName);
        router.push("/emailResend");
      })
      .catch((err) => {
        toast.warn(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="mt-16 text-3xl lg:mt-10 lg:text-2xl">
          Create your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="w-100 mt-16 flex flex-col gap-3 text-lg lg:mt-10">
            <div className="flex gap-3">
              <TextInput
                required
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextInput
                required
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <TextInput
              required
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextInput
              required
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextInput
              required
              placeholder="Organization"
              type="text"
              value={organization}
              onChange={handleOrganizationChange}
            />
            <Button className="w-full" isLoading={isLoading} type="submit">
              Create Account
            </Button>
            <Link
              className="text-sm text-gray-500 hover:text-primary-500 focus:text-primary-500 "
              href="/login"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
