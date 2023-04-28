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
  Stack,
  Divider,
  ButtonBase,
} from "@mui/material";
import Page404 from "./Page404";

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
          <Box sx={{ height: "10%" }}>
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ marginLeft: "600px" }}
            >
              Back to homepage
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Stack
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={2}
              sx={{ width: "50%" }}
            >
              <Typography
                variant="h4"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {data?.name}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#ffd166",
                }}
              >
                <Box
                  component="img"
                  style={{ height: 200, width: 200 }}
                  src={data?.sprites.front_default}
                  alt={data?.name}
                ></Box>
              </Box>

              <Typography>
                <Box component="span" fontWeight="bold">
                  Height:
                </Box>{" "}
                {data?.height! * 10} cm
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Weight:
                </Box>{" "}
                {data?.weight! / 10} kg
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Species:
                </Box>{" "}
                <Box component="span" textTransform="capitalize">
                  {data?.species.name}
                </Box>
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Base experience:
                </Box>{" "}
                {data?.base_experience}
              </Typography>
            </Stack>
            <Stack spacing={2} sx={{ width: "50%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                {data?.stats.map((item, i) => {
                  return (
                    <Box key={item.stat.name}>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
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
              <Box>
                <Stack>
                  {/* {console.log("types", data?.types)} */}
                  <Stack sx={{ alignItems: "center" }}>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        marginTop: "30px",
                      }}
                    >
                      Type:{" "}
                    </Typography>
                    {data?.types.map((item) => (
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#6a994e",
                          width: "150px",
                          height: "25px",
                          margin: "5px",
                          "&:hover": {
                            backgroundColor: "#6a994e",
                          },
                        }}
                      >
                        {item.type.name}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
                <Stack>
                  {/* {console.log(
                    "abilities",
                    data?.abilities.map((item) => item.ability.name)
                  )}
                  {console.log("abilities", data?.abilities)} */}
                  <Stack sx={{ alignItems: "center" }}>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        marginTop: "30px",
                      }}
                    >
                      Abilities:{" "}
                    </Typography>

                    {data?.abilities.map((item) => (
                      <Button
                        variant="contained"
                        disableRipple
                        sx={{
                          bgcolor: "#a7c957",
                          width: "150px",
                          height: "25px",
                          margin: "5px",
                          "&:hover": {
                            backgroundColor: "#a7c957",
                          },
                        }}
                      >
                        {item.ability.name}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}

export default PokePage;
