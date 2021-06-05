import { Fragment } from "react";

const ExternalLink = ({ children, href, className }) => {
  return (
    <Fragment>
      <a href={href} target={"_blank"} rel="noreferrer" className={className}>
        {children}
      </a>
    </Fragment>
  );
};

export default ExternalLink;
