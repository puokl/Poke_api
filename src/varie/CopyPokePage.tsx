import "../index.css";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useParams } from "react-router-dom";
import { Pokemon, PokemonType } from "../types/PokemonTypes";
import {
  Box,
  LinearProgress,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Page404 from "../components/Page404";

function PokePage() {
  const { id } = useParams();

  const [data, setData] = useState<Pokemon | undefined>();
  const [test, setTest] = useState(false);
  const [loading, setloading] = useState(false);
  // const [error, setError] = useState<boolean>(!id);
  // const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    // setBusy(true);
    setloading(true);
    console.log("running useEffecctg");
    let controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        const response = await axios.get(`/pokemon/${id}`, { signal });
        console.log("response.status", response.status);
        if (response.status === 200) {
          setData(response.data);
          setloading(false);
        }
        console.log("response", response.data);
      } catch (error: any) {
        console.log(error);
        // setError(true);
        if (error.name === "AxiosError") {
          console.log("response.status", error.name);
          setTest(true);
        }
      }
    }
    fetchData();

    return () => {
      console.log("cleaning effects");
      controller.abort();
    };
  }, [id]);

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  const handleClick = () => {
    window.location.href = `/`;
  };

  return (
    <>
      {/* {error && <Page404 />} */}
      {/* {!data && (
        <>
          <p>Sorry, no poke</p>
          <Button variant="contained" onClick={handleClick}>
            Back to homepage
          </Button>
        </>
      )} */}
      {test && (
        <>
          <h1>Something wrong happened</h1>
        </>
      )}
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ margin: 10 }} />
            <Button variant="contained" onClick={handleClick}>
              Back to homepage
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={handleClick}>
            Back to homepage
          </Button>
          {console.log("repsonse", data)}

          <div>Hello from {data?.name}</div>
          {console.log("data", data)}

          {console.log("sprites", data?.sprites)}
          <Typography variant="h4">{data?.name}</Typography>
          <Box
            component="img"
            style={{ height: 200, width: 200 }}
            src={data?.sprites.front_default}
            alt={data?.name}
          ></Box>
          <img
            src={data?.sprites.front_default}
            alt={data?.name}
            style={{ marginLeft: "auto" }}
          />

          <div>Weight: {data?.weight! / 10} kg</div>
          {console.log("weight", data?.weight)}
          {console.log(
            "abilities",
            data?.abilities.map((item) => item.ability.name)
          )}

          <div>Height: {data?.height! * 10} cm</div>
          <div>Base experience: {data?.base_experience}</div>
          {console.log("types", data?.types)}
          <div>
            Type:{" "}
            {data?.types.map((item) => (
              <li>{item.type.name}</li>
            ))}
          </div>

          <div>Species: {data?.species.name}</div>
          {console.log("abilities", data?.abilities)}
          <div>
            Abilities:{" "}
            {data?.abilities.map((item) => (
              <li>{item.ability.name}</li>
            ))}
          </div>

          <Box>
            {data?.stats.map((item, i) => {
              return (
                <Box key={item.stat.name}>
                  <Typography>
                    {item.stat.name}: {item.base_stat}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.base_stat < 100 ? item.base_stat : 100}
                    sx={{
                      width: 400,
                      height: 10,
                      mr: 2,
                      background: "#eeeeee",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </>
  );
}

export default PokePage;
