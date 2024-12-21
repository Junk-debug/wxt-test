import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function App() {
  return (
    <>
      <div id="app" className="bg-red-500 text-foreground">
        <Button onClick={() => toast.message("hello")}>Click me</Button>
      </div>
      <Toaster />
    </>
  );
}
