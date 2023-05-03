import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function NoReceipts() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-xl hover:bg-slate-50 "
    >
      <PlusCircleIcon className="h-8 w-8 text-secondary" />
      <span className="mt-2 block text-sm font-semibold text-slate-900">
        Save your first receipt
      </span>
    </button>
  );
}
