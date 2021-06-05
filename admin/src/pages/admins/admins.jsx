import * as React from "react";
import { EmptyAlert, ErrorAlert } from "../../components/alert";
import { usePagination } from "../../components/hooks";
import { DataLoader } from "../../components/loaders";
import Dataview from "./dataview";
import BreadCrumb from "../../components/breadcrumb";
import { useQuery } from "@apollo/client";
import { GET_ADMINS } from "../../services/graphql/queries";
import AddAdmin from "./add";

const Admins = () => {
  React.useEffect(() => {
    document.title = "List Of Adminisitrators - Rent-A-Ride Dashboard";
  }, []);
  const [add, setAdd] = React.useState(false);

  const { limit, setLimit, end, setEnd, skip, setSkip } = usePagination(12);
  const { data, loading, refetch } = useQuery(GET_ADMINS, {
    variables: {
      skip,
      limit,
    },
  });
  return (
    <React.Fragment>
      <div className={"mt-5"}>
        <BreadCrumb name={"Administrators"} />
      </div>

      <div className={"mt-3 border-none"}>
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {data ? (
              <>
                {data?.adminsLength === 0 ? (
                  <>
                    <div className={"mt-10"}>
                      <EmptyAlert
                        mainMessage={"No Admins"}
                        subMessage={
                          "You will see the list of admins here when they are created"
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Dataview
                        data={data?.admins}
                        refetch={refetch}
                        setLimit={setLimit}
                        limit={limit}
                        total={data?.adminsLength}
                        skip={skip}
                        setSkip={setSkip}
                        end={end}
                        setEnd={setEnd}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <ErrorAlert
                subMessage={""}
                buttonAvail
                buttonAction={() => {
                  refetch();
                }}
                buttonLabel={"Refresh"}
              />
            )}
          </>
        )}
      </div>
      <div className={"absolute bottom-10 right-10 border-none"}>
        <FAB
          onClick={() => {
            setAdd(true);
          }}
        />
      </div>
      <AddAdmin show={add} setShow={setAdd} refetch={refetch} />
    </React.Fragment>
  );
};

const FAB = ({ onClick }) => {
  return (
    <React.Fragment>
      <div
        onClick={onClick}
        className={"bg-yellow-700 p-3 rounded-full border-none cursor-pointer"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Admins;
