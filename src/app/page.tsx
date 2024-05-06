"use client";

import { FooterLinks } from "@/components/footer/FooterLinks";
import { Header } from "@/components/header/Header";
import { InputWithButton } from "@/components/inputs/InputWithButton";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  MantineProvider,
  Modal,
  Pagination,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../server/api";
import styles from "./page.module.css";
import JobCard from "@/components/jobCard";

type Offer = {
  id: string;
  info: {
    education_level: string[];
    sub_education_level: string[];
    work_fields: string[];
    work_places: string[];
    keywords: string[];
    pace: string[];
    title: string;
    type: string;
    city: string;
    postal_code: string;
  };
  candidate: {
    skills: {
      required: string[];
      important: string[];
      bonus: string[];
    };
    languages: string[];
    profile: string;
    missions: string;
  };
  deleted: boolean;
  draft: boolean;
  approved: boolean;
  userId: string;
  updated_date: string;
  created_date: string;
  company: {
    name: string;
    userId: string;
    description: string;
    entityId: string;
  };
};

type Offers = {
  offers: Offer[];
  total: number;
};

export default function Home() {
  const links = [
    { link: "/hiring", label: "Je recrute!" },
    { link: "/offers", label: "Offres d'emploi" },
    { link: "/me/offers", require: "auth",  label: "Mes offres", icon: "bell" },
  ];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      location: "",
    },

    validate: {
      name: hasLength({ min: 3 }, "Enter your current job"),
      location: isNotEmpty("Enter your location"),
    },
  });

  const [offers, setResultOffers] = useState<Offer[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const searchOffers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchUrl = `https://uat.bloom-alternance.fr/api/offers/public?page=${currentPage}&limit=${limit}`;

      const response = await api.get(fetchUrl);

      if (!(response?.status ?? false)) {
        throw new Error("Failed to fetch offers");
      }

      const results = [];

      for (const offer of response.data.data) {
        results.push({
          ...offer,
          id: offer._id,
        });
      }

      // change limit to 10
      setLimit(10);

      setResultOffers(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showOffer = async (id: string): Promise<void> => {
    setIsLoadingOffer(true);
    try {
      const fetchUrl = `https://uat.bloom-alternance.fr/api/offers/single?offerId=${id}`;

      const response = await api.get(fetchUrl);

      if (!(response?.status ?? false)) {
        throw new Error("Failed to fetch offer");
      }

      open(); // open modal

      const result: Offer = {
        ...response.data.data,
        id: id,
      };

      setOffer(result as Offer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingOffer(false);
    }
  };

  useEffect(() => {
    searchOffers();
  }, [currentPage]);

  const [opened, { open, close }] = useDisclosure(false);

  const popup = () =>
    offer && (
      <Modal
        opened={opened}
        size={"lg"}
        onClose={close}
        title="Détails de l'offre"
        overlayProps={{
          backgroundOpacity: 0.35,
          blur: 2,
        }}
      >
        {isLoadingOffer ? (
          <Skeleton height={150} radius={"lg"} visible={isLoadingOffer} />
        ) : (
          <Container
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text size="xl" fw={500}>
                {offer.info.title}
              </Text>
              <Badge color="#3ac2ae">Nouveau</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {offer.company.name}
            </Text>

            <Text size="sm" c="dimmed">
              {offer.info.city} - {offer.info.postal_code}
            </Text>

            <Text size="md" c="dimmed">
              <h1>Profiles:</h1>{" "}
              <span dangerouslySetInnerHTML={{ __html: offer.candidate.profile }} />
            </Text>

            <Text size="sm" c="dimmed">
              <h1>Missions:</h1>{" "}
              <span dangerouslySetInnerHTML={{ __html: offer.candidate.missions }} />
            </Text>

            <Text size="sm" c="dimmed" >
              <h1>Compétences:</h1>{" "}
              <span dangerouslySetInnerHTML={{ __html: offer.candidate.profile }} />
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
              Postuler
            </Button>
          </Container>
        )}
      </Modal>
    );

  return (
    <MantineProvider>
      {popup()}
      <main className={styles.main}>
        <div className={styles.mainCard}>
          <Container size="xl">
            <Header links={links} />
            <Paper>
              <Text
                size="xl"
                style={{
                  padding: "5px",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                Trouves ton{" "}
                <span className={styles.titleColor}>nouveau job</span>:
              </Text>
            </Paper>
            <div className={styles.mainBanner}>
              <Image
                src="/banner.png"
                alt="Bloom Alternance Banner Ads"
                width={100}
                height={200}
                quality={100}
              />
            </div>
            <div className={styles.searchForm}>
              <Paper className={styles.subTitle}>
                Des milliers d&apos;emplois vous attendent.
              </Paper>

              <InputWithButton
                {...form}
                onSubmit={onSubmit}
                key="inputWithButton"
              />

              <Link href={"/alert-me"} className={styles.titleColor}>
                Recevoir une alerte par email
              </Link>
            </div>
          </Container>

          <Container
            size="full"
            mt={40}
            pt={20}
            pb={20}
            content="center"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "space-between",
              backgroundColor: "#f9f9f9",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            {offers.length > 0 && (
              <Text
                fw="bolder"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                }}
              >
                {offers.length > 0
                  ? ` ${offers.length} postes`
                  : "Aucun résultat trouvé"}
              </Text>
            )}

            <Text size="md">{offers.length > 0 && "Offres Bloom"}</Text>

            {isLoading && isLoading === true
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                    key={index}
                    className={styles.card}
                  >
                    <Skeleton height={150} radius={"md"} visible={isLoading} />
                    <Skeleton height={150} radius={"md"} visible={isLoading} />
                    <Skeleton height={150} radius={"md"} visible={isLoading} />
                    <Skeleton height={150} radius={"md"} visible={isLoading} />
                    <Skeleton height={150} radius={"md"} visible={isLoading} />
                  </Card>
                ))
              : offers &&
                offers.map((result: any, index: number) => (
                  <JobCard key={index} offer={result} showOffer={() => showOffer(result.id)} />
                ))}
            <Pagination
              style={
                {
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
              }
              total={30}
              siblings={1}
              defaultValue={currentPage}
              onChange={(value) => {
                setCurrentPage(value);
              }}
            />
          </Container>
        </div>
        <FooterLinks />
      </main>
    </MantineProvider>
  );
}
