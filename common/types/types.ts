import { UserType } from "./enums";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  isActive: boolean;
};
