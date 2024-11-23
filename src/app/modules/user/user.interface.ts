// this is the user type
export type TUser = {
  id: string;
  password: string;
  role: 'admin' | 'student' | 'faculty';
  needsPasswordChange?: boolean;
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};
