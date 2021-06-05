import * as React from "react";
import { EmptyAlert, ErrorAlert } from "../../components/alert";
import { usePagination } from "../../components/hooks";
import { DataLoader } from "../../components/loaders";
import Dataview from "./dataview";
import BreadCrumb from "../../components/breadcrumb";
import { useQuery } from "@apollo/client";
import { GET_RENTALS } from "../../services/graphql/queries";

const Rentals = () => {
  React.useEffect(() => {
    document.title = "List Of Rentals - Rent-A-Ride Dashboard";
  }, []);

  const { limit, setLimit, end, setEnd, skip, setSkip } = usePagination(12);
  const { data, loading, refetch } = useQuery(GET_RENTALS, {
    variables: {
      skip,
      limit,
    },
  });

  return (
    <React.Fragment>
      <div className={"mt-5"}>
        <BreadCrumb name={"Rentals"} />
      </div>

      <div className={"mt-3 border-none"}>
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {data ? (
              <>
                {data?.rentalsLength === 0 ? (
                  <>
                    <div className={"mt-10"}>
                      <EmptyAlert
                        mainMessage={"No Rentals "}
                        subMessage={
                          "You will see the list of requests here when they are made"
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Dataview
                        data={data?.rentals}
                        refetch={refetch}
                        setLimit={setLimit}
                        limit={limit}
                        total={data?.rentalsLength}
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

export default Rentals;
