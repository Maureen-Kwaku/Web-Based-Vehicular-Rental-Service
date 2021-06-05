import * as React from "react";
import { ClapSpinner } from "react-spinners-kit";

const DataLoader = () => {
  return (
    <React.Fragment>
      <div
        style={{
          height: "55vh",
          width: "80vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        className={"font-light"}
      >
        <ClapSpinner frontColor={"#193F5E"} size={30} loading={true} />
      </div>
    </React.Fragment>
  );
};

export default DataLoader;
