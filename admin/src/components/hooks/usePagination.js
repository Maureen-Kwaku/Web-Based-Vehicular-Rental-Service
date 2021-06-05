import * as React from "react";

const usePagination = (getLimit) => {
  const [limit, setLimit] = React.useState(getLimit);
  const [skip, setSkip] = React.useState(0);
  const [end, setEnd] = React.useState(0);

  React.useEffect(() => {
    setEnd(skip + limit);
  }, [limit, skip]);

  return { limit, setLimit, skip, setSkip, end, setEnd };
};

export default usePagination;
