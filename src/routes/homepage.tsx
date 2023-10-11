import { Container, Stack, Typography } from "@mui/material";
import { auth, database } from "../firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    get(ref(database, "users/" + auth.currentUser?.uid + "/firstName"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFirstName(snapshot.val());
          console.log(firstName);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack spacing={2}>
        <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
          Event Planner
        </Typography>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome {firstName}!
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
