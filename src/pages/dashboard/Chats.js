import { React, useState, useEffect } from "react";
import { Box, Typography, Stack, IconButton, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import { styled, alpha } from "@mui/material/styles"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbMessageCircleSearch } from "react-icons/tb";
import { PiArchiveDuotone } from "react-icons/pi";
import { Users } from "phosphor-react";
import Friends from "../../sections/dashboard/Friends";
import { SelectConversation } from "../../redux/slices/app";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";
import { useTheme } from "@mui/material/styles";


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

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));


const user_id = window.localStorage.getItem("user_id");


const ChatElement = ({ id, name, img, msg, time, unread, online }) => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const {room_id} = useSelector((state) => state.app);
    const selectedChatId = room_id?.toString();

    let isSelected = +selectedChatId === id;

    if (!selectedChatId) {
        isSelected = false;
    }

    return (
        <StyledChatBox
            onClick={() => {
                dispatch(SelectConversation({ room_id: id }))
            }}
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: isSelected
                ? theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.5)
                    : theme.palette.primary.main
                : theme.palette.mode === "light"
                ? "#fff"
                : theme.palette.background.paper,
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
                    <Badge color="primary" badgeContent={unread} />
                </Stack>
            </Stack>
        </StyledChatBox>
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


    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();

    const { conversations } = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            console.log(data);
            dispatch(FetchDirectConversations({ conversations: data }));
        });
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };


    return (
        <>
            <Box sx={{
                position: "relative",
                width: 320,
                backgroundColor: "#DDE6ED",
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
            }}>
                <Stack p={3}
                    spacing={2}
                    sx={{ height: "100vh" }
                    }>
                    <Stack direction="row" alignItems="Center" justifyContent="space-between">
                        <Typography variant="h5">
                            InBox
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <IconButton
                                onClick={() => {
                                    handleOpenDialog();
                                }}
                                sx={{ width: "max-content" }}
                            >
                                <Users />
                            </IconButton>
                            <IconButton>
                                <IoIosCloseCircleOutline />
                            </IconButton>
                        </Stack>
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
                    <Stack spacing={2} direction={'column'} sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "scroll", height: "100%", paddingInline: "8px" }}>
                        <Stack spacing={1.5}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                All Chats
                            </Typography>
                            {
                                conversations.filter((el) => !el.pinned).map((el) => {
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
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}
        </>
    );
};

export default Chats