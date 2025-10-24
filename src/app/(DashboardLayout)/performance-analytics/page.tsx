'use client'
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  LinearProgress,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconChartBar,
  IconCalendar,
  IconPhone,
  IconMessage,
  IconCalendarEvent,
  IconUsers,
  IconTrendingUp,
  IconClock,
} from '@tabler/icons-react';

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const PerformanceAnalyticsPage = () => {
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-10-12');

  const metrics: MetricCard[] = [
    {
      title: 'Total Calls',
      value: 342,
      change: '+12% from last period',
      icon: <IconPhone size={40} />,
      color: '#5D87FF',
    },
    {
      title: 'Total Chats',
      value: 856,
      change: '+18% from last period',
      icon: <IconMessage size={40} />,
      color: '#49BEFF',
    },
    {
      title: 'Appointments Booked',
      value: 127,
      change: '+24% from last period',
      icon: <IconCalendarEvent size={40} />,
      color: '#13DEB9',
    },
    {
      title: 'Transferred to Human',
      value: 43,
      change: '-8% from last period',
      icon: <IconUsers size={40} />,
      color: '#FFAE1F',
    },
    {
      title: 'Average Response Time',
      value: '2.3s',
      change: '-15% from last period',
      icon: <IconClock size={40} />,
      color: '#FA896B',
    },
    {
      title: 'Conversion Rate',
      value: '37.2%',
      change: '+5.2% from last period',
      icon: <IconTrendingUp size={40} />,
      color: '#7C4DFF',
    },
  ];

  const detailedMetrics = [
    { label: 'Call Success Rate', value: 94, color: '#13DEB9' },
    { label: 'Chat Resolution Rate', value: 89, color: '#5D87FF' },
    { label: 'Customer Satisfaction', value: 92, color: '#FFAE1F' },
    { label: 'First Contact Resolution', value: 78, color: '#49BEFF' },
  ];

  return (
    <PageContainer
      title="Performance Analytics"
      description="Performance Metrics and Analytics"
    >
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconChartBar size={32} />
          <Typography variant="h4">Performance Analytics</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Track your AI agent performance with detailed metrics and insights
        </Typography>

        {/* Date Range Filter */}
        <Card elevation={4} sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <IconCalendar size={20} />
              <Typography variant="h6">Select Date Range</Typography>
            </Stack>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button variant="contained" fullWidth size="large">
                  Apply Filter
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Metric Cards */}
        <Grid container spacing={3} mb={3}>
          {metrics.map((metric, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                elevation={9}
                sx={{
                  height: '100%',
                  background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}dd 100%)`,
                  color: 'white',
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Box sx={{ opacity: 0.9 }}>{metric.icon}</Box>
                    <Box>
                      <Typography variant="h3" fontWeight="700">
                        {metric.value}
                      </Typography>
                      <Typography variant="h6" fontWeight="500">
                        {metric.title}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {metric.change}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Metrics */}
        <Card elevation={9}>
          <CardContent>
            <Typography variant="h5" mb={3}>
              Detailed Performance Metrics
            </Typography>
            <Grid container spacing={3}>
              {detailedMetrics.map((metric, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="body1" fontWeight="600">
                        {metric.label}
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color={metric.color}>
                        {metric.value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        height: 12,
                        borderRadius: 5,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Volume Analysis */}
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={9}>
              <CardContent>
                <Typography variant="h5" mb={2}>
                  Volume Analysis
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Peak Hours
                    </Typography>
                    <Typography variant="h6">9 AM - 11 AM, 2 PM - 4 PM</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Busiest Day
                    </Typography>
                    <Typography variant="h6">Tuesday</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Average Daily Interactions
                    </Typography>
                    <Typography variant="h6">142 interactions/day</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={9}>
              <CardContent>
                <Typography variant="h5" mb={2}>
                  Conversion Insights
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Top Conversion Source
                    </Typography>
                    <Typography variant="h6">Website Chat (42%)</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Most Common Request
                    </Typography>
                    <Typography variant="h6">Property Viewing Requests</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Average Time to Convert
                    </Typography>
                    <Typography variant="h6">4.2 minutes</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default PerformanceAnalyticsPage;
