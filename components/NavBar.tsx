import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <div>
        <Link href={`/`}>
          <h1>Tech News</h1>
        </Link>
        <p>Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time</p>
      </div>
      <div>
        <Link className="btn" href={`/sign-in`}>Sign In</Link>
      </div>
    </div>
  );
}
