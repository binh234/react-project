import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function CardItem() {
  return (
      <Card className="card">
        <CardMedia
          className="card-media"
          component="img"
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5">
            Heading
          </Typography>
          <Typography gutterBottom variant="body1">
            Pariatur ad adipisicing velit fugiat culpa. Sit exercitation
            cupidatat culpa dolor laboris occaecat qui. Nostrud magna et magna
            nisi laborum excepteur duis exercitation irure consectetur sint.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
  );
}
