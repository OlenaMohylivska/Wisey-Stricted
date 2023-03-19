import {
  FC, useState, useEffect, useRef
} from 'react';
import { Pagination, CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { fetchToken, fetchCourses } from './services';
import { Courses } from './components/Courses/Courses';
import { Error } from './components/Error/Error';

import styles from './App.module.scss';

export const App: FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const isFirstRun = useRef(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coursesList, setCoursesList] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      fetchToken(setError).then((res) => {
        setToken(res!.token);
        localStorage.setItem('token', res!.token);
      });
    }
    if (!coursesList.length && token) {
      setLoading(true);
      fetchCourses(token, setError).then((res) => {
        setCoursesList(res.courses.reverse() ?? null);
      }).then(() => setLoading(false));
    }
  }, [token]);

  const handleChange = (event: React.ChangeEvent<unknown>, val: number) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setPage(val);
  };

  return (
    <div className={styles.container}>

      {isLoading && !error
        ? (
          <div className={styles.loading}>
            <CircularProgress size={200} />
          </div>
        )
        : (
          <Routes>
            <Route
              path="/"
              element={error ? <Error error={error} /> : (
                <>
                  <Courses
                    courses={coursesList.slice((page - 1) * itemsPerPage, page * itemsPerPage)}
                  />
                  <Pagination
                    className={styles.pagination}
                    onChange={handleChange}
                    count={Math.ceil(coursesList.length / itemsPerPage)}
                    page={page}
                    variant="outlined"
                    color="primary"
                  />
                </>
              )}
            />
            <Route path="/course/:courseId" element={<CourseInfo token={token!} />} />
          </Routes>

        )}
    </div>
  );
};
