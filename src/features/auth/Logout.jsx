import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { logOut } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    dispatch(logOut());
    navigate("/", { replace: true });
  }, []);

  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Logout;
