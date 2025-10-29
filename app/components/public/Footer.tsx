import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://github.com/daniyal-abbassi">
        Daniyal Abbassi
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      {/* <Divider /> */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
       

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Typography color="text.secondary" variant="body2">
              PERSONAL BLOG - Next.js Project
            </Typography>
          
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/daniyal-abbassi"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://t.me/username37531"
              aria-label="telegram"
              sx={{ alignSelf: 'center' }}
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/dani-abbassi-b47122363"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
