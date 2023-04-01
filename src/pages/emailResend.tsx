import { useRef } from "react";

const EmailConfirmResend = () => {
  const emailInputElement = useRef();
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-6">
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Your email
            </label>
            <div className="mt-1">
              <input
                ref={emailInputElement}
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500  w-full rounded-md sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
              />
            </div>
            <div className="mt-6 text-center">
              <input
                type="submit"
                value="Resend the email"
                className="cursor-pointer bg-indigo-500 hover:bg-indigo-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmResend;
