export interface ILesson {
  duration: number,
  id: string,
  link: string,
  meta: null,
  order: number,
  previewImageLink: string,
  status: string,
  title: string,
  type: string
}

export interface ICourse {
  id: string,
  title: string,
  tags: string[],
  launchDate: string,
  status: string,
  description: string,
  duration: number,
  lessonsCount?: number,
  containsLockedLessons: boolean,
  previewImageLink: string,
  rating: number,
  meta: {
    slug: string,
    fullCourseProductId?: string,
    fullCourseProductFamily?: string,
    skills?: string[],
    courseVideoPreview?: {
      link: string,
      duration: number,
      previewImageLink: string,
    },
  },
  lessons?: ILesson[]
}
