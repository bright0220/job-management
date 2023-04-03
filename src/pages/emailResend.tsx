import { rejects } from "assert";
import { resolve } from "path";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/Button";

const EmailConfirmResend = () => {
  const [email, setEmail] = useState("");
  const [originEmail, setOriginEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let originEmail: any = localStorage.getItem("email");
    setOriginEmail(originEmail);
    setEmail(originEmail);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await fetch("http://localhost:3000/api/sendVerify", {
      method: "POST",
      body: JSON.stringify({
        email,
        firstName: localStorage.getItem("firstName"),
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 500)
          toast.error("Invalid email. Please try to use another email");
        else
          toast.success("Sending email is success! Please confirm your email.");
      })
      .catch((e) => toast.error("Something went wrong. Please try again."));
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[545px] w-full space-y-8">
        <div className="mt-6">
          <div className="mt-6">
            <div className="mb-5">
              <b className="text-lg mb-6 font-medium flex justify-center">
                Verify your email to proceed
              </b>
              <div className="text-slate-700 flex flex-col items-center">
                <p>We just sent an email to the address: {originEmail}</p>
                <p>
                  Please check your email and click on the link provide to
                  verify your address.
                </p>
              </div>
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Your email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@example.com"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500  w-full rounded-md sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
              />
            </div>
            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                className="cursor-pointer bg-indigo-500 hover:bg-indigo-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
              >
                Resend the email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmResend;
