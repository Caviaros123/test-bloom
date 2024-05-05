"use client";

import { Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BloomLogo } from '@/Icons/BloomLogo';
import { IconBell } from '@tabler/icons-react';
import Link from 'next/link';
import { RoundedButton } from '../buttons/RoundedButtton';
import classes from './Header.module.css';

interface LinkProps {
  label: string;
  link: string;
  icon?: string;
}

export function Header({ links }: { links: LinkProps[] }) {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.icon && <IconBell />}
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <BloomLogo/>
        </Group>

        <Group>
          <Group ml={50} className={classes.links} visibleFrom="sm">
            {items}
          </Group>

          <RoundedButton content={"Se connecter"} onClick={() => {}} />
        </Group>
      </div>
    </header>
  );
}