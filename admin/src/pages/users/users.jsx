import * as React from "react";
import { EmptyAlert, ErrorAlert } from "../../components/alert";
import { usePagination } from "../../components/hooks";
import { DataLoader } from "../../components/loaders";
import Dataview from "./dataview";
import BreadCrumb from "../../components/breadcrumb";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../services/graphql/queries";

const Users = () => {
  React.useEffect(() => {
    document.title = "List Of Users - Rent-A-Ride Dashboard";
  }, []);

  const { limit, setLimit, end, setEnd, skip, setSkip } = usePagination(12);

  const { data, loading, refetch } = useQuery(GET_USERS, {
    variables: {
      skip,
      limit,
    },
  });

  return (
    <React.Fragment>
      <div className={"mt-5"}>
        <BreadCrumb name={"Users"} />
      </div>

      <div className={"mt-3 border-none"}>
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {data ? (
              <>
                {data?.usersLength === 0 ? (
                  <>
                    <div className={"mt-10"}>
                      <EmptyAlert
                        mainMessage={"No Users"}
                        subMessage={
                          "You will see the list of users here when they register"
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Dataview
                        data={data?.users}
                        refetch={refetch}
                        setLimit={setLimit}
                        limit={limit}
                        total={data?.usersLength}
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
    </React.Fragment>
  );
};

export default Users;
