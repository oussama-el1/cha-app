import { useTheme, alpha } from "@mui/material/styles";
import { Divider, Stack, Typography, Box, IconButton } from "@mui/material";
import React from "react";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Message_options } from "../../data";
/* import { faker } from '@faker-js/faker'; */



const extractYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|^)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};



const LinkMsg = ({ el, menu }) => {
    const theme = useTheme();
    
    // Extract YouTube video ID from the message if it contains a YouTube URL
    const videoID = extractYouTubeID(el.message);
  
    return (
      <Stack direction="row" justifyContent={el.incoming ? 'start' : 'end'}>
        <Box
          px={1.5}
          py={1.5}
          sx={{
            backgroundColor: el.incoming
              ? alpha(theme.palette.background.default, 1)
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: '400px', // Set a fixed width
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction="column"
              spacing={3}
              alignItems="start"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                width: '100%', // Ensure the child stack takes full width
              }}
            >
              {videoID && (
                <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                  <Box
                    component="iframe"
                    width="340px"
                    height="200px" // Adjust height for 16:9 aspect ratio
                    src={`https://www.youtube.com/embed/${videoID}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></Box>
                </Stack>
              )}
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text.primary : '#fff'}
              sx={{ 
                width: "100%", // Ensure typography takes full width
                wordWrap: 'break-word', 
                wordBreak: 'break-word',
                overflowWrap: 'break-word' 
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    );
  };




const DocMsg = ({ el, menu = true }) => {
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
            {menu && <MsgOptions />}
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




export { Timeline, TextMsg, Imgmsg, ReplayMsg, LinkMsg, DocMsg };
