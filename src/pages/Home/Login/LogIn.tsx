import NavBar from "../../../components/NavBar";
import SignForm from "../../../components/Form/SignForm";
const LoginPage = () => {
  return (
    <section className=" min-h-dvh">
      <NavBar />
      <SignForm kind="login" />
    </section>
  );
};

export default LoginPage;
