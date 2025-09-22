import DakshaAssistant from "@/components/daksha/DakshaAssistant";

export const metadata = {
  title: "Daksha Assistant",
  description: "Your connected AI workspace",
};

export default function Page() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <DakshaAssistant />
    </div>
  );
}

