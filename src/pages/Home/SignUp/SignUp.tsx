import NavBar from "../../../components/NavBar";
import SignForm from "../../../components/Form/SignForm";
const SignUp = () => {
  return (
    <section className=" min-h-dvh">
      <NavBar />
      <SignForm kind="signup" />
    </section>
  );
};

export default SignUp;
