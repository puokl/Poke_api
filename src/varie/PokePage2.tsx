import React from "react";

export default function PokePage2() {
  return <div>PokePage2</div>;
}

// import { useEffect, useState } from "react";
// import axios from "../utils/axios";
// import { Link, useParams } from "react-router-dom";
// import { Pokemon, PokemonType } from "../types/PokemonTypes";

// function PokePage2() {
//   const { id } = useParams();

//   const [data, setData] = useState<Pokemon | undefined>();
//   const [isBusy, setBusy] = useState(true);

//   useEffect(() => {
//     setBusy(true);
//     const fetchData = async () => {
//       const basicInfoResponse = await Promise.all([
//         axios.get(`/pokemon/${id}`),
//         axios.get(`/pokemon-species/${id}`),
//         // axios.get(`/ability?pokemon=${id}`),
//         // axios.get(`/stat?pokemon=${id}`),
//         // axios.get(`/move?pokemon=${id}`),
//       ]);
//       // const test = basicInfoResponse.map((e,i)=> {
//       // return {
//       // //  name: e[0].data.name,
//       // //   e.1.
//       // }}

//       // });
//       // console.log("basicInfoResponse", basicInfoResponse);
//       // console.log("speciesResponse", speciesResponse);
//       // const info: Pokemon = {
//       //   name: basicInfoResponse.data.name,
//       //   id: basicInfoResponse.data.id,
//       //   types: basicInfoResponse.data.types.map((type: PokemonType) => ({
//       //     name: type.type.name,
//       //   })),
//       //   height: basicInfoResponse.data.height,
//       //   weight: basicInfoResponse.data.weight,
//       //   base_experience: basicInfoResponse.data.base_experience,
//       //   stats: basicInfoResponse.data.stats,
//       //   moves: basicInfoResponse.data.moves,
//       //   species: basicInfoResponse.data.species,
//       //   abilities: basicInfoResponse.data.abilities,
//       // };

//       // setData({
//       //   info,
//       // });
//   //     setData({
//   //       name: basicInfoResponse.data.name,
//   //       id: basicInfoResponse.data.id,
//   //       types: basicInfoResponse.data.types.map((type: PokemonType) => ({
//   //         name: type.type.name,
//   //       })),
//   //       height: basicInfoResponse.data.height,
//   //       weight: basicInfoResponse.data.weight,
//   //       base_experience: basicInfoResponse.data.base_experience,
//   //       stats: basicInfoResponse.data.stats,
//   //       // moves: basicInfoResponse.data.moves,
//   //       species: basicInfoResponse.data.species,
//   //       abilities: basicInfoResponse.data.abilities,
//   //     });
//   //   };

//   //   fetchData();
//   // }, [id]);

//   return (
//     <>
//       <div>Hello from {id}</div>
//       <div>Hello from {data?.name}</div>

//       {console.log("data", data)}

//       <div>Weight: {data?.weight / 10} kg</div>
//       {console.log("weight", data?.weight)}
//       {console.log(
//         "abilities",
//         data?.abilities.map((item) => item.ability.name)
//       )}

//       <div>Height: {data?.height * 10} cm</div>
//       <div>Base experience: {data?.base_experience}</div>
//       {console.log("types", data?.types)}
//       <div>Type: {data?.types.map((item) => item.name)}</div>

//       {console.log("species", data?.species.name)}
//       {/* <div>Species: {data?.species}</div> */}
//       {/* <div>Moves: {data?.moves}</div> */}
//       {/* <div>{data.Info.name}</div> */}
//     </>
//   );
// }

// export default PokePage2;
