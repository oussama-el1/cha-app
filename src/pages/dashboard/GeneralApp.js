import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Conversation from "../../components/conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import Media from "../../components/SharedMessages";
import NoChat from "../../assets/Illustration/NoChat";
import { useTheme } from "@mui/material/styles";





const GeneralApp = () => {
  const { sideBar } = useSelector((store) => store.app)

  const theme = useTheme();

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />
      <Box sx={{ height: "100%", width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: "#F0F4FA" }}>
        {/* Conversition */}
        {true ? (<Stack
          spacing={2}
          sx={{ height: "100%", width: "100%" }}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography variant="subtitle2">
            Select a conversation or start a{" "}
            <Link
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
              to="/"
            >
              new one
            </Link>
          </Typography>
        </Stack>) : (<Conversation />)
          }
      </Box>
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;

            /* case "STARRED":
              return <StarredMessages />;
            */
            case "SHARED":
              return <Media />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
