import { FC, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

import { ICourse } from '../../interfaces';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

import styles from './CourseCard.module.scss';

type Props = {
  course: ICourse
};

export const CourseCard: FC<Props> = ({ course }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <Link to={`/course/${course.id}`}>
      <section
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.container}
      >
        <div className={styles.media}>
          {isHovering && course.meta.courseVideoPreview?.link
            ? <div className={styles.video}><VideoPlayer url={course.meta.courseVideoPreview.link} /></div>
            : (
              <img
                className={styles.image}
                src={`${course.previewImageLink}/cover.webp`}
                alt="Course"
              />
            )}
        </div>

        <div className={styles.info}>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.description}>{course.description}</p>
          <div className={styles.details}>
            <h4>
              Number of lessons: &nbsp;
              <span>{course.lessonsCount}</span>
            </h4>
            <Rating name="read-only " value={course.rating} precision={0.1} readOnly />
          </div>
        </div>
      </section>
    </Link>
  );
};
