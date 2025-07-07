import apiSlice from "./ApiSlice";
import type { TApiResponse, TSnapshotInfo } from "./types";

const snapshotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSnapshot: builder.mutation<TApiResponse<TSnapshotInfo>, Partial<TSnapshotInfo>>({
      query: (snapshot) => ({
        url: "api/snapshot",
        method: "POST",
        body: snapshot,
      }),
      invalidatesTags: ["snapshot"],
    }),

    readSnapshot: builder.query<TSnapshotInfo[], { snapshotId?: string }>({
      query: ({ snapshotId }) => ({
        url: `api/snapshot`,
        method: "GET",
        params: { snapshotId },
      }),
      providesTags: ["snapshot"],
    }),

    updateSnapshot: builder.mutation<
      TApiResponse<TSnapshotInfo>,
      { params: { snapshotId: string }; body: Partial<TSnapshotInfo> }
    >({
      query: ({ params, body }) => ({
        url: `api/snapshot`,
        method: "PUT",
        params: params,
        body: body,
      }),
      invalidatesTags: ["snapshot"],
    }),

    deleteSnapshot: builder.mutation<TApiResponse<TSnapshotInfo>, { snapshotId: string }>({
      query: ({ snapshotId }) => ({
        url: `api/snapshot`,
        method: "DELETE",
        params: { snapshotId },
      }),
      invalidatesTags: ["snapshot"],
    }),
  }),
});

export const {
  useCreateSnapshotMutation,
  useReadSnapshotQuery,
  useLazyReadSnapshotQuery,
  useUpdateSnapshotMutation,
  useDeleteSnapshotMutation,
} = snapshotApiSlice;
