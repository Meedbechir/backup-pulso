/* eslint-disable react/prop-types */
const Progress = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "w-full",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div className="relative">
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}>{`${progress}%`}</span>
          <h1>Voir Resultats</h1>
        </div>
      </div>
    </div>
  );
};

export default Progress;
