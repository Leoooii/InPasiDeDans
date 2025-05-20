import { ChevronDown } from 'lucide-react';

export default function ScrollDownArrows() {
  return (
    <div className="w-full flex justify-center items-center pb-6 animate-pulse text-red-600">
      <div className="flex flex-col items-center space-y-1">
        {/* <ChevronDown className="w-10 h-10" size={10} /> */}
        <ChevronDown className="w-10 h-10" size={10} />
        <ChevronDown className="w-10 h-10" size={10} />
      </div>
    </div>
  );
}
