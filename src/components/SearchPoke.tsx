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
  const [pokeImage, setPokeImage] = useState<PokeImg[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/pokemon/?limit=1000&offset=0");
        setFetchedData(response);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const fetchMatchingNames = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("e.target.value", e.target.value);
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
        <Box component="img" src="../../public/pngegg.png" maxHeight={170} />
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
              variant="filled"
              onChange={fetchMatchingNames}
              value={inputValue}
              style={{ width: 300 }}
            />
          </Box>
          <List
            style={{
              maxHeight: 300,
              maxWidth: 300,
            }}
          >
            {pokeImage.map((poke: PokeImg, index: number) => (
              <Link to={`/${poke.name}`} key={poke.name}>
                <ListItem
                  button
                  style={{
                    height: 55,
                  }}
                >
                  <ListItemText primary={poke.name} />
                  <img
                    src={poke.urlImg}
                    alt={poke.name}
                    style={{ marginLeft: "auto" }}
                    height={70}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Box sx={{ mt: 10 }}>
          <Button variant="contained" onClick={handleClick}>
            Generate a random Pokemon
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SearchPoke;
