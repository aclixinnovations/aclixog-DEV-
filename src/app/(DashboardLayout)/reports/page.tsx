'use client'
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconFileText,
  IconDownload,
  IconCalendar,
  IconFileTypeCsv,
  IconFileTypePdf,
  IconChartBar,
  IconPhone,
  IconMessage,
  IconMail,
  IconUsers,
} from '@tabler/icons-react';

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ReportsPage = () => {
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-10-12');
  const [reportType, setReportType] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');
  const [successMessage, setSuccessMessage] = useState('');

  const reportTypes: ReportType[] = [
    {
      id: 'performance',
      name: 'Performance Summary',
      description:
        'Complete analytics report including calls, chats, appointments, and conversion rates',
      icon: <IconChartBar size={24} />,
    },
    {
      id: 'calls',
      name: 'Call Analytics Report',
      description: 'Detailed breakdown of all call interactions, durations, and outcomes',
      icon: <IconPhone size={24} />,
    },
    {
      id: 'chats',
      name: 'Chat Interactions Report',
      description: 'Analysis of chat conversations, response times, and resolution rates',
      icon: <IconMessage size={24} />,
    },
    {
      id: 'emails',
      name: 'Email Communications Report',
      description: 'Summary of AI-drafted emails, approval rates, and delivery status',
      icon: <IconMail size={24} />,
    },
    {
      id: 'appointments',
      name: 'Appointments Report',
      description: 'List of all scheduled appointments with customer details and status',
      icon: <IconCalendar size={24} />,
    },
    {
      id: 'customer',
      name: 'Customer Sentiment Report',
      description: 'Emotion scores, satisfaction ratings, and feedback analysis',
      icon: <IconUsers size={24} />,
    },
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      alert('Please select a report type');
      return;
    }

    // In production, this would make an API call to generate the report
    setSuccessMessage(
      `${reportTypes.find((r) => r.id === reportType)?.name} has been generated and downloaded as ${exportFormat.toUpperCase()}`
    );
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <PageContainer title="Reports" description="Generate and Export Reports">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconFileText size={32} />
          <Typography variant="h4">Reports</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Generate detailed reports with exportable data in CSV or PDF format
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Report Configuration */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card elevation={9}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  Report Configuration
                </Typography>

                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel>Report Type</InputLabel>
                    <Select
                      value={reportType}
                      label="Report Type"
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      {reportTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {type.icon}
                            <span>{type.name}</span>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Divider />

                  <Typography variant="h6">Date Range</Typography>

                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Divider />

                  <Typography variant="h6">Export Format</Typography>

                  <FormControl fullWidth>
                    <InputLabel>Format</InputLabel>
                    <Select
                      value={exportFormat}
                      label="Format"
                      onChange={(e) => setExportFormat(e.target.value)}
                    >
                      <MenuItem value="csv">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconFileTypeCsv size={20} />
                          <span>CSV (Comma-Separated Values)</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="pdf">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconFileTypePdf size={20} />
                          <span>PDF (Portable Document Format)</span>
                        </Stack>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={<IconDownload />}
                    onClick={handleGenerateReport}
                  >
                    Generate & Download Report
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Available Reports */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card elevation={9}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  Available Report Types
                </Typography>

                <List>
                  {reportTypes.map((type) => (
                    <ListItem
                      key={type.id}
                      sx={{
                        borderRadius: '8px',
                        mb: 2,
                        backgroundColor:
                          reportType === type.id ? 'primary.light' : 'background.paper',
                        border: '1px solid',
                        borderColor: reportType === type.id ? 'primary.main' : 'divider',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      onClick={() => setReportType(type.id)}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>{type.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="600">
                            {type.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="textSecondary">
                            {type.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Report Metrics Preview */}
            <Card elevation={9} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  Report Metrics Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="700" color="primary.main">
                        1,542
                      </Typography>
                      <Typography variant="body2">Total Interactions</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="700" color="success.main">
                        92%
                      </Typography>
                      <Typography variant="body2">Success Rate</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="700" color="warning.main">
                        127
                      </Typography>
                      <Typography variant="body2">Appointments Booked</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
                      <Typography variant="h4" fontWeight="700" color="info.main">
                        2.3s
                      </Typography>
                      <Typography variant="body2">Avg Response Time</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ReportsPage;
