export type MessageInfo =
  | {
      type: "Sending";
      sender: string;
      message: string;
    }
  | {
      type: "Typing";
    };
