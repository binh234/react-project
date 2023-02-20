import { Container, Grid } from "@mui/material";
import CardItem from "./CardItem";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function CardList() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid className="card-grid" container spacing={4} justifyContent="center">
        {cards.map((id) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <CardItem key={id} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
