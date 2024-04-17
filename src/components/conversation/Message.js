import React from "react";
import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import { Imgmsg, TextMsg, Timeline, ReplayMsg, Linkmsg, DocMsg } from "./MsgType";

const Message = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            //timeline
                            return <Timeline el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    //img msg
                                    return <Imgmsg el={el} />
                                case "doc":
                                    //doc msg
                                    return <DocMsg el={el} />
                                case "link":
                                    //link
                                    return <Linkmsg el={el} />
                                case "reply":
                                    return <ReplayMsg el={el} />
                                default:
                                    //text msg
                                    return <TextMsg el={el} />
                            }
                        default:
                            break;
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message