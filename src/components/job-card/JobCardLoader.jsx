import { Card, Grid, Skeleton } from "@mui/material";
import styles from "./job-card.module.css";

export const JobCardLoader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <Grid
          key={i}
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card className={styles.card} sx={{ width: 360, height: 700 }}>
            <Skeleton variant="rounded" width={"100%"} height={"100%"} />
          </Card>
        </Grid>
      ))}
    </>
  );
};
