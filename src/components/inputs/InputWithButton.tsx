"use client";

import { rem } from '@mantine/core';
import { IconLocation, IconSearch } from '@tabler/icons-react';
import styles from "./Inputs.module.css";
import React from 'react';


interface InputWithButtonProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function InputWithButton({onSubmit}: InputWithButtonProps): React.ReactElement {

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.groupInput}>
          <input name="s_query" className={styles.inputItem1} placeholder="Quel métier recherchez-vous ?" />
          <input name="location" className={styles.inputItem2} placeholder="Location" />
        <button type="submit" className={styles.buttonItem}>Rechercher</button>
      </div>
    </form>
  );
}