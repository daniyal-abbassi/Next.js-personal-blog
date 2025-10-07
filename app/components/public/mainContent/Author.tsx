import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";




export function Author({ author,date }:{author: string,date: Date}) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
          }}
        >
          <AvatarGroup max={3}>
            <Avatar alt="lain" src="lain" sx={{ width: 24, height: 24 }} />
          </AvatarGroup>
          <Typography variant="caption">{author}</Typography>
        </Box>
        <Typography variant="caption">{format(new Date(date), 'dd MMMM yyyy')}</Typography>
      </Box>
    );
  }