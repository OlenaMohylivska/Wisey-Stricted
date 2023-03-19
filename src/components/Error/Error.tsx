import { Button } from '@mui/material';
import { FC } from 'react';

import styles from './Error.module.scss';

type Props = {
  error: string
};

export const Error: FC<Props> = ({ error }) => {
  // eslint-disable-next-line max-len
  const errorImg = 'https://media.istockphoto.com/id/1358873815/vector/sad-woman-working-on-laptop-from-home-error-message-vector-cartoon-character.jpg?s=612x612&w=0&k=20&c=TYBCvkiX3ehY0vQXvYwVXDkwEnF9JfW4zkITqXJ_i-g=';

  return (
    <div className={styles.error}>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Back
      </Button>
      <img
        className={styles.errorIm}
        src={errorImg}
        alt="error"
      />
      <h2>
        Sorry! The error has occurred: &nbsp;
        {error}
      </h2>
    </div>
  );
};
