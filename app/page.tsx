import Title from "@/app/components/title";
import Viewport from "@/app/components/viewport";
import NavigationContextProvider from "./context/navigation-context";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full">
      <NavigationContextProvider>
        <Title />
        <Viewport />
      </NavigationContextProvider>
    </div>
  );
}
