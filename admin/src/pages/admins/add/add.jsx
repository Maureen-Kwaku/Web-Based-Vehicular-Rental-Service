import { useMutation } from "@apollo/client";
import * as React from "react";
import toast from "react-hot-toast";
import { ModalHeader, ModalFooter } from "../../../components/modal-components";
import { BasicModal } from "../../../components/modals";
import { ADD_ADMIN } from "../../../services/graphql/mutations";

const ViewComponent = ({ show, setShow, refetch }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [invokeAdd, { loading }] = useMutation(ADD_ADMIN);

  const HandleSubmit = (e) => {
    e.preventDefault();
    invokeAdd({
      variables: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
    })
      .then(() => {
        refetch();
        setShow(true);
        //send back to default
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((e) => {
        toast.error(e?.graphQLErrors[0]?.message);
      });
  };

  return (
    <React.Fragment>
      <BasicModal show={show} setShow={setShow} canClose={false} size={50}>
        <React.Fragment>
          <ModalHeader
            icon={() => (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
            label={"Add New Admin"}
            close={() => setShow(false)}
          />
          <form onSubmit={HandleSubmit}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-6">
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
                      <label htmlFor="email-address">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Name here eg. John Doe"
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Email address eg. johndoe@email.com"
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Phone NUmber</label>
                      <input
                        type="number"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Phone Number here... eg. 0545526664"
                      />
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            <ModalFooter
              negativeLabel={"Close"}
              positiveLabel={loading ? "loading..." : "Add Admin"}
              showPositive
              negativeAction={() => setShow(false)}
            />
          </form>
        </React.Fragment>
      </BasicModal>
    </React.Fragment>
  );
};

export default ViewComponent;
