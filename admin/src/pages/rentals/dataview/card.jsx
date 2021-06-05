import { Fragment } from "react";
import { format } from "date-fns";
import cn from "classnames";
import ExternalLink from "../../../components/external-link";
import { differenceInHours } from "date-fns";
import { useMutation } from "@apollo/client";
import {
  APPROVE_RENTAL,
  CANCEL_RENTAL,
  DROP_OFF_RENTAL,
  PICKUP_RENTAL,
} from "../../../services/graphql/mutations";
import toast from "react-hot-toast";
import { ClassicSpinner } from "react-spinners-kit";

const RentalCard = ({ data, view, refetch }) => {
  const [invokeCancel, { loading: loadCancel }] = useMutation(CANCEL_RENTAL);
  const [invokeApprove, { loading: loadApprove }] = useMutation(APPROVE_RENTAL);
  const [invokePickup, { loading: loadPickup }] = useMutation(PICKUP_RENTAL);
  const [invokeDropoff, { loading: loadDropoff }] = useMutation(
    DROP_OFF_RENTAL
  );
  const cancel = () => {
    invokeCancel({
      variables: {
        id: data?._id,
      },
    })
      .then(() => {
        refetch();
        toast.success("Cancelled Request successfully");
      })
      .catch((e) => {
        toast.error(e?.graphQLErrors[0]?.message);
      });
  };
  const accept = () => {
    invokeApprove({
      variables: {
        id: data?._id,
      },
    })
      .then(() => {
        refetch();
        toast.success("Approve Request successfully");
      })
      .catch((e) => {
        toast.error(e?.graphQLErrors[0]?.message);
      });
  };
  const pickup = () => {
    invokePickup({
      variables: {
        id: data?._id,
      },
    })
      .then(() => {
        refetch();
        toast.success("Picked up ride successfully");
      })
      .catch((e) => {
        toast.error(e?.graphQLErrors[0]?.message);
      });
  };
  const dropoff = () => {
    invokeDropoff({
      variables: {
        id: data?._id,
      },
    })
      .then(() => {
        refetch();
        toast.success("Ride returned  successfully");
      })
      .catch((e) => {
        toast.error(e?.graphQLErrors[0]?.message);
      });
  };
  return (
    <Fragment>
      <tr>
        <td className="px-6 py-4 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex items-center space-x-3 lg:pl-2">
            <ExternalLink
              href={
                data?.createdBy?.photo ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ah3lxr8uqw&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              className={"bg-gray-800 rounded-full"}
            >
              <img
                className="h-7 w-7 rounded-full"
                src={
                  data?.createdBy?.photo ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ah3lxr8uqw&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt=""
              />
            </ExternalLink>
            <span>{data?.createdBy?.name || "N/A"}</span>
          </div>
        </td>
        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
          {data?.car?.plateNumber || "N/A"}
        </td>
        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
          {(data?.amount / 100).toFixed(2) || "N/A"}
        </td>
        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
          {differenceInHours(
            new Date(data?.dropoff?.at),
            new Date(data?.pickup?.at)
          )}
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
          <span
            className={cn(
              "inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
            )}
          >
            {data?.status}
          </span>
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
          {format(new Date(data?.createdAt), "PPp")}
        </td>
        <td className="pr-6">
          <div className=" flex justify-end items-center">
            <button
              onClick={view}
              id="project-options-menu-0"
              aria-haspopup="true"
              type="button"
              className="w-8 h-8 bg-white inline-flex items-center justify-center text-blue-400 rounded-full hover:text-blue-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open options</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            {data?.status === "Requested" && (
              <Fragment>
                {loadCancel ? (
                  <Fragment>
                    <ClassicSpinner size={10} color={"red"} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      onClick={cancel}
                      title={"Cancel Request"}
                      id="project-options-menu-0"
                      aria-haspopup="true"
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-red-400 rounded-full hover:text-red-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open options</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </Fragment>
                )}
              </Fragment>
            )}
            {data?.status === "Paid" && (
              <Fragment>
                {loadApprove ? (
                  <Fragment>
                    <ClassicSpinner size={10} color={"red"} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      onClick={accept}
                      title={"Accept Request"}
                      id="project-options-menu-0"
                      aria-haspopup="true"
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-green-400 rounded-full hover:text-green-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open options</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </Fragment>
                )}
              </Fragment>
            )}
            {data?.status === "Accepted" && (
              <Fragment>
                {loadPickup ? (
                  <Fragment>
                    <ClassicSpinner size={10} color={"red"} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      onClick={pickup}
                      title={"Pickup"}
                      id="project-options-menu-0"
                      aria-haspopup="true"
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-yellow-400 rounded-full hover:text-yellow-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open options</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </Fragment>
                )}
              </Fragment>
            )}
            {data?.status === "PickedUp" && (
              <Fragment>
                {loadDropoff ? (
                  <Fragment>
                    <ClassicSpinner size={10} color={"red"} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <button
                      onClick={dropoff}
                      title={"Dropoff"}
                      id="project-options-menu-0"
                      aria-haspopup="true"
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-green-400 rounded-full hover:text-green-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open options</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </button>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default RentalCard;
