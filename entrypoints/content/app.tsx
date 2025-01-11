import { Button } from "@/components/ui/button";
import { MessageListener, Messages } from "@/lib/messages";
import { X } from "lucide-react";
import { toast, Toaster } from "sonner";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;

  return (
    <div
      id="app"
      className="bg-white text-foreground absolute inset-0 flex items-center justify-center z-[calc(pow(99,99999999999999))] w-72 h-56"
    >
      <button
        onClick={onClose}
        title="Close"
        className="absolute top-0 right-0 p-2"
      >
        <X />
      </button>
      <Button onClick={() => toast.message("hello")}>Click me</Button>
    </div>
  );
};

export default function App() {
  const [open, setOpen] = useState(false);

  console.log("[app] App rendered", { open });

  useEffect(() => {
    console.log("[app] App mounted");

    const listener: MessageListener = ({ type }) => {
      switch (type) {
        case Messages.OPEN_SIDEBAR:
          setOpen(true);
          break;
        case Messages.CLOSE_SIDEBAR:
          setOpen(false);
          break;
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => {
      console.log("[app] App unmounted");
    };
  }, []);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} />
      <Toaster />
    </>
  );
}
