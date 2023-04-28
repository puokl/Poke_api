import { Typography, Button } from "@mui/material";

function Page404() {
  const handleClick = () => {
    window.location.href = `/`;
  };
  return (
    <>
      <Typography> Something wrong happened</Typography>
      <Button variant="contained" onClick={handleClick}>
        Back to homepage
      </Button>
    </>
  );
}

export default Page404;
