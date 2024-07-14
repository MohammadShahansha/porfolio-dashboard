import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import React from "react";

import WebIcon from "@mui/icons-material/Web";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import PostAddIcon from "@mui/icons-material/PostAdd";
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
    icon: WebIcon,
  },
  {
    title: "Add Skill",
    path: `/dashboard/skill`,
    icon: DownhillSkiingIcon,
  },
  {
    title: "Add Blog",
    path: `/dashboard/blog`,
    icon: PostAddIcon,
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
