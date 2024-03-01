import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material"
import Conversation from "../../components/conversation";

const GeneralApp = () => {

  return (
    <Stack direction={"row"} sx={{width: "100%"}}>
     {/* Chats */}
      <Chats />
      
      <Box sx={{height: "100%", width: "calc(100vw - 420px)", backgroundColor: "#FFF"}}>
        {/* Conversition */}
        <Conversation/>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
