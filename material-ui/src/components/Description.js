import { Button, Container, Grid, Typography } from "@mui/material";

export function Description() {
  return (
    <div className="album-header">
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Photo Album
        </Typography>
        <Typography
          variant="subtitle1"
          align="justify"
          color="textSecondary"
          paragraph
        >
          Reprehenderit magna reprehenderit tempor proident dolor incididunt
          ullamco culpa labore ut occaecat. Culpa quis dolore tempor adipisicing
          commodo occaecat ad voluptate elit nisi. In nulla nulla ad nostrud
          aliquip cillum. Pariatur proident mollit duis nisi incididunt dolor
          Lorem laboris magna sit deserunt Lorem duis magna. Culpa amet labore
          velit in laboris anim.
        </Typography>
        <div>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            align="center"
          >
            <Grid item md={4} sm={6} xs={12}>
              <Button variant="contained" color="primary">
                See my photos
              </Button>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Button variant="outlined" color="primary">
                Secondary action
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
