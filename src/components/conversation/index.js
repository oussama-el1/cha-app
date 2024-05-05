import React, { useState } from "react";
import { Stack, Box, Avatar, Badge, Typography, IconButton, Divider, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles"
import { faker } from "@faker-js/faker"
import { PiVideoCamera } from "react-icons/pi";
import { BiPhone } from "react-icons/bi";
import { TbMessageSearch } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import { ImLink } from "react-icons/im";
import { RiEmojiStickerLine } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
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
} from "phosphor-react"
import Fab from '@mui/material/Fab';
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";


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

const ChatInput = ({ setDisplayemojis }) => {
    const [openActions, setOpenActions] = React.useState(false);
    return (<StyledInput fullWidth placeholder="Message" variant="filled" InputProps={{
        disableUnderline: true,
        startAdornment: (
            <Stack sx={{ width: "max-content" }}>
                <Stack
                    sx={{
                        position: "relative",
                        display: openActions ? "inline-block" : "none",
                        width: "max-content",
                    }}
                >
                    {Actions.map((el) => (
                        <Tooltip placement="right" title={el.title}>
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
                        <ImLink />
                    </IconButton>
                </InputAdornment>
            </Stack>
        ),
        endAdornment:
            <InputAdornment>
                <IconButton onClick={() => {
                    setDisplayemojis((pervSatate) => !pervSatate);
                }}>
                    <RiEmojiStickerLine />
                </IconButton>
            </InputAdornment>
    }} />)
}


const Conversation = () => {
    const [Displayemojis, setDisplayemojis] = useState(false)
    const dispatch = useDispatch()
    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            {/* Header */}
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
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot">
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}></Avatar>
                            </StyledBadge>
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle">{faker.name.fullName()}</Typography>
                            <Typography variant="caption">Onligne</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton>
                            <PiVideoCamera />
                        </IconButton>
                        <IconButton>
                            <BiPhone />
                        </IconButton>
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
            {/* msg */}
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
                <Message />
            </Box>
            {/* footer */}
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>
                <Stack direction={"row"} alignItems={"center"} spacing={3} >
                    {/* Chat input */}
                    <Stack sx={{ width: "100%" }}>
                        <Box sx={{ display: Displayemojis ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                            <Picker theme="dark" data={data} onEmojiSelect={console.log} />
                        </Box>
                        <ChatInput setDisplayemojis={setDisplayemojis} />
                    </Stack>
                    <Box sx={{ height: 48, width: 48, backgroundColor: "#3D6091", borderRadius: 1.5 }}>
                        <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                            <IconButton>
                                <RiSendPlaneFill color="#fff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Conversation;