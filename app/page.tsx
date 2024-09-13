import Title from "@/app/components/title";
import Viewport from "@/app/components/viewport";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full">
      <Title />
      <Viewport />
    </div>
  );
}
