import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import SignInButtons from "@/components/SignInButtons";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) return redirect(`/dashboard`);

  return <SignInButtons />;
}
