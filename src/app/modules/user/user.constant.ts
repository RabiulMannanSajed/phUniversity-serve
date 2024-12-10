export const USER_ROLE = {
  admin: 'admin',
  student: 'student',
  faculty: 'faculty',
} as const; // this as const user naver can change

export type TUserRole = keyof typeof USER_ROLE;
