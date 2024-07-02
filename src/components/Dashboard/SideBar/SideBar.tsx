import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";

export type sidebarItems = {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: sidebarItems[];
};

const sidebarItem: sidebarItems[] = [];

sidebarItem.push(
  {
    title: "Add Project",
    path: `/dashboard/project`,
    icon: InboxIcon,
  },
  {
    title: "Add Skill",
    path: `/dashboard/skill`,
    icon: InboxIcon,
  },
  {
    title: "Add Blog",
    path: `/dashboard/blog`,
    icon: InboxIcon,
  }
);
const SideBar = () => {
  const drawer = (
    <div>
      <List>
        {sidebarItem?.map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link href={text.path}>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {text.icon && <text.icon />}
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      <Typography
        fontWeight={600}
        sx={{
          fontSize: "25px",
          textAlign: "center",
          mt: "5px",
          py: "10px",
        }}
      >
        Portfolio
      </Typography>
      {drawer}
    </Box>
  );
};

export default SideBar;
