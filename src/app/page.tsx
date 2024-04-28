import { FooterLinks } from "@/components/footer/FooterLinks";
import styles from "./page.module.css";

import { Header } from "@/components/header/Header";
import { MantineProvider } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  const links = [
    { link: "/about", label: "Je recrute!" },
    { link: "/pricing", label: "Offres d'emploi" },
    { link: "/learn", label: "Mes offres" },
  ];

  return (
    <MantineProvider>
      <main className={styles.mainCard}>
        <Header links={links} />
        <div className={styles.title}>
          <h1>
            Trouves ton <span className={styles.titleColor}>nouveau job</span>:
          </h1>
        </div>
        {/* Banner */}
        <div className={styles.mainBanner}>
          <Image
            src="/banner.png"
            alt="Bloom Alternance Banner Ads"
            width={100}
            height={200}
            quality={100}
          />
        </div>

        <FooterLinks />
      </main>
    </MantineProvider>
  );
}
