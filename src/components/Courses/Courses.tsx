import { FC } from 'react';

import { CourseCard } from '../CourseCard/CourseCard';
import { ICourse } from '../../interfaces';

import styles from './Courses.module.scss';

type Props = {
  courses: ICourse[]
};

export const Courses: FC<Props> = ({ courses }) => (
  <div className={styles.container}>
    {courses.map((el) => <CourseCard key={el.id} course={el} />)}
  </div>
);
