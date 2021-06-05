import { useMutation } from "@apollo/client";
import { Fragment, useState, useEffect } from "react";
import { CREATE_FEEDBACK } from "../lib/graphql/mutations";
import { toaster } from "evergreen-ui";
import { useAuthContext } from "../pages/_app";

const FeedBack = ({ refetch }) => {
  const [, userData] = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [invokerCreation, { loading }] = useMutation(CREATE_FEEDBACK);

  useEffect(() => {
    if (userData) {
      setName(userData?.userToken?.user?.name);
      setEmail(userData?.userToken?.user?.email);
    }
  }, [userData]);

  const HandleSubmit = (e) => {
    e.preventDefault();

    invokerCreation({
      variables: {
        name,
        email: email || undefined,
        message,
      },
    })
      .then(() => {
        refetch();
        toaster.success("Submitted successfully");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((e) => {
        toaster.warning(e?.graphQLErrors[0]?.message);
      });
  };
  return (
    <Fragment>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          name="full-name"
          value={name}
          onChange={(e) => setName(e?.target?.value)}
          required
          placeholder="Enter Full Name (Required)"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          name="email"
          placeholder="E-mail Address (Optional)"
        />
        <textarea
          name="comments"
          required
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
          className={"border border-gray-600"}
          placeholder="Type Your Comment (Required)"
        ></textarea>
        <button
          disabled={loading}
          type="submit"
          class="btn"
          style={{ background: "rgb(233, 174, 64)" }}
        >
          {loading ? "Submitting..." : " Submit Comment"}
        </button>
      </form>
    </Fragment>
  );
};

export default FeedBack;
