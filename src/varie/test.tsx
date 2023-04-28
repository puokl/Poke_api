// moves: movesResponse.data.results.map(async (move) => {
//   const moveDetails = await axios.get(move.url);
//   return {
//     name: moveDetails.data.name,
//     type: moveDetails.data.type.name,
//     power: moveDetails.data.power,
//     accuracy: moveDetails.data.accuracy,
//     description: moveDetails.data.effect_entries.find(
//       (item) => item.language.name === "en"
//     ).short_effect,
//   };
// }),
// abilities: abilitiesResponse.data.results.map(async (ability) => {
//   const abilityDetails = await axios.get(ability.url);
//   return {
//     name: abilityDetails.data.name,
//     description: abilityDetails.data.effect_entries.find(
//       (entry) => entry.language.name === "en"
//     ).short_effect,
//   };
// }),
// stats: statsResponse.data.map((stat) => ({
//   name: stat.stat.name,
//   value: stat.base_stat,
// })),
