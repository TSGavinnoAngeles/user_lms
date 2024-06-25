import React from "react";

interface CountdownItemProps {
  num: string;
  unit: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ num, unit }) => {
  return (
    <div className="flex h-24 w-1/2 flex-col items-center justify-center gap-1  border-slate-200 font-mono md:h-36 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl">
          {num}
        </span>
      </div>
      <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
        {unit}
      </span>
    </div>
  );
};

export default CountdownItem;
