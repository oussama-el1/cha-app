import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material"
import Conversation from "../../components/conversation";
import Contact from "../../components/Contact";

const GeneralApp = () => {

  return (
    <Stack direction={"row"} sx={{width: "100%"}}>
     {/* Chats */}
        <Chats />
      <Box sx={{height: "100%", width: "calc(100vw - 740px)", backgroundColor: "#F0F4FA"}}>
        {/* Conversition */}
        <Conversation />
      </Box>
        {/* contact info */}
        <Contact />
    </Stack>
  );
};

export default GeneralApp;
