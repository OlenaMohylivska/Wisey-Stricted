import {
  FC, Dispatch, SetStateAction
} from 'react';
import { LockOutlined } from '@mui/icons-material';

import { transformToHours } from '../../helpers';
import { ILesson } from '../../interfaces';

import styles from './LessonCard.module.scss';

type Props = {
  lesson: ILesson,
  setCurrentLesson: Dispatch<SetStateAction<ILesson | null>>
};

export const LessonCard: FC<Props> = ({ lesson, setCurrentLesson }) => {
  const clickHandler = () => {
    if (lesson.status === 'unlocked') {
      setCurrentLesson(lesson);
    }
  };

  const onImageError = (e: any) => {
    e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
  };

  return (
    <div
      className={styles.container}
      onClick={() => clickHandler()}
      onKeyDown={() => clickHandler()}
      tabIndex={0}
      role="button"
    >
      <img
        className={styles.image}
        src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
        onError={onImageError}
        alt="lesson"
      />
      <div className={styles.details}>
        <h3>
          Lesson: &nbsp;
          {lesson.order}
        </h3>
        <h3 className={styles.title}>
          {lesson.title}
        </h3>
        <p>
          Status: &nbsp;
          {lesson.status}
          <span className={styles.icon}>
            {lesson.status === 'locked'
          && <LockOutlined fontSize="large" color="warning" />}
          </span>
        </p>
        <p className={styles.duration}>{transformToHours(lesson.duration)}</p>
      </div>
    </div>
  );
};
