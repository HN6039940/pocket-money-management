import { ComponentPropsWithoutRef } from "react";

type HamburgerMenuProps = ComponentPropsWithoutRef<"div">;

const HamburgerMenu = (props: HamburgerMenuProps) => {
  return (
    <div
      {...props}
      className=" flex size-10 flex-col items-center justify-center gap-1  md:invisible md:hidden"
    >
      <div className=" h-1 w-1/2 rounded-sm bg-orange-200"></div>
      <div className=" h-1 w-1/2 rounded-sm bg-orange-200"></div>
      <div className=" h-1 w-1/2 rounded-sm bg-orange-200"></div>
    </div>
  );
};

export default HamburgerMenu;
