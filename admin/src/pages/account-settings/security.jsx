// import { ApolloError, useMutation } from "@apollo/client";
import { useMutation } from "@apollo/client";
import * as React from "react";
import { UPDATE_PASSWORD } from "../../services/graphql/mutations";
import _ from "lodash";
import toast from "react-hot-toast";

const Security = () => {
  React.useEffect(() => {
    document.title = "Security Settings - Rent-A-Ride Dashboard";
  }, []);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNew, setConfirmNew] = React.useState("");

  const [update, { loading }] = useMutation(UPDATE_PASSWORD);

  const onSubmit = (event) => {
    event.preventDefault();
    if (newPassword.trim() !== confirmNew.trim()) {
      return toast.error("Please make sure your new password is confirmed");
    }
    update({
      variables: {
        old: oldPassword,
        password: newPassword,
      },
    })
      .then(() => {
        toast.success("You successfully updated your password");
        setOldPassword("");
        setNewPassword("");
        setConfirmNew("");
      })
      .catch((e) => {
        toast.error(_.startCase(_.camelCase(e.graphQLErrors[0]?.message)));
      });
  };
  return (
    <>
      <section aria-labelledby="payment_details_heading">
        <form onSubmit={onSubmit} method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div>
                <h2
                  id="payment_details_heading"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Security Update
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password information. Please note that updating
                  your password changes the old one and you'd be expected to
                  login with the new one henceforth.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-6">
                <div className="col-span-4 sm:col-span-4">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    required
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder={"Enter Current Password here..."}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-primary-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={"Enter New Password here..."}
                    className="mt-1 block w-full border border-primary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-900 focus:border-primary-900 sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-primary-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmNew}
                    onChange={(e) => setConfirmNew(e.target.value)}
                    required
                    placeholder={"Confirm New Password here..."}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                disabled={loading}
                type="submit"
                className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {loading ? "loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Security;
