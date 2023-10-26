import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router";

export default function PageWrapper (props: PropsWithChildren<Record<never, any>> ) {
  const {children} = props; 

  const location = useLocation()
  console.log('location: ', location);

  return (
    <Box>
      {children}
    </Box>
  )
}

