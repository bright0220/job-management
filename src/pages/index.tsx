import { AuthLayout } from "~/components/AuthLayout";
import { useRouter } from "next/router";
import storage from "~/utils/storage";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!storage.getToken()) router.push("/login");
  }, []);
  return <AuthLayout>Hello</AuthLayout>;
}
