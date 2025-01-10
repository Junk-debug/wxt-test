import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast, Toaster } from "sonner";

const closeApp = () => {
  console.log("close app");
  chrome.runtime.sendMessage({ type: "CLOSE_APP" });
};

export default function App() {
  return (
    <>
      <div
        id="app"
        className="bg-white text-foreground absolute inset-0 flex items-center justify-center z-50 w-72 h-56"
      >
        <button
          onClick={closeApp}
          title="Close"
          className="absolute top-0 right-0 p-2"
        >
          <X />
        </button>
        <Button onClick={() => toast.message("hello")}>Click me</Button>
      </div>
      <Toaster />
    </>
  );
}
