import React, { useState, useEffect, useRef } from "react";
import { Stack, Box, Avatar, Badge, Typography, IconButton, Divider, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles"
import { faker } from "@faker-js/faker";
import { TbMessageSearch } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import Message from "./Message";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Tooltip from '@mui/material/Tooltip';

import {
    Camera,
    File,
    Image,
    Sticker,
    User,
    LinkSimple,
    Smiley,
    PaperPlaneTilt
} from "phosphor-react"
import Fab from '@mui/material/Fab';
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";



function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  }
  
  function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
    onSendMessage,
}) => {
    const [openActions, setOpenActions] = React.useState(false);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSendMessage();
        }
    };

    return (
        <StyledInput
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack
                            sx={{
                                position: "relative",
                                display: openActions ? "inline-block" : "none",
                            }}
                        >
                            {Actions.map((el) => (
                                <Tooltip key={el.title} placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                                            setOpenActions(!openActions);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenActions(!openActions);
                                }}
                            >
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <Stack sx={{ position: "relative" }}>
                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <Smiley />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
            }}
        />
    );
};


const Conversation = () => {
    const user_id = window.localStorage.getItem("user_id");
    const [Displayemojis, setDisplayemojis] = useState(false);
    const dispatch = useDispatch();
    const { conversations, current_conversation } = useSelector((state) => state.conversation.direct_chat);
    const { room_id } = useSelector((state) => state.app);
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const messageListRef = useRef(null);

    useEffect(() => {
        if (room_id && conversations.length > 0) {
            const current = conversations.find((el) => el?.id === room_id);

            if (current) {
                socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
                    console.log(data, "List of messages");
                    dispatch(FetchCurrentMessages({ messages: data }));
                });

                dispatch(SetCurrentConversation(current));
            }
        }
    }, [room_id, conversations, dispatch]);

    const handleEmojiClick = (emoji) => {
        const input = inputRef.current;
        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;
            setValue(
                value.substring(0, selectionStart) + emoji + value.substring(selectionEnd)
            );
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    };

    const { current_messages } = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);

    const handleSendMessage = () => {
        if (value.trim() !== "") {
            socket.emit("text_message", {
                message: linkify(value),
                conversation_id: room_id,
                from: user_id,
                to: current_conversation.user_id,
                type: containsUrl(value) ? "Link" : "Text",
            });
            setValue("");
        }
    };

    const touser = conversations.find((el) => el.id === room_id);

    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }}>
                    <Stack onClick={() => {
                        dispatch(ToggleSidebar());
                    }}
                        direction={"row"} spacing={2}>
                        <Box>
                            {
                                touser?.online 
                                ? (<StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot">
                                        <Avatar alt={faker.name.fullName()}></Avatar>
                                    </StyledBadge>) : (<Avatar alt={faker.name.fullName()}></Avatar>)
                            }
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle">
                                {current_conversation?.name}
                            </Typography>
                            <Typography variant="caption">Online</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton>
                            <TbMessageSearch />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton>
                            <IoMdMore />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }} ref={messageListRef}>
                <Message />
            </Box>
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>
                <Stack direction={"row"} alignItems={"center"} spacing={3} >
                    <Stack sx={{ width: "100%" }}>
                        <Box sx={{ display: Displayemojis ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                            <Picker theme="light" data={data} onEmojiSelect={(emoji) => { handleEmojiClick(emoji.native); }} />
                        </Box>
                        <ChatInput
                            inputRef={inputRef}
                            value={value}
                            setValue={setValue}
                            openPicker={Displayemojis}
                            setOpenPicker={setDisplayemojis}
                            onSendMessage={handleSendMessage}
                        />
                    </Stack>
                    <Box sx={{ height: 48, width: 48, backgroundColor: "#3D6091", borderRadius: 1.5 }}>
                        <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                            <IconButton
                                onClick={handleSendMessage} // Use the send message handler here as well
                            >
                                <PaperPlaneTilt color="#ffffff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Conversation;