import "../index.css";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

interface Poke {
  name: string;
  url: string;
}
interface PokeImg {
  name: string;
  urlImg: string;
}

type PokeAPIResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Poke[];
};

function SearchPoke() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fetchedData, setFetchedData] =
    useState<AxiosResponse<PokeAPIResponseType>>();
  // const [matchingNames, setMatchingNames] = useState<Poke[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [pokeImage, setPokeImage] = useState<PokeImg[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/pokemon/?limit=1000&offset=0");
        setFetchedData(response);
        console.log("fetchedData", fetchedData);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchData();
    console.log("fetchedData", fetchedData);
  }, []);

  const fetchMatchingNames = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("e.target.value", e.target.value);
    //  if (e.target.value !== "" && fetchedData) {
    if (e.target.value !== "") {
      const filteredNames: Poke[] =
        fetchedData?.data.results.filter((name: Poke) =>
          name.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        ) ?? [];
      fetchPokeImage(filteredNames);
    }
  };

  const fetchPokeImage = async (matchingNames: Poke[]) => {
    let pokeImg: PokeImg[] = [];
    for (let i = 0; i < matchingNames.length; i++) {
      const name = matchingNames[i].name;

      try {
        const response: AxiosResponse<any> = await axios.get(
          `/pokemon/${name}`
        );
        const urlImg = response.data.sprites.front_default;
        pokeImg[i] = { name, urlImg };
      } catch (error: any) {
        console.log(error);
      }
    }
    // setPokeImage(...pokeImg, pokeImg);
    setPokeImage([...pokeImg]);
  };

  const randomPoke = () => {
    const count = fetchedData?.data.count;
    const random = Math.floor(Math.random() * count!) + 1;
    console.log("random", random);
    return random;
  };

  const handleClick = () => {
    const random = randomPoke();
    window.location.href = `/${random}`;
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box component="img" src="../../public/pokemon_logo.svg" />

        <Typography variant="h4">Discover the Pokemon world</Typography>

        <Box
          style={{
            height: 300,
            width: 300,
            overflowY: "auto",
            scrollbarWidth: "none",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Box>
            <Typography>Chose your pokemon:</Typography>
            <TextField
              // label="Search Pokemon"
              variant="filled"
              onChange={fetchMatchingNames}
              value={inputValue}
            />
          </Box>
          <List
            style={{
              maxHeight: 300,
              maxWidth: 200,
            }}
          >
            {pokeImage.map((poke: PokeImg, index: number) => (
              <Link to={`/${poke.name}`} key={poke.name}>
                <ListItem
                  button
                  style={{
                    height: 55,
                    // display: "flex",
                    // width: "200px",
                    // alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  <ListItemText primary={poke.name} />
                  <img
                    src={poke.urlImg}
                    alt={poke.name}
                    style={{ marginLeft: "auto" }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Button variant="contained" onClick={handleClick}>
          Generate a random Pokemon
        </Button>
      </Box>
    </>
  );
}

export default SearchPoke;
