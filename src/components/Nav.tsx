import Link from "next/link";

export default function Nav() {
  return (
    <nav className="top-nav">
      <Link href="/" className="top-nav-home">YA</Link>
      <Link href="/#blog">Blog</Link>
      <Link href="/#experience">Experience</Link>
      <Link href="/#education">Education</Link>
      <Link href="/#publications">Publications</Link>
    </nav>
  );
}
