import { UserEntity } from "../entities";

export type PayloadType = {
  uuid: string;
};

export type CreateTitleType = {
  title: string;
  userId: UserEntity;
};
export interface TodoData {
  title: string;
  dueDate: Date;
  description: string;
  user: UserEntity;
}
