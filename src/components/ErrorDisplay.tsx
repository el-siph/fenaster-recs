import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit/react";

interface Props {
  error: FetchBaseQueryError | SerializedError;
}

const ErrorDisplay = ({ error }: Props) => {
  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);

    return (
      <div>
        <div>An error has occurred:</div>
        <div>{errMsg}</div>
      </div>
    );
  } else {
    // you can access all properties of `SerializedError` here
    return <div>{error.message}</div>;
  }
};

export default ErrorDisplay;
