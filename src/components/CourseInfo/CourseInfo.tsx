import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { transformToHours, transformLaunchDate } from '../../helpers';
import { ICourse, ILesson } from '../../interfaces';
import { fetchCourseById } from '../../services';
import { LessonCard } from '../LessonCard/LessonCard';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { Error } from '../Error/Error';

import styles from './CourseInfo.module.scss';

type Props = {
  token: string
};

export interface IStudyingProgress {
  courseId: string
}

export const CourseInfo: FC<Props> = ({ token }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isLoading, setLoading] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!course) {
      setLoading(true);
      fetchCourseById(courseId!, token, setError)
        .then((res: ICourse) => {
          setCourse({ ...res, lessons: res.lessons!.sort((a, b) => a.order - b.order) });
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (course && localStorage.getItem(course?.id) && !currentLesson) {
      const courseProgress = JSON.parse(localStorage.getItem(course?.id)!);
      const courseEntries:
      [string, { sec: number, watchedDate: number }][] = Object.entries(courseProgress!);
      const maxDate = courseEntries.sort((a, b) => b[1].watchedDate - a[1].watchedDate);
      const lastWatchedLessonId = maxDate[0][0];
      setCurrentLesson(course.lessons!.find((lesson) => lesson.id === lastWatchedLessonId)!);
    } else if (course && course!.lessons![0] && !currentLesson) {
      setCurrentLesson(course!.lessons![0]);
    }
  }, [course]);

  return (
    <div className={styles.container}>
      {isLoading && !error
        ? (
          <div className={styles.loading}>
            <CircularProgress size={200} />
          </div>
        )
        : (course && currentLesson && !error ? (
          <>
            <h2 className={styles.title}>{course.title}</h2>
            <h3 className={styles.description}>{course.description}</h3>
            <h3>
              Lesson &nbsp;
              <span>{currentLesson.order}</span>
            </h3>
            <div className={styles.courseInfo}>
              <div className={styles.video}>
                <VideoPlayer
                  courseId={courseId ?? ''}
                  url={currentLesson.link}
                  lessonId={currentLesson.id}
                />
              </div>

              <div className={styles.details}>
                <h4>What skills will you get:</h4>
                <ul>
                  {course.meta.skills
                  && course.meta.skills.map((el) => <li className={styles.content} key={el}>{el}</li>)}
                </ul>
                <h4>
                  Duration: &nbsp;
                  <span className={styles.content}>
                    {transformToHours(course.duration)}
                  </span>
                </h4>

                <h4>
                  Launch date: &nbsp;
                  <span className={styles.content}>
                    {transformLaunchDate(course.launchDate)}
                  </span>
                </h4>
              </div>
            </div>
            <div className={styles.lesson}>
              {course.lessons?.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  setCurrentLesson={setCurrentLesson}
                />
              ))}
            </div>
          </>
        ) : <Error error={error!} />)}
    </div>
  );
};
