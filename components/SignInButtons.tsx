import { TSingInButton } from "@/types";
import SignInButton from "./SignInButton";

const singInButtons: TSingInButton[] = [
  {
    provider: "github",
    text: "Sign In with GitHub",
    imageSrc: "/github-logo.svg",
    altText: "Github Logo",
  },
  {
    provider: "google",
    text: "Sign In with Google",
    imageSrc: "/google-logo.svg",
    altText: "Google Logo",
  },
];

export default function SignInButtons() {
  return (
    <>
      <h1 className="text-center mt-8">Sign In</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        {singInButtons && singInButtons?.length > 0 ? (
          singInButtons?.map((item, index) => (
            <SignInButton
              key={index}
              provider={item.provider}
              text={item.text}
              imageSrc={item.imageSrc}
              altText={item.altText}
            />
          ))
        ) : (
          <div className="py-6">No buttons to display!</div>
        )}
      </div>
    </>
  );
}
