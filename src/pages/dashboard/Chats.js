import React from "react";
import { Box, Typography, Stack, IconButton, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import { styled, alpha } from "@mui/material/styles"
/* import { faker } from '@faker-js/faker'; */
import { ChatList } from "../../data";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbPinned } from "react-icons/tb";
import { TbMessageCircleSearch } from "react-icons/tb";
import { PiArchiveDuotone } from "react-icons/pi";


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



const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    return (
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: "#fff"
        }}
            p={2}
        >
            <Stack direction='row'
                alignItems={"center"}
                justifyContent='space-between'
            >
                <Stack direction="row" spacing={2}>
                    {online ?
                        <StyledBadge overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar src={img} />
                        </StyledBadge> : <Avatar src={img} />
                    }
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                        <Typography variant="caption">
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={99} />
                </Stack>
            </Stack>
        </Box>
    )
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 30,
    backgroundColor: alpha(theme.palette.background.paper, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));




const Chats = () => {
    return (
        <Box sx={{ position: "relative",
                    width: 320,
                    backgroundColor: "#DDE6ED",
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
                }}>
            <Stack p={3}
                    spacing={2}
                    sx={{ height: "100vh"}
                }>
                <Stack direction="row" alignItems="Center" justifyContent="space-between">
                    <Typography variant="h5">
                        InBox
                    </Typography>
                    <IconButton>
                        <IoIosCloseCircleOutline />
                    </IconButton>
                </Stack>
                <Stack>
                    <Search>
                        <SearchIconWrapper>
                            <TbMessageCircleSearch color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Shearch ..." />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems={'center'} spacing={1.5} >
                        <PiArchiveDuotone />
                        <Button> Archived </Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack spacing={2} direction={'column'} sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "scroll", height: "100%", paddingInline: "8px"}}>
                    <Stack spacing={1.5}>
                        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                            <TbPinned size={15} />  -   Pinned
                        </Typography>
                        {
                            ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })
                        }
                    </Stack>
                    <Stack spacing={1.5}>
                        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                            All Chats 
                        </Typography>
                        {
                            ChatList.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })
                        }
                    </Stack>
                    <style>
                    {`
                        /* Customize scrollbar */
                        ::-webkit-scrollbar {
                            width: 8px;
                            display: none;
                        }
                    `}
                    </style>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chats