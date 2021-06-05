import * as React from "react";
import { BasicModal } from "../../components/modals";
import { ModalHeader, ModalFooter } from "../../components/modal-components";
import { useAuthProvider } from "../../services/context";
import { useHistory } from "react-router-dom";

const SingoutModal = ({ setShow, show }) => {
  const [{ signOut }] = useAuthProvider();
  const { push } = useHistory();
  return (
    <React.Fragment>
      <BasicModal show={show} setShow={setShow}>
        <ModalHeader
          icon={() => (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
          label={"Logout Request"}
          close={() => setShow(false)}
        />
        <div className={"px-3 py-5"}>
          <span>Are you sure you want to logout?</span>
        </div>

        <ModalFooter
          showPositive
          positiveAction={() => {
            signOut();
            push("/login");
          }}
          positiveLabel={"Yes, Logout!"}
          negativeLabel={"Close"}
          negativeAction={() => setShow(false)}
        />
      </BasicModal>
    </React.Fragment>
  );
};

export default SingoutModal;
