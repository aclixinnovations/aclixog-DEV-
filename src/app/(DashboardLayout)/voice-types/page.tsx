'use client'
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { IconLock, IconMicrophone, IconVolumeOff } from '@tabler/icons-react';

interface VoiceType {
  id: string;
  name: string;
  description: string;
  language: string;
  gender: string;
  locked: boolean;
}

const VoiceTypesPage = () => {
  const voiceTypes: VoiceType[] = [
    {
      id: '1',
      name: 'Professional Female',
      description: 'Clear, professional tone perfect for business communications',
      language: 'English (US)',
      gender: 'Female',
      locked: true,
    },
    {
      id: '2',
      name: 'Professional Male',
      description: 'Confident, authoritative voice for formal interactions',
      language: 'English (US)',
      gender: 'Male',
      locked: true,
    },
    {
      id: '3',
      name: 'Friendly Female',
      description: 'Warm, approachable tone for customer service',
      language: 'English (US)',
      gender: 'Female',
      locked: true,
    },
    {
      id: '4',
      name: 'Friendly Male',
      description: 'Casual, conversational style for relaxed interactions',
      language: 'English (US)',
      gender: 'Male',
      locked: true,
    },
    {
      id: '5',
      name: 'Multilingual Female',
      description: 'Supports multiple languages with natural accent',
      language: 'Multi-language',
      gender: 'Female',
      locked: true,
    },
    {
      id: '6',
      name: 'Multilingual Male',
      description: 'Versatile voice supporting various languages',
      language: 'Multi-language',
      gender: 'Male',
      locked: true,
    },
  ];

  return (
    <PageContainer title="Voice Types" description="AI Voice Types Configuration">
      <Box>
        <Typography variant="h4" mb={2}>
          Voice Types
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Choose from a variety of AI voice types for your calling agent
        </Typography>

        <Alert severity="warning" icon={<IconLock />} sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="600">
            Voice Calling Features are Currently Locked
          </Typography>
          <Typography variant="caption">
            Upgrade your plan to unlock AI voice calling capabilities and access all voice types.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {voiceTypes.map((voice) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={voice.id}>
              <Card
                elevation={9}
                sx={{
                  height: '100%',
                  position: 'relative',
                  opacity: voice.locked ? 0.7 : 1,
                  '&:hover': {
                    transform: voice.locked ? 'none' : 'translateY(-4px)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <IconMicrophone size={32} color="#5D87FF" />
                    {voice.locked && (
                      <Chip
                        icon={<IconLock size={14} />}
                        label="Locked"
                        size="small"
                        color="warning"
                        sx={{ height: '24px' }}
                      />
                    )}
                  </Stack>

                  <Typography variant="h6" mb={1}>
                    {voice.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {voice.description}
                  </Typography>

                  <Stack spacing={1} mb={2}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={voice.language}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        label={voice.gender}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled={voice.locked}
                      startIcon={<IconVolumeOff size={16} />}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      disabled={voice.locked}
                    >
                      Select
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" size="large">
            Upgrade to Unlock Voice Features
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VoiceTypesPage;
