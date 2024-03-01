import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { RiQuestionFill  } from "react-icons/ri";

import logo4 from "../../assets/Images/logo4.png"
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from '@faker-js/faker';


const DashboardLayout = () => {

  const theme = useTheme();
  const [selected, setSelected] = useState(0);

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
                <Typography variant="h5" sx={{color: "#000000", fontFamily: "Didot"}}> Binatna </Typography>
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
            {/* switch */}
            <IconButton> <RiQuestionFill size={25} />  </IconButton>
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
