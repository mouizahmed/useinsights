import * as SliderPrimitive from "@radix-ui/react-slider";
import { clsx } from "clsx";

const SliderComponent = ({
  credits,
  setCredits,
}: {
  credits: number[];
  setCredits: React.Dispatch<React.SetStateAction<number[]>>;
}) => {

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="inline-flex space-x-2 items-center justify-center">
        <h3 className="text-2xl font-bold">{credits} credits</h3>
        <p className="text-gray-500">${(credits[0] / 10 * 4.99).toFixed(2)} one time.</p>
      </span>
      <SliderPrimitive.Root
        // defaultValue={[50]}
        min={10}
        max={100}
        step={10}
        value={credits}
        onValueChange={setCredits}
        aria-label="value"
        className="relative flex h-5 w-64 touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-black " />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-black  bg-white  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
};

export default SliderComponent;
