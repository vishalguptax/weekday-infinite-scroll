import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./job-card.module.css";

const images = [
  "https://mui.com//static/images/avatar/1.jpg",
  "https://mui.com//static/images/avatar/2.jpg",
  "https://mui.com//static/images/avatar/3.jpg",
];

export const JobCard = ({ data }) => {
  const {
    companyName,
    location,
    logoUrl,
    jobRole,
    minJdSalary,
    maxJdSalary,
    jobDetailsFromCompany,
    minExp,
  } = data;
  return (
    <Card className={styles.card}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="caption" className={styles.postedOn}>
          ⌛ Posted 10 Days Ago
        </Typography>
        <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
          <Avatar
            src={logoUrl}
            alt={`${companyName} Logo`}
            sx={{ width: 40, height: 40 }}
          />
          <Box textTransform="capitalize">
            <Typography
              variant="h1"
              sx={{ fontSize: 13, fontWeight: 500 }}
              color="text.disabled"
            >
              {companyName}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 14 }}>
              {jobRole} Engineer
            </Typography>
            <Typography variant="subtitle2" fontSize={11}>
              {location}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Estimated Salary: {minJdSalary ?? 0} - {maxJdSalary} LPA ✅
        </Typography>
        <Box>
          <Typography variant="subtitle2">About Company</Typography>
          <p>
            <strong>About Us</strong>
          </p>
          <Typography variant="body2">{jobDetailsFromCompany}</Typography>
        </Box>

        <Button variant="text" className={styles.viewBtn}>
          View Job
        </Button>
        <Box>
          <Typography
            variant="h3"
            fontSize={13}
            fontWeight={600}
            color="text.disabled"
          >
            Minimum Experience
          </Typography>
          <Typography variant="body2">{minExp ?? 1} years</Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button variant="contained" color="secondary" size="large" fullWidth>
            ⚡ Easy Apply
          </Button>
          <Button color="primary" variant="contained" size="large" fullWidth>
            <Stack direction="row" spacing={1} alignItems="center">
              {images?.map((i, index) => (
                <Avatar
                  key={index}
                  src={i}
                  sizes="small"
                  sx={{ width: 20, height: 20, filter: "blur(1.5px)" }}
                />
              ))}
              <span> Unlock referral asks</span>
            </Stack>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
