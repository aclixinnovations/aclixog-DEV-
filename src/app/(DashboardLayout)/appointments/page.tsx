'use client'
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  Button,
  Grid,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconCalendar,
  IconPhone,
  IconMail,
  IconMapPin,
  IconCheck,
  IconX,
  IconEdit,
  IconRobot,
} from '@tabler/icons-react';

interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  bookedVia: 'ai-agent' | 'manual';
  notes: string;
}

const AppointmentsPage = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      propertyAddress: '123 Main Street, Unit 4B',
      appointmentDate: '2025-10-17',
      appointmentTime: '2:00 PM',
      status: 'scheduled',
      bookedVia: 'ai-agent',
      notes: 'Interested in 2-bedroom downtown unit',
    },
    {
      id: '2',
      customerName: 'Michael Brown',
      email: 'mbrown@example.com',
      phone: '+1 (555) 234-5678',
      propertyAddress: '456 Oak Avenue, Unit 12C',
      appointmentDate: '2025-10-18',
      appointmentTime: '10:00 AM',
      status: 'confirmed',
      bookedVia: 'ai-agent',
      notes: 'Looking for pet-friendly apartment',
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      email: 'e.rodriguez@example.com',
      phone: '+1 (555) 345-6789',
      propertyAddress: '789 Pine Street, Unit 7A',
      appointmentDate: '2025-10-18',
      appointmentTime: '3:00 PM',
      status: 'scheduled',
      bookedVia: 'ai-agent',
      notes: 'First-time renter, needs parking space',
    },
    {
      id: '4',
      customerName: 'David Wilson',
      email: 'dwilson@example.com',
      phone: '+1 (555) 456-7890',
      propertyAddress: '321 Elm Drive, Penthouse',
      appointmentDate: '2025-10-19',
      appointmentTime: '11:00 AM',
      status: 'confirmed',
      bookedVia: 'ai-agent',
      notes: 'Premium unit viewing, corporate relocation',
    },
    {
      id: '5',
      customerName: 'Jennifer Lee',
      email: 'jlee@example.com',
      phone: '+1 (555) 567-8901',
      propertyAddress: '555 Maple Court, Unit 3B',
      appointmentDate: '2025-10-15',
      appointmentTime: '1:00 PM',
      status: 'completed',
      bookedVia: 'ai-agent',
      notes: 'Completed viewing, waiting for decision',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const stats = [
    { label: 'Total Appointments', value: appointments.length, color: '#5D87FF' },
    {
      label: 'Scheduled/Confirmed',
      value: appointments.filter((a) => a.status === 'scheduled' || a.status === 'confirmed')
        .length,
      color: '#13DEB9',
    },
    {
      label: 'Completed',
      value: appointments.filter((a) => a.status === 'completed').length,
      color: '#FFAE1F',
    },
    {
      label: 'Booked via AI',
      value: appointments.filter((a) => a.bookedVia === 'ai-agent').length,
      color: '#49BEFF',
    },
  ];

  return (
    <PageContainer title="Appointments" description="Appointment Management">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconCalendar size={32} />
          <Typography variant="h4">Appointments</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          View and manage all appointments booked through Aclix AI Agent
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                elevation={9}
                sx={{
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h3" fontWeight="700" mb={1}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6">{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card elevation={9}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Customer</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Contact</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Property</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Date & Time</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Source</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {appointment.customerName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {appointment.notes}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconMail size={14} />
                            <Typography variant="caption">{appointment.email}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconPhone size={14} />
                            <Typography variant="caption">{appointment.phone}</Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="flex-start">
                          <IconMapPin size={16} />
                          <Typography variant="body2">{appointment.propertyAddress}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {appointment.appointmentDate}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {appointment.appointmentTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(appointment.status) as any}
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        {appointment.bookedVia === 'ai-agent' && (
                          <Chip
                            icon={<IconRobot size={14} />}
                            label="AI Agent"
                            size="small"
                            color="info"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            size="small"
                            color="primary"
                            title="Edit"
                            disabled={appointment.status === 'completed'}
                          >
                            <IconEdit size={20} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            title="Confirm"
                            disabled={
                              appointment.status === 'confirmed' ||
                              appointment.status === 'completed'
                            }
                          >
                            <IconCheck size={20} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            title="Cancel"
                            disabled={appointment.status === 'completed'}
                          >
                            <IconX size={20} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" size="large">
            Export Appointments
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AppointmentsPage;
