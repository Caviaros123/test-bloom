import { Button, rem } from "@mantine/core";

interface RoundedButtonProps {
  content: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export function RoundedButton({ content, onClick, rightIcon, leftIcon }: RoundedButtonProps) {
  return (
    <Button
        variant="light"
        radius="xl"
        size="md"
        styles={{
        root: { paddingRight: rem(14), height: rem(38), color: "#fff", backgroundColor: "#12554c"},
        section: { marginLeft: rem(22) },
        }}
        onClick={onClick}
    >
        {rightIcon && rightIcon}
        <span style={{ width: rem(5) }} />
        {content}
        <span style={{ width: rem(5) }} />
        {leftIcon && leftIcon}
    </Button>
  );
}
