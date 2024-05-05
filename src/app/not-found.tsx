"use client";

import { RoundedButton } from "@/components/buttons/RoundedButtton";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <Image
        src="https://assets-global.website-files.com/static/page-not-found.211a85e40c.svg"
        alt="404"
        width={200}
        height={200}
        quality={100}
      />
      <h3>Page Not Found</h3>
      <div>
        The page you are looking for doesn&lsquo;t exist or has been moved
      </div>

      <Link href={"/"} ><RoundedButton content="Go home" /></Link>
    </main>
  );
}
