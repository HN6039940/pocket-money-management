import { Link } from "react-router-dom";
import { PropsWithChildren, ComponentPropsWithoutRef } from "react";

type BtnProps = PropsWithChildren<{
  kind: "login" | "signup";
  className?: string;
}> &
  ComponentPropsWithoutRef<"button">;

const SignBtn = ({ children, kind, ...props }: BtnProps) => {
  return (
    <Link to={`/${kind}`}>
      <button {...props}>{children}</button>
    </Link>
  );
};

export default SignBtn;
