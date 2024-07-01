"use client";

import { useForm as useRHForm } from "react-hook-form";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { Textarea } from "@/components/ui/textarea";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaImage, FaPoll, FaRegSmile } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { postTweetSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachment } from "./types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export default function PostTweetForm() {
  const form = useRHForm({
    resolver: zodResolver(postTweetSchema),
  });

  const [attachment, setAttachments] = useState<Attachment>({
    type: "file",
    urls: [],
  });

  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const { startUpload, routeConfig, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    setDragging(false);
    if (attachment.type !== "file") return;
    const urls = attachment.urls;
    if (urls.length + acceptedFiles.length > 4) {
      return;
    }

    const uploadedFiles = await startUpload(acceptedFiles);

    if (!uploadedFiles) return;

    for (const uploadedFile of uploadedFiles) {
      urls.push(uploadedFile.url);
    }

    setOpen(true);
    setAttachments({
      type: "file",
      urls,
    });
  };

  const { getInputProps, getRootProps } = useDropzone({
    multiple: true,
    accept: routeConfig ? generateClientDropzoneAccept(Object.keys(routeConfig)) : undefined,
    maxFiles: 4,
    onDrop,
  });

  const handleSubmit = () => {
    if (attachment.type === "file" && attachment.urls.length > 4) {
      form.setError("text", {
        type: "max",
        message: "You can have max of 4 files",
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form>
        <div
          {...getRootProps()}
          onDragEnter={() => setDragging(true)}
          onDragExit={() => setDragging(false)}
          onClick={(e) => e.preventDefault()}
          className={
            dragging
              ? "rounded-lg border-2 border-dashed border-bluish"
              : "border-2 border-transparent"
          }
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    autosize
                    className="resize-none border-none text-lg placeholder:text-muted-foreground/80 focus-visible:!ring-0"
                    placeholder="What is happening?"
                    onFocus={() => setOpen(true)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isUploading && <Progress value={progress} className="w-full" />}
          {attachment.type === "file" && attachment.urls.length > 0 && (
            <div className="mx-auto w-5/6">
              <Carousel className="w-full max-w-md">
                <CarouselContent className="ml-2 flex gap-4">
                  {attachment.urls.map((url, i) => (
                    <Card key={i}>
                      <CardContent className="flex h-52 w-52 items-center justify-center gap-4 p-6">
                        <img
                          className="object-fit min-w-full rounded-xl"
                          src={url}
                          alt="attachment"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </CarouselContent>
                <CarouselNext className="" />
                <CarouselPrevious className="" />
              </Carousel>
            </div>
          )}
          <Input multiple max={4} {...getInputProps()} />
        </div>
        <div>
          {open && <Separator />}
          <div className="flex justify-between">
            <div className="flex items-center justify-center gap-1">
              <div
                {...getRootProps()}
                className="cursor-pointer rounded-full p-2 hover:bg-bluish/30"
              >
                <FaImage className="size-4 text-bluish" />
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                disabled={attachment.type === "file" && attachment.urls.length > 0}
                className="rounded-full p-2 hover:bg-bluish/30 disabled:!text-muted-foreground"
              >
                <FaPoll className="size-4 text-bluish" />
              </button>
              <Popover>
                <PopoverTrigger>
                  <div className="relative rounded-full p-2 hover:bg-bluish/30">
                    <FaRegSmile className="size-4 text-bluish" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="border-none bg-transparent">
                  <Picker
                    onEmojiSelect={(e: { native: string }) => {
                      form.setValue("text", (form.getValues("text") ?? "") + e.native);
                    }}
                    data={data}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-1">
              {attachment.type === "file" && attachment.urls.length > 0 && (
                <Button
                  variant="destructive"
                  className="font-bold"
                  size="default"
                  rounded="full"
                  onClick={() => {
                    setAttachments({
                      type: "file",
                      urls: [],
                    });
                  }}
                >
                  Clear
                </Button>
              )}
              <Button className="font-bold" size="default" variant="blue" rounded="full">
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
