import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Like from "./like.component";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

interface props {
  id: React.Key;
  title: string;
  time: string;
  content: string;
  likes: string[];
  comments: string[];
}

export default function Post(props: props) {
  const { user } = useContext(AuthContext);
  const postDate = new Date(props.time);

  return (
    <Grid item key={props.id} xs={10} justifyContent="center">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={props.title}
          subheader={getTimeInformation(postDate)}
          titleTypographyProps={{
            variant: "h5",
            fontWeight: "bold",
          }}
        ></CardHeader>
        <CardContent>
          <Typography variant="h5">{props.content}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Like
            key={props.id}
            id={props.id}
            user={user.id}
            likes={props.likes}
          />
          <IconButton style={{ color: "#50bcdf" }} aria-label="comments">
            <CommentIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

function getTimeInformation(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}
