import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Space = () => {
  const location = useLocation();
  const [space, setSpace] = useState("");

  useEffect(() => {
    setSpace(location.state.result);
    console.log("search Info", space);
  }, [location]);

  return (
    <div>
      <h1>Space</h1>
      <p>{space.type}</p>
    </div>
  );
};

export default Space;
