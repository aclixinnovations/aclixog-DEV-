'use client'
import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Stack } from '@mui/material';
import { IconPhone, IconMessage, IconClock } from '@tabler/icons-react';

interface StatItem {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const QuickStats = () => {
  const stats: StatItem[] = [
    {
      title: 'Calls Handled',
      value: '127',
      subtitle: 'Today: 15 | This Week: 127',
      icon: <IconPhone size={40} />,
      color: '#5D87FF',
    },
    {
      title: 'Chat Responses',
      value: '342',
      subtitle: 'Today: 42 | This Week: 342',
      icon: <IconMessage size={40} />,
      color: '#49BEFF',
    },
    {
      title: 'Avg. Interaction Time',
      value: '4.2m',
      subtitle: 'Down 12% from last week',
      icon: <IconClock size={40} />,
      color: '#13DEB9',
    },
  ];

  return (
    <Card elevation={9} sx={{ padding: 0 }}>
      <CardContent>
        <Typography variant="h5" mb={3}>
          Quick Stats
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <Card
                sx={{
                  backgroundColor: stat.color,
                  color: 'white',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Box sx={{ opacity: 0.8 }}>{stat.icon}</Box>
                    <Box>
                      <Typography variant="h3" fontWeight="700">
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
