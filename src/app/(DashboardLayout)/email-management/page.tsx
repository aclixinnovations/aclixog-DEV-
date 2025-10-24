'use client'
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconMail,
  IconEdit,
  IconCheck,
  IconX,
  IconSend,
  IconRobot,
} from '@tabler/icons-react';

interface Email {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected' | 'sent';
  aiGenerated: boolean;
}

const EmailManagementPage = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      recipient: 'sarah.j@example.com',
      subject: 'Apartment Viewing Confirmation - Downtown Unit',
      body: `Dear Sarah,\n\nThank you for your interest in our downtown apartment unit. This email confirms your viewing appointment scheduled for Tuesday, October 17th at 2:00 PM.\n\nProperty Details:\n- Address: 123 Main Street, Unit 4B\n- Size: 2 Bedroom, 2 Bathroom\n- Monthly Rent: $2,200\n\nPlease bring a valid photo ID and feel free to contact us if you have any questions before your visit.\n\nLooking forward to meeting you!\n\nBest regards,\nAclix Property Management`,
      timestamp: '2025-10-12 14:30',
      status: 'pending',
      aiGenerated: true,
    },
    {
      id: '2',
      recipient: 'mike.chen@example.com',
      subject: 'Pet Policy and Lease Terms Information',
      body: `Dear Mike,\n\nThank you for your inquiry about our pet policy and lease terms. Here's the information you requested:\n\nPet Policy:\n- Up to 2 pets allowed per unit\n- $300 refundable deposit per pet\n- Dogs must be under 50 pounds\n- All pets require vaccination records\n\nLease Terms:\n- 6-month or 12-month options available\n- 12-month lease includes 5% discount\n- Security deposit equal to one month's rent\n- First and last month's rent required at signing\n\nI've attached our complete pet policy and lease agreement documents for your review. Please don't hesitate to reach out with any questions.\n\nBest regards,\nAclix Property Management`,
      timestamp: '2025-10-12 15:00',
      status: 'pending',
      aiGenerated: true,
    },
    {
      id: '3',
      recipient: 'david.w@example.com',
      subject: 'Rental Application Status Update',
      body: `Dear David,\n\nThank you for submitting your rental application. We wanted to update you on the status of your application.\n\nYour application is currently under review by our leasing team. We typically complete the review process within 48-72 business hours. We're currently verifying:\n- Employment information\n- Credit history\n- Previous rental references\n\nYou should receive our decision by end of day Thursday, October 14th. We'll notify you immediately once the review is complete.\n\nThank you for your patience!\n\nBest regards,\nAclix Property Management`,
      timestamp: '2025-10-12 16:15',
      status: 'pending',
      aiGenerated: true,
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOpenEmail = (email: Email) => {
    setSelectedEmail(email);
    setEditedBody(email.body);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmail(null);
    setEditedBody('');
  };

  const handleApprove = () => {
    if (selectedEmail) {
      setEmails(
        emails.map((email) =>
          email.id === selectedEmail.id ? { ...email, status: 'approved' } : email
        )
      );
      setSuccessMessage('Email approved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      handleCloseDialog();
    }
  };

  const handleReject = () => {
    if (selectedEmail) {
      setEmails(
        emails.map((email) =>
          email.id === selectedEmail.id ? { ...email, status: 'rejected' } : email
        )
      );
      setSuccessMessage('Email rejected');
      setTimeout(() => setSuccessMessage(''), 3000);
      handleCloseDialog();
    }
  };

  const handleSendEmail = () => {
    if (selectedEmail) {
      setEmails(
        emails.map((email) =>
          email.id === selectedEmail.id
            ? { ...email, status: 'sent', body: editedBody }
            : email
        )
      );
      setSuccessMessage('Email sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      handleCloseDialog();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'sent':
        return 'info';
      default:
        return 'default';
    }
  };

  const pendingCount = emails.filter((e) => e.status === 'pending').length;

  return (
    <PageContainer title="Email Management" description="AI-Generated Email Management">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconMail size={32} />
          <Typography variant="h4">Email Management</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Review and manage AI-drafted email responses before sending
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Card elevation={9} sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" mb={1}>
                  Pending Emails
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pendingCount} email{pendingCount !== 1 ? 's' : ''} awaiting your review
                </Typography>
              </Box>
              <Chip
                label={`${pendingCount} Pending`}
                color="warning"
                sx={{ fontSize: '1rem', px: 2, py: 3 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={9}>
          <CardContent>
            <List>
              {emails.map((email, index) => (
                <React.Fragment key={email.id}>
                  <ListItem
                    sx={{
                      borderRadius: '8px',
                      mb: 2,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="h6" component="span">
                            {email.subject}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {email.aiGenerated && (
                              <Chip
                                icon={<IconRobot size={14} />}
                                label="AI Generated"
                                size="small"
                                color="info"
                                sx={{ height: '24px', fontSize: '0.75rem' }}
                              />
                            )}
                            <Chip
                              label={email.status.toUpperCase()}
                              size="small"
                              color={getStatusColor(email.status) as any}
                              sx={{ height: '24px', fontSize: '0.75rem' }}
                            />
                          </Stack>
                        </Stack>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary" mb={1}>
                            To: {email.recipient} | {email.timestamp}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" mb={2}>
                            {email.body.substring(0, 120)}...
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              startIcon={<IconCheck />}
                              onClick={() => handleOpenEmail(email)}
                              disabled={email.status !== 'pending'}
                            >
                              Review
                            </Button>
                          </Stack>
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Email Review Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Review Email</Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <IconX />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {selectedEmail && (
              <Box>
                <Stack spacing={2} mb={3}>
                  <TextField
                    label="To"
                    value={selectedEmail.recipient}
                    fullWidth
                    disabled
                    size="small"
                  />
                  <TextField
                    label="Subject"
                    value={selectedEmail.subject}
                    fullWidth
                    disabled
                    size="small"
                  />
                </Stack>
                <TextField
                  label="Email Body"
                  multiline
                  rows={12}
                  fullWidth
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  helperText="You can edit the AI-generated content before sending"
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              startIcon={<IconX />}
              variant="outlined"
              color="error"
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              startIcon={<IconCheck />}
              variant="outlined"
              color="success"
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              startIcon={<IconSend />}
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default EmailManagementPage;
