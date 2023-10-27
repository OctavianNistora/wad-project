import { Box, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import Header from "./Header";
import { Container } from "@mui/system";
import SideNav, { DRAWER_WIDTH } from "./SideNav";
import { Layout } from "../styledComponents/layout";
import { LayoutScrollablePart } from "../styledComponents/LayoutScrollablePart";
import { LayoutNonScrollablePart } from "../styledComponents/LayoutNonScrollablePart";

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
          <Layout>
            <LayoutNonScrollablePart>
              <Stack>
                <Box>AAAAAA</Box>
                <Box>AAAAAA</Box>
                <Box>AAAAAA</Box>
                <Box>AAAAAA</Box>
                <Box>AAAAAA</Box>
              </Stack>
            </LayoutNonScrollablePart>
            <LayoutScrollablePart>
              <Stack>
                <Box>BBBBBB</Box>
                <Box>BBBBBB</Box>
                <Box>BBBBBB</Box>
                <Box>BBBBBB</Box>
                <Box>BBBBBB</Box>
              </Stack>
            </LayoutScrollablePart>
          </Layout>
        </LayoutScrollablePart>
      </Box>
    </Layout>
  );
}
