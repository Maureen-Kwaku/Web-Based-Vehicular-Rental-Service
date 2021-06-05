import * as React from "react";
import { EmptyAlert, ErrorAlert } from "../../components/alert";
import { usePagination } from "../../components/hooks";
import { DataLoader } from "../../components/loaders";
import Dataview from "./dataview";
import BreadCrumb from "../../components/breadcrumb";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../services/graphql/queries";
import AddCar from "./add";

const Cars = () => {
  React.useEffect(() => {
    document.title = "List Of Cars - Rent-A-Ride Dashboard";
  }, []);

  const { limit, setLimit, end, setEnd, skip, setSkip } = usePagination(12);
  const [add, setAdd] = React.useState(false);

  const { data, loading, refetch } = useQuery(GET_CARS, {
    variables: {
      skip,
      limit,
    },
  });

  return (
    <React.Fragment>
      <div className={"mt-5 flex justify-between items-center"}>
        <div>
          {" "}
          <BreadCrumb name={"Cars"} />
        </div>
        <div>
          <FAB
            onClick={() => {
              setAdd(true);
            }}
          />
        </div>
      </div>

      <div className={"mt-3 border-none"}>
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {data ? (
              <>
                {data?.carsLength === 0 ? (
                  <>
                    <div className={"mt-10"}>
                      <EmptyAlert
                        mainMessage={"No Cars"}
                        subMessage={
                          "You will see the list of cars here when they get uploaded"
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Dataview
                        data={data?.cars}
                        refetch={refetch}
                        setLimit={setLimit}
                        limit={limit}
                        total={data?.carsLength}
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
      {/* <div className={"absolute bottom-10 right-10 border-none"}>
        <FAB
          onClick={() => {
            setAdd(true);
          }}
        />
      </div> */}
      <AddCar show={add} setShow={setAdd} refetch={refetch} />
    </React.Fragment>
  );
};

const FAB = ({ onClick }) => {
  return (
    <React.Fragment>
      <div
        onClick={onClick}
        className={
          "bg-yellow-500 flex flex-row items-center px-3 py-2 rounded-md border-none cursor-pointer"
        }
      >
        <div>
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

        <div className={"text-white"}>Add</div>
      </div>
    </React.Fragment>
  );
};

export default Cars;
