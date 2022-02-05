import React from "react";
import CardLoading from "../../components/Jobs/CardLoading";

function JobLoading() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <CardLoading key={key} />
      ))}
    </>
  );
}

export default JobLoading;
