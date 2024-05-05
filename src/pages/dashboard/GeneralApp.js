import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material"
import Conversation from "../../components/conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import Media from "../../components/SharedMessages";

const GeneralApp = () => {
  const { sideBar } = useSelector((store) => store.app)

  return (
    <Stack direction={"row"} sx={{width: "100%"}}>
     {/* Chats */}
        <Chats />
      <Box sx={{height: "100%", width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: "#F0F4FA"}}>
        {/* Conversition */}
        <Conversation />
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
