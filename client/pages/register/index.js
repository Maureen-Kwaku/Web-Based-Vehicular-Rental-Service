import { Fragment, useState } from "react";
import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/headerForProduct";
import { storage } from "../../lib/config/firebase";
import { toaster } from "evergreen-ui";
import { withApollo } from "../../lib/apollo";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../lib/graphql/mutations";
import { useAuthContext } from "../_app";

const Register = () => {
  const [{ signIn }] = useAuthContext();

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [invokeAdd, { loading }] = useMutation(CREATE_USER);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toaster.notify("Please select an image");
    if (password.trim() !== confirm.trim())
      return toaster.notify("Please make sure your passwords are equal");

    setUpload(true);
    let fileName = new Date().toString() + file.name;
    const uploadTask = storage.ref(`users/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setUpload(false);
        return toaster.notify(error?.message);
      },
      () => {
        storage
          .ref("users")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            setUpload(false);
            //hit server
            invokeAdd({
              variables: {
                name,
                email,
                phone: `233${phone.slice(-9)}`,
                address,
                photo: url,
                password,
              },
            })
              .then(async ({ data }) => {
                await signIn(data?.createUser);
                location.href = "/";
              })
              .catch((e) => {
                setUpload(false);
                console.log(e);
                toaster.notify(e?.graphQLErrors?.[0]?.message);
              });
          });
      }
    );
  };
  return (
    <Fragment>
      <Head>
        <title>Register | Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>
        <div className={"bg-yellow-400"}>
          <Header />

          <section className={"sectionLogin"}>
            <div class="mainLogin ">
              <div class="user SignIn ">
                <div class="formBox">
                  <form onSubmit={HandleSubmit}>
                    <h2> Create Account </h2>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files[0] !== undefined) {
                          setFile(e.target.files[0]);
                        } else {
                          setFile(file);
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e?.target?.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e?.target?.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e?.target?.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      required
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e?.target?.value)}
                      placeholder="Create Password"
                      id="RegPass"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      id="RegConPass"
                      value={confirm}
                      onChange={(e) => setConfirm(e?.target?.value)}
                      required
                    />
                    <input
                      type="submit"
                      class="submit"
                      value={
                        upload
                          ? "Uploading..."
                          : loading
                          ? "Loading..."
                          : "Register"
                      }
                    />
                    <p class="register">
                      {" "}
                      <b>Already have an Account ?</b>
                      <a href="/login" onclick="javascript:doToggle();">
                        {" "}
                        Log In{" "}
                      </a>
                    </p>
                  </form>
                </div>
                <div class="imageBox">
                  <img
                    src="/images/car-rental3.jpg"
                    alt=""
                    // style={{ backgroundPosition: "10% " }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default withApollo({ ssr: true })(Register);
