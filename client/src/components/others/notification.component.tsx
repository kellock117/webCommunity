import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { NotificationProps } from "../../interface/notification.interface";
import { GQL_GET_NOTIFICATIONS } from "../../constants/notification";

import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";

const Notification = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const { data, loading } = useQuery(GQL_GET_NOTIFICATIONS);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  if (loading) return <NotificationsNoneIcon />;

  const notifications: Array<NotificationProps> = data.getNotifications.filter(
    (notification: NotificationProps) => !notification.isRead
  );

  return (
    <React.Fragment>
      <IconButton onClick={openMenu}>
        {notifications.length === 0 ? (
          <NotificationsNoneIcon />
        ) : (
          <NotificationsIcon />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
        keepMounted
        variant="menu"
      >
        {notifications.length === 0
          ? "No notofication"
          : notifications.map((notification: NotificationProps) => {
              return (
                <MenuItem key={notification.id}>
                  <ListItemText></ListItemText>
                </MenuItem>
                // `${userName} liked your post. title: some title`
                // `${userName} liked your comment. content: some comment`
                // `${userName} comment on your post. title: some title`
                // `${userName} metioned you. title: some title`
                // <Divider />
              );
            })}
      </Menu>
    </React.Fragment>
  );
};

export default Notification;
