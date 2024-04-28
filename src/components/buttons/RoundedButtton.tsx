import { Button, rem } from "@mantine/core";

interface RoundedButtonProps {
  content: string;
  onClick?: () => void;
}

export function RoundedButton({ content, onClick }: RoundedButtonProps) {
  return (
    <Button
        variant="light"
        radius="xl"
        size="md"
        styles={{
        root: { paddingRight: rem(14), height: rem(48) },
        section: { marginLeft: rem(22) },
        }}
        onClick={onClick}
    >
        {content}
    </Button>
  );
}
