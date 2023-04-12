export interface MessageType {
  messageOwner: string | "Chat Bot";
  message: string;
  time?: Date;
  isLoading: boolean;
}
