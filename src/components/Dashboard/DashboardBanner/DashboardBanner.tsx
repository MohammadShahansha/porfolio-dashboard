import { Box, Typography } from "@mui/material";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export type TBanner = {
  title: string;
  //   routeLink: string;
  selfName: string;
};

const DashboardBanner = ({ title, selfName }: TBanner) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        backgroundColor: "#f3f8f4",
        mb: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          component="h1"
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb="15px"
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            fontWeight={500}
            sx={{
              ":hover": {
                color: "primary.main",
              },
            }}
          >
            {selfName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardBanner;
