import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 0",
      }}
    >
      <ReactLoading type="spin" width="150px" height="150px" color="#14919b" />
      <h2>Loading...</h2>
    </div>
  );
};
export default Loading;
