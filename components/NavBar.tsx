import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between pb-4  mb-4 border-b">
      <div>
        <Link href={`/`}>
          <h1 className="text-4xl font-bold tracking-tighter text-dark">Tech News</h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time
        </p>
      </div>
      <div className="flex items-center">
        <Link className="btn" href={`/sign-in`}>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
