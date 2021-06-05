import * as React from "react";
import { ModalHeader, ModalFooter } from "../../../components/modal-components";
import { BasicModal } from "../../../components/modals";
import { format } from "date-fns";

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
            label={"Details of " + data?.name}
            close={() => setShow(false)}
          />
          <div>
            <div>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Car</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.car?.make} {data?.car?.model}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pickup Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.pickup?.address}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pickup At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data && format(new Date(data?.pickup?.at), "PPp")}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Dropoff Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.dropoff?.address}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Dropoff At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data && format(new Date(data?.dropoff?.at), "PPp")}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        GHS {(data?.amount / 100).toFixed(2)}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span
                          className={
                            "inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                          }
                        >
                          {data?.status}
                        </span>
                      </dd>
                    </div>
                    {data?.status === "Paid" && (
                      <React.Fragment>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Paid At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data && format(new Date(data?.paidAt), "PPp")}
                          </dd>
                        </div>
                      </React.Fragment>
                    )}
                    {data?.status === "Accepted" && (
                      <React.Fragment>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Accepted At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data &&
                              format(new Date(data?.accepted?.at), "PPp")}
                          </dd>
                        </div>
                      </React.Fragment>
                    )}
                    {data?.status === "PickedUp" && (
                      <React.Fragment>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            PickedUp At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data && format(new Date(data?.pickedUpAt), "PPp")}
                          </dd>
                        </div>
                      </React.Fragment>
                    )}
                    {data?.status === "DroppedOff" && (
                      <React.Fragment>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            DroppedOff At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data &&
                              format(new Date(data?.droppedOffAt), "PPp")}
                          </dd>
                        </div>
                      </React.Fragment>
                    )}
                    {data?.status === "Cancelled" && (
                      <React.Fragment>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Cancelled At
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data &&
                              format(new Date(data?.cancellation?.at), "PPp")}
                          </dd>
                        </div>
                      </React.Fragment>
                    )}
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
