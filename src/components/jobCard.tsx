import { Group, Paper, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";
import ReactTimeAgo, { useTimeAgo } from "react-time-ago";

TimeAgo.addDefaultLocale(fr);

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
  created_date: Date;
  company: {
    name: string;
    userId: string;
    description: string;
    entityId: string;
  };
};

interface JobCardProps {
  offer: Offer;
  showOffer: () => void;
  key: number;
  setLiked?: () => void;
}

const JobCard = ({ offer, showOffer, setLiked }: JobCardProps) => {
  return (
    <Paper onClick={showOffer} shadow="sm" p={20} radius="md" withBorder>
      <Group flex="row" justify="space-between">
      <Text size="sm" color="dimmed">
        {offer.company.name}
      </Text>
        <IconHeart color="#3ac2ae" cursor={"pointer"} onClick={setLiked} />
      </Group>
        <Text size="xl" fw={600}>{offer.info.title}</Text>
      <Group>
        <span>📍 {offer.info.city}</span>

        <span>•</span>

        <span>🕒 {offer.info.type}</span>

        <span>•</span>

        <span>
          ⏰ <ReactTimeAgo date={offer.created_date} locale="fr-FR" />
        </span>
      </Group>

      <Text size="sm" color="dimmed">
        {offer.candidate.skills.required.join(", ")}
      </Text>
    </Paper>
  );
};

export default JobCard;
