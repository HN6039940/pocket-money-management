import SignBtn from "../../components/Btn/SignBtn";
import NavBar from "../../components/NavBar";

const TopPage = () => {
  return (
    <section className="min-h-dvh">
      <NavBar />
      <div className=" container mx-auto">
        <div className=" mt-10 px-3 py-3">
          <h1 className="  text-center text-2xl font-bold  text-slate-900">
            予算管理を通じて
            <br />
            より豊かな生活へ
          </h1>
          <div className=" mt-5 flex justify-center gap-2">
            <SignBtn
              kind="signup"
              className="rounded-md bg-charcoal-primary p-3 font-bold  text-white"
            >
              新規登録
            </SignBtn>
            <SignBtn
              kind="login"
              className=" rounded-md bg-slate-100 p-3 font-bold  text-charcoal-primary"
            >
              ログイン
            </SignBtn>
          </div>
        </div>
        <div className="mt-8 px-3 py-3">
          <h2 className="text-center text-lg font-semibold text-charcoal-primary">
            このアプリについて
          </h2>
          <p className="mt-3 text-center text-base text-slate-700">
            このアプリは予算管理をサポートし、より豊かな生活を実現するためのツールです。
          </p>
        </div>
        <div className="mt-8 px-3 py-3">
          <h2 className="text-center text-lg font-semibold text-charcoal-primary">
            アプリの特徴
          </h2>
          <ul className="mt-3 text-center text-base text-slate-700">
            <li>簡単に予算を設定・管理できます</li>
            <li>支出をカテゴリ別に分析できます</li>
            <li>予算超過を防ぐための通知機能があります</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopPage;
