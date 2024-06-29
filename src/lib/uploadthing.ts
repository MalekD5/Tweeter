import { generateReactHelpers } from "@uploadthing/react";

import type { FileRouterType } from "@/app/api/upload/core";

export const { useUploadThing } = generateReactHelpers<FileRouterType>();
