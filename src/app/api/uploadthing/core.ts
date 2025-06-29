import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
	imageUploader: f({
		image: { maxFileCount: 4, maxFileSize: "2MB" },
		video: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// .middleware(async () => {
		//   const session = await getSession();
		//   if (!session.id || !session.username) {
		//     throw new UploadThingError("Unauthorized");
		//   }

		//   return { userId: session.id };
		// })
		.onUploadComplete(async ({ metadata: _metadata, file }) => ({
			// uploadedBy: metadata.userId,
			fileId: file.key,
		})),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
