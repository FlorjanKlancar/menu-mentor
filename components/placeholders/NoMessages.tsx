import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function NoMessages() {
  return (
    <div className="flex h-80 flex-col items-center justify-center text-center text-slate-700">
      <ChatBubbleLeftRightIcon className="h-8 w-8" />
      <h3 className="mt-2 text-sm font-semibold">No Conversation Yet</h3>
      <p className="mt-1 text-sm text-slate-500">
        Get started by asking your assistant.
      </p>
    </div>
  );
}
