export type Poll = {
  options: string[];
  endDate: Date;
};

export type Attachment =
  | {
      type: "file";
      urls: string[];
    }
  | {
      type: "poll";
      poll: Poll;
    };
