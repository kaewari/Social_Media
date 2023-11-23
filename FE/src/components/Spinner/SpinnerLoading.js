import { Spinner } from "react-bootstrap";

const SpinnerLoading = () => {
  return (
    <div className="w-100 text-center">
      <Spinner
        className="p-3 mb-3 text-center"
        animation="border"
        variant="dark"
      />
    </div>
  );
};

export default SpinnerLoading;
