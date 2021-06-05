import * as React from "react";
import { ModalHeader, ModalFooter } from "../../../components/modal-components";
import { BasicModal } from "../../../components/modals";
import { format } from "date-fns";
import cn from "classnames";

const ViewComponent = ({ show, setShow, data }) => {
  return (
    <React.Fragment>
      <BasicModal show={show} setShow={setShow} size={50}>
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
            label={"Details of " + data?.make}
            close={() => setShow(false)}
          />
          <div>
            <div>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Make
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.make}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Model
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.model}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Chassis Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.chassis || "N/A"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Vin</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.vin || "N/A"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Plate Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.plateNumber}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span
                          className={cn(
                            "px-2 py-1  text-xs font-medium  rounded-full",
                            {
                              "text-green-800 bg-green-100":
                                data?.status === "Available",
                              "text-yellow-800 bg-yellow-100":
                                data?.status === "Rented",
                            }
                          )}
                        >
                          {data?.status}
                        </span>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Price Per Hour
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        GH&cent;{" "}
                        {data?.price
                          ? `${(data?.price / 100).toFixed(2)}`
                          : "N/A"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Created At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data && format(new Date(data?.createdAt), "PPp")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <ModalFooter
                showApprove={
                  data?.status === "pending" || data?.status === "denied"
                }
                approve={() => {}}
                deny={() => {}}
                revoke={() => {}}
                showDeny={data?.status === "pending"}
                showRevoke={data?.status === "approved"}
                negativeLabel={"Close"}
                negativeAction={() => setShow(false)}
              />
            </div>
          </div>
        </React.Fragment>
      </BasicModal>
    </React.Fragment>
  );
};

export default ViewComponent;
