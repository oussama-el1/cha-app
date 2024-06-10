import {React, useEffect} from "react";
import { Box, Stack } from "@mui/material";
import { Imgmsg, TextMsg, Timeline, ReplayMsg, LinkMsg, DocMsg } from "./MsgType";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import {
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/conversation";



const Message = () => {

    const dispatch = useDispatch();

    const { conversations, current_messages } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const { room_id } = useSelector((state) => state.app);

    useEffect(() => {
        const current = conversations.find((el) => el?.id === room_id);

        socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
        console.log(data, "List of messages");
        dispatch(FetchCurrentMessages({ messages: data }));
        });

        dispatch(SetCurrentConversation(current));
    }, []);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                {current_messages.map((el) => {
                    switch (el.type) {
                        case "divider":
                            //timeline
                            return <Timeline el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "Img":
                                    //img msg
                                    return <Imgmsg el={el} />
                                case "Doc":
                                    //doc msg
                                    return <DocMsg el={el} />
                                case "Link":
                                    //link
                                    return <LinkMsg el={el} />
                                case "Replay":
                                    return <ReplayMsg el={el} />
                                default:
                                    //text msg
                                    return <TextMsg el={el} />
                            }
                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message