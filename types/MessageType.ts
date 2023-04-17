export interface MessageType {
  messageOwner: string | "Chat Bot";
  message: string;
  time?: string;
  isLoading: boolean;
}
