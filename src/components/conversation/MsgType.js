import { useTheme } from "@mui/material/styles";
import { Divider, Stack, Typography, Box, Link, IconButton } from "@mui/material";
import React from "react";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Message_options } from "../../data";




const DocMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5 /* 12px */,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack p={2} direction="row" spacing={3} alignItems="center" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <Image size={48} />
                        <Typography variant="caption">exemple.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"} >{el.message}</Typography>
                </Stack>
            </Box>
            <MsgOptions />
        </Stack>
    )
}



const Linkmsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5 /* 12px */,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack p={2} spacing={3} alignItems="start" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                        <Stack spacing={2}>
                            <Typography variant="subtitle2" > Youtube link </Typography>
                            <Typography variant="subtitle2"
                                sx={{ color: theme.palette.primary.main }}
                                component={Link}
                                to="//https://www.youtube.com"
                            >
                                https://www.youtube.com/
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"} > {el.message} </Typography>
                    </Stack>
                </Stack>
            </Box>
            <MsgOptions />
        </Stack>
    )
}

const ReplayMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5 /* 12px */,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack p={2} direction="column" spacing={3} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <Typography variant="body2" color={theme.palette.text}>{el.message}</Typography>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"} >{el.reply}</Typography>
                </Stack>
            </Box>
            <MsgOptions />
        </Stack>
    )
}



const Imgmsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5 /* 12px */,
                    width: "max-content",
                }}
            >
                {/* stack used ti groupe image and message */}
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"} >{el.message}</Typography>
                </Stack>
            </Box>
            <MsgOptions />
        </Stack>
    )
}


const TextMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5 /* 12px */,
                    width: "max-content",
                }}
            >
                <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.message}
                </Typography>
            </Box>
            {/* Message Options */}
            <MsgOptions />
        </Stack>
    );
};

const Timeline = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {el.text}
            </Typography>
            <Divider width="46%" />
        </Stack>
    );
};


const MsgOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <DotsThreeVertical size={20}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1} >
                    {Message_options.map((el, index) => ( // Added parentheses for return statement
                        <MenuItem key={index} onClick={handleClose}> {el.title} </MenuItem>
                    ))
                    }
                </Stack>
            </Menu>
        </>
    )
}




export { Timeline, TextMsg, Imgmsg, ReplayMsg, Linkmsg, DocMsg };
