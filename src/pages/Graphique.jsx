import Progress from "./Progress";

function Graphique() {
  return (
    <div className="flex w-full flex-col gap-0  ">
      <h1 className="text-center z-index  text-black text-4xl justtify-items-center mt-24 max-lg:text-4xl">
        Resultats des Sondages
      </h1>
      <div className="relative w-full">
        <Progress bgcolor="orange" progress="25" height={30} />
        <Progress bgcolor="red" progress="55" height={30} />
        <Progress bgcolor="#685E43" progress="45" height={30} label="Small" />
        <Progress bgcolor="#D3D3D3" progress="80" height={30} />
        <Progress bgcolor="#99ccff" progress="39" height={30} />
      </div>
    </div>
  );
}

export default Graphique;
