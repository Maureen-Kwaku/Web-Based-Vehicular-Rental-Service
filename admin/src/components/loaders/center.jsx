import * as React from "react";
import { ClapSpinner } from "react-spinners-kit";

const CenterLoaders = () => {
  return (
    <React.Fragment>
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <ClapSpinner frontColor={"#193F5E"} size={30} loading={true} />
      </div>
    </React.Fragment>
  );
};

export default CenterLoaders;
