'use client'
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { IconExternalLink, IconPlugConnected } from '@tabler/icons-react';

const IntegrationButtons = () => {
  const handleAppfolioLogin = () => {
    // In production, this would redirect to Appfolio OAuth or login
    window.open('https://www.appfolio.com', '_blank');
  };

  const handleShowmojoLogin = () => {
    // In production, this would redirect to Showmojo OAuth or login
    window.open('https://www.showmojo.com', '_blank');
  };

  return (
    <Card elevation={9}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconPlugConnected size={24} />
          <Typography variant="h5">Integrations</Typography>
        </Stack>
        <Typography variant="subtitle2" color="textSecondary" mb={3}>
          Quick access to your connected platforms
        </Typography>

        <Stack spacing={2}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" mb={0.5}>
                  Appfolio
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label="Connected"
                    size="small"
                    color="success"
                    sx={{ height: '20px' }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Last synced: 2 hours ago
                  </Typography>
                </Stack>
              </Box>
              <Button
                variant="contained"
                color="primary"
                endIcon={<IconExternalLink size={16} />}
                onClick={handleAppfolioLogin}
              >
                Open
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" mb={0.5}>
                  ShowMojo
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label="Connected"
                    size="small"
                    color="success"
                    sx={{ height: '20px' }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Last synced: 1 hour ago
                  </Typography>
                </Stack>
              </Box>
              <Button
                variant="contained"
                color="primary"
                endIcon={<IconExternalLink size={16} />}
                onClick={handleShowmojoLogin}
              >
                Open
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IntegrationButtons;
