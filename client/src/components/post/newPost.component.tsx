import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../../util/hooks";
import { GQL_CREATE_POST } from "../../constants/post";
import { postsValue } from "../../context/postContext";
import { errorValue } from "../../context/errorContext";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const NewPost = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallBack, {
    title: "",
    content: "",
  });

  const [createPost, { loading }] = useMutation(GQL_CREATE_POST, {
    variables: values,
    onCompleted: data => {
      postsValue([data.createPost, ...postsValue()]);
    },
    onError: error => {
      errorValue(error);
    },
  });

  function createPostCallBack(): void {
    createPost();
  }

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper variant="outlined" sx={{ my: 5, p: 5 }}>
          <Typography component="h1" variant="h4" align="center">
            New Post
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  title="title"
                  label="Title"
                  name="title"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="content"
                  label="Content"
                  title="content"
                  multiline
                  rows={6}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default NewPost;
