import React from "react";
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




const Conversation = () => {
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
                    <Stack direction={"row"} spacing={2}>
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
            <Box width={"100%"} sx={{ flexGrow: 1 }}>
            </Box>
            {/* footer */}
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>
                <Stack direction={"row"} alignItems={"center"} spacing={2} >
                    <StyledInput fullWidth placeholder="Message" variant="filled" InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment>
                            <IconButton>
                                <ImLink />
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment>
                            <IconButton>
                                <RiEmojiStickerLine />
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <Box sx={{ height: 48, width: 48, backgroundColor: "#3D6091", borderRadius: 1.5 }}>
                        <Stack sx={{height: "100%", width: "100%"}} alignItems={"center"} justifyContent={"center"}>
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