import apiSlice from "./ApiSlice";

const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadSnapshot: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "api/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useUploadSnapshotMutation } = uploadApiSlice;
