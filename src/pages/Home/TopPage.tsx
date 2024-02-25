import SignBtn from "../../components/Btn/SignBtn";
import NavBar from "../../components/Navigation/NavBar";

const TopPage = () => {
  return (
    <section className="min-h-dvh ">
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
              className="rounded-md bg-gray-800 p-3 font-bold  text-white
              transition-all duration-300 ease-in-out hover:border-gray-800 hover:bg-gray-600  hover:shadow-lg
              "
            >
              新規登録
            </SignBtn>
            <SignBtn
              kind="login"
              className="rounded-md border-2 bg-primary-color p-3  font-bold
              text-white transition-all duration-300 ease-in-out hover:border-primary-color hover:bg-white
              hover:text-primary-color hover:shadow-lg 
              "
            >
              ログイン
            </SignBtn>
          </div>
        </div>
        <div className="mt-8 px-3 py-3">
          <h2 className="text-charcoal-primary text-center text-lg font-semibold">
            このアプリについて
          </h2>
          <p className="mt-3 text-center text-base text-slate-700">
            このアプリはお小遣いの管理をサポートし、貴方がどのくらい
            お金を使っているかを把握し、より豊かな生活を
            実現するためのツールです。
          </p>
        </div>
        <div className="mt-8 px-3 py-3">
          <h2 className="text-charcoal-primary text-center text-lg font-semibold">
            アプリの特徴
          </h2>
          <ul className="mt-3 text-center text-base text-slate-700">
            <li>収入と支出を記録できます</li>
            <li>記録したデータをグラフで確認できます</li>
            <li>支出をカテゴリ別に分類できます</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopPage;
