import React, { useState } from "react";
import axios from "axios";
import { LoadingStatus, cll } from "../../lib/common";

export const Loader = ({ url, params = {}, component }) => {
  const [status, setStatus] = useState(LoadingStatus.Initial);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  
  if (status === LoadingStatus.Initial) {
    setStatus(LoadingStatus.Loading);
    axios
      .get(url, { params })
      .then((res) => {
        cll('loader.cb', res);
        setStatus(LoadingStatus.Success);
        setData(res.data);
      })
      .catch((e) => {
        cll('loader.err', e);
        setStatus(LoadingStatus.Fail);
        setError(e);
      });
  }

  if (status === LoadingStatus.Loading) {
    return <div className="welcome">...loading</div>;
  }

  if (status === LoadingStatus.Fail) {
    return (
      <div className="welcome">
        <h3>Error</h3>
        <div className="error">{error.toString()}</div>
      </div>
    );
  }

  return React.createElement(component, { data });
};
