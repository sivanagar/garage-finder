import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Resutls = (props) => {
  const location = useLocation();

  useEffect(() => {
    console.log("search Info", location.state.search);
  }, [location]);

  return (
    <>
      <p>Results</p>
    </>
  );
};

export default Resutls;
