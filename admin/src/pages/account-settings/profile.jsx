import * as React from "react";
import { useAuthProvider } from "../../services/context";

const Profile = () => {
  React.useEffect(() => {
    document.title = "Profile - Rent-A-Ride Dashboard";
  }, []);
  const [, data] = useAuthProvider();
  return (
    <>
      <section aria-labelledby="payment_details_heading" className={"mb-3"}>
        <form action="#" method="POST">
          <div className="">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div className="bg-white overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details of admin.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.userToken?.admin?.name || "Admin Name"}
                      </dd>
                    </div>

                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.userToken?.admin?.email || "Admin Email"}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        +{data?.userToken?.admin?.phone || "Admin Phone"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
