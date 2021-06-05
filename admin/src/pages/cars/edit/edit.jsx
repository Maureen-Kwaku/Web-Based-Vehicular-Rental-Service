import { useMutation } from "@apollo/client";
import * as React from "react";
import toast from "react-hot-toast";
import { ModalHeader, ModalFooter } from "../../../components/modal-components";
import { BasicModal } from "../../../components/modals";
import { UPDATE_CAR } from "../../../services/graphql/mutations";
import { storage } from "../../../services/config/firebase";

const ViewComponent = ({ show, setShow, refetch, data }) => {
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [chassis, setChassis] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [plateNumber, setPlateNumber] = React.useState("");
  const [upload, setUpload] = React.useState(false);
  const [file] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setMake(data?.make || "");
      setModel(data?.model || "");
      setPrice(data?.price ? data?.price / 100 : "");
      setFeatured(data?.featured ? "yes" : "no");
      setChassis(data?.chassis || "");
      setVin(data?.vin || "");
      setDescription(data?.description || "");
      setPlateNumber(data?.plateNumber || "");
    }
  }, [data]);

  const [invokeUpdate, { loading }] = useMutation(UPDATE_CAR);

  const HandleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!file) {
      invokeUpdate({
        variables: {
          id: data?._id,
          featured: featured === "yes",
          make,
          price: parseFloat(price) * 100,
          model,
          chassis: chassis || undefined,
          vin: vin || undefined,
          description: description || undefined,
          plateNumber,
        },
      })
        .then(() => {
          refetch();
          setShow(false);
        })
        .catch((e) => {
          setUpload(false);
          toast.error(e?.graphQLErrors[0]?.message);
        });
      return;
    }

    setUpload(true);
    let name = new Date().toString() + file.name;
    const uploadTask = storage.ref(`cars/${name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setUpload(false);
        return toast.error(error?.message);
      },
      () => {
        storage
          .ref("cars")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            setUpload(false);
            //hit server
            invokeUpdate({
              variables: {
                id: data?._id,
                featured: featured === "yes",
                make,
                price: parseFloat(price) * 100,
                model,
                chassis: chassis || undefined,
                vin: vin || undefined,
                description: description || undefined,
                plateNumber,
                images: [url],
              },
            })
              .then(() => {
                refetch();
                setShow(false);
              })
              .catch((e) => {
                setUpload(false);
                toast.error(e?.graphQLErrors[0]?.message);
              });
          });
      }
    );
  };
  return (
    <React.Fragment>
      <BasicModal show={show} setShow={setShow} canClose={false} size={50}>
        <React.Fragment>
          <ModalHeader
            icon={() => (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
            label={"Update Car"}
            close={() => setShow(false)}
          />
          <form onSubmit={HandleSubmit}>
            <div
              style={{ height: "60vh" }}
              className="bg-white shadow sm:rounded-lg overflow-auto"
            >
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-6">
                    {/* <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Image</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files[0] !== undefined) {
                            setFile(e.target.files[0]);
                          } else {
                            setFile(file);
                          }
                        }}
                        required
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                      />
                    </div> */}
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Price</label>
                      <input
                        type="number"
                        required
                        step={0.01}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Price per hour here..."
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Featured</label>
                      <select
                        required
                        value={featured}
                        onChange={(e) => setFeatured(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                      >
                        <option value="">Please Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Make</label>
                      <input
                        type="text"
                        required
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Make here eg. Toyota"
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Model</label>
                      <input
                        type="text"
                        required
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Model here eg. Camry"
                      />
                    </div>

                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Chassis</label>
                      <input
                        type="text"
                        value={chassis}
                        onChange={(e) => setChassis(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Chassis Number here..."
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Vin</label>
                      <input
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Vin here..."
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <label htmlFor="email-address">Plate Number</label>
                      <input
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Plate Number here..."
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
                      <label htmlFor="email-address">Description</label>
                      <textarea
                        value={description}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        className="appearance-none mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                        placeholder="Description here..."
                      ></textarea>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            <ModalFooter
              negativeLabel={"Close"}
              positiveLabel={
                upload ? "Uploading..." : loading ? "loading..." : "Update Car"
              }
              showPositive
              negativeAction={() => setShow(false)}
            />
          </form>
        </React.Fragment>
      </BasicModal>
    </React.Fragment>
  );
};

export default ViewComponent;
