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

// サイト構造を考える
// 1. トップページ
// 2. ログインページ
// 3. 新規登録ページ
// 4. メインページ
// 5. 予算設定ページ
// 6. 支出入力ページ
// 7. カテゴリ別支出ページ
// 8. 通知設定ページ
