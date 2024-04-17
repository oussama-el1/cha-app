import { Avatar, Box, Divider, IconButton, Stack, Typography, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { RiQuestionFill } from "react-icons/ri";

import logo4 from "../../assets/Images/logo4.png"
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from '@faker-js/faker';


const DashboardLayout = () => {

  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={"row"}>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: "100vh",
          width: 100,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack
          direction="column"
          alignItems="Center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack
            alignItems='Center'
            spacing={10}
          >
            <Stack alignItems={"center"}>
              <Box
                sx={{
                  backgroundColor: theme.palette.grey[0],
                  height: 64,
                  weight: 64,
                  borderRadius: 1.5,
                }}
              >
                <img src={logo4} alt="logo"></img>
                <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Didot" }}> Binatna </Typography>
              </Box>
            </Stack>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="Center"
              spacing={3}
            >
              {Nav_Buttons.map((el) =>
                el.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: "#526D82",
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={el.index}
                    > {el.icon} </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={
                      () => setSelected(el.index)
                    }
                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: '48px' }} />
              {
                selected === 3 ?
                  <Box
                    sx={{
                      backgroundColor: "#526D82",
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton sx={{ width: "max-content", color: "#fff" }}>
                      <Gear />
                    </IconButton>
                  </Box>
                  :
                  <IconButton onClick={() => setSelected(3)} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                    <Gear />
                  </IconButton>
              }
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <IconButton> <RiQuestionFill size={25} />  </IconButton>
            <Avatar id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              src={faker.image.avatar()} />
              {/* -------- Menu ---------*/}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'buttom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'buttom',
                horizontal: 'left',
              }}
            >
              <Stack spacing={1} px={1} >
                {Profile_Menu.map((el, index) => ( // Added parentheses for return statement
                  <MenuItem key={index} onClick={handleClose}>
                      {
                        <Stack sx={{width: 100}} direction="row" alignItems="center" justifyContent="space-between">
                          <span>{el.title}</span>
                          {el.icon}
                        </Stack>
                      }
                  </MenuItem>
                ))
                }
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
