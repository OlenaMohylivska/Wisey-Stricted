import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const baseUrl = 'https://api.wisey.app/api/v1';
const endpoints = {
  token: '/auth/anonymous?platform=subscriptions',
  course: '/core/preview-courses',
};
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.get['Content-Type'] = 'application/json';

export const fetchToken = async (setError: Dispatch<SetStateAction<string | null>>) => {
  try {
    return await axios.get(endpoints.token).then((res) => {
      if (res.status === 200) {
        return res.data;
      }

      throw Error(`${res.status} An unexpected error occurred`);
    });
  } catch (error: any) {
    setError(error.message);
  }
};

export const fetchCourses = async (token: string, setError: Dispatch<SetStateAction<string | null>>) => {
  try {
    return await axios.get(endpoints.course, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }

        throw Error(`${res.status} An unexpected error occurred`);
      });
  } catch (error: any) {
    setError(error.message);
  }
};

export const fetchCourseById = async (id: string, token: string, setError: Dispatch<SetStateAction<string | null>>) => {
  try {
    return await axios.get(`${endpoints.course}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.data;
      }

      throw Error(`${res.status} An unexpected error occurred`);
    });
  } catch (error: any) {
    setError(error.message);
  }
};
