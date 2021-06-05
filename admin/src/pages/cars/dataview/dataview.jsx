import * as React from "react";
import ApprovalCard from "./card";
import TopTableComponent from "./top";
import ViewComponent from "../view";
import EditComponent from "../edit";

const DataView = ({
  limit,
  data,
  total,
  end,
  setEnd,
  skip,
  setSkip,
  refetch,
  setLimit,
}) => {
  const [selected, setSelected] = React.useState(null);
  const [showView, setShowView] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [page, setPage] = React.useState([1]);
  React.useEffect(() => {
    let p = [];
    for (let i = 0; i < Math.ceil(total / limit); i++) {
      p.push(i + 1);
    }
    setPage(p);
  }, [limit, total]);
  return (
    <React.Fragment>
      <div className="hidden mt-8 sm:block">
        <TopTableComponent
          limit={limit}
          refetch={refetch}
          setLimit={setLimit}
          setSkip={setSkip}
          setEnd={setEnd}
          skip={skip}
          // setSearch={setSearch}
        />
        <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((a, i) => (
            <React.Fragment key={i}>
              <ApprovalCard
                data={a}
                view={() => {
                  setSelected(a);
                  setShowView(true);
                }}
                edit={() => {
                  setSelected(a);
                  setShowEdit(true);
                }}
              />
            </React.Fragment>
          ))}
        </ul>
      </div>

      <nav className="mt-2 px-4 py-3 flex items-center justify-between sm:px-6">
        <div className="hidden sm:block">
          <p className="text-sm font-light leading-5 text-gray-700">
            Showing
            <span className="font-medium mx-3">{skip + 1}</span>
            to
            <span className="font-medium mx-3">
              {end > total ? total : end}
            </span>
            of
            <span className=" font-medium mx-3">{total}</span>
            results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end items-center">
          <nav className="relative z-0 inline-flex shadow-sm">
            <button
              disabled={skip === 0}
              onClick={(e) => {
                e.preventDefault();
                setSkip(skip - limit);
                setEnd(skip - limit);
              }}
              type="button"
              className={`relative inline-flex ${
                skip === 0 && "cursor-not-allowed opacity-50"
              } items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
              aria-label="Previous"
            >
              <svg
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevrons-right"
              >
                <path d="M11 17L6 12 11 7" />
                <path d="M18 17L13 12 18 7" />
              </svg>
            </button>

            {page.map((p, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSkip(i * limit);
                  }}
                  type="button"
                  className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSkip(skip + limit);
                setEnd(skip + limit);
              }}
              disabled={skip + limit >= total}
              className={`-ml-px relative inline-flex ${
                end >= total && "cursor-not-allowed opacity-50"
              } items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
              aria-label="Next"
            >
              <svg
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevrons-right"
              >
                <path d="M13 17L18 12 13 7" />
                <path d="M6 17L11 12 6 7" />
              </svg>
            </button>
          </nav>
        </div>
      </nav>
      <ViewComponent
        show={showView}
        setShow={setShowView}
        data={selected}
        refetch={refetch}
      />
      <EditComponent
        show={showEdit}
        setShow={setShowEdit}
        data={selected}
        refetch={refetch}
      />
    </React.Fragment>
  );
};

export default DataView;