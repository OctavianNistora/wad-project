import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { Container } from "@mui/system";
import SideNav, { DRAWER_WIDTH } from "./SideNav";
import { LayoutScrollablePart } from "../styledComponents/LayoutScrollablePart";
import { Layout } from "../styledComponents/Layout";

export default function PageWrapper(
  props: PropsWithChildren<Record<never, any>>
) {
  const { children } = props;

  return (
    <Layout>
      <Header />
      <SideNav />
      <Box pl={`${DRAWER_WIDTH}px`}>
        <LayoutScrollablePart>
          <Container component="main">
            <Box p={2}>{children}</Box>
          </Container>
        </LayoutScrollablePart>
      </Box>
    </Layout>
  );
}
