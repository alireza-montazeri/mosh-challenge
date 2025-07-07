export type TSnapshotInfo = {
  _id: string;
  title: string;
  description: string;
  front: string;
  top: string;
  createdAt: string;
  updatedAt: string;
};

export type TApiResponse<T> = {
  message: string;
  data?: T;
};
