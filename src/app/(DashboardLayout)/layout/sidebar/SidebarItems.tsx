import React from "react";
import Menuitems from "./MenuItems";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint, IconLock } from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";


const renderMenuItems = (items: any, pathDirect: any) => {

  return items.map((item: any) => {

    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return (
        <Menu
          subHeading={item.subheader}
          key={item.subheader}
        />
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href}
          borderRadius='8px'
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span>{item.title}</span>
            {item.locked && (
              <IconLock size={16} color="#FFA726" />
            )}
          </Box>
        </MenuItem >
      </Box>

    );
  });
};


const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const theme = useTheme();

  return (
    < >
      <MUI_Sidebar
        width={"100%"}
        showProfile={false}
        themeColor={theme.palette.primary.main}
        themeSecondaryColor={theme.palette.secondary.main}
        backgroundColor={theme.palette.background.paper}
        textColor={theme.palette.text.primary}
      >
        <Box sx={{ px: 3, py: 3, mb: 2 }}>
          <Typography variant="h3" fontWeight="700" color="primary">
            ACLIX
          </Typography>
        </Box>

        {renderMenuItems(Menuitems, pathDirect)}
        <Box px={2}>
          <Upgrade />
        </Box>
      </MUI_Sidebar>

    </>
  );
};
export default SidebarItems;
