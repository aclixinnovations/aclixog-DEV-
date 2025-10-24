'use client'
import React, { useState } from 'react';
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
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  TextField,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconMessage,
  IconFileText,
  IconDownload,
  IconX,
  IconCalendar,
  IconRobot,
  IconUser,
} from '@tabler/icons-react';

interface ChatMessage {
  sender: 'agent' | 'customer';
  message: string;
  timestamp: string;
}

interface ChatTranscript {
  id: string;
  customerName: string;
  email: string;
  timestamp: string;
  duration: string;
  status: 'completed' | 'transferred' | 'active';
  source: 'website' | 'mobile';
  messages: ChatMessage[];
}

const ChatTranscriptsPage = () => {
  const [selectedChat, setSelectedChat] = useState<ChatTranscript | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-10-12');

  const transcripts: ChatTranscript[] = [
    {
      id: '1',
      customerName: 'John Smith',
      email: 'john.smith@example.com',
      timestamp: '2025-10-12 14:30',
      duration: '8 min',
      status: 'completed',
      source: 'website',
      messages: [
        { sender: 'customer', message: 'Hello, I have a question about apartment rentals.', timestamp: '14:30' },
        { sender: 'agent', message: 'Hello! I\'d be happy to help you. What would you like to know?', timestamp: '14:30' },
        { sender: 'customer', message: 'What are your pet policies?', timestamp: '14:31' },
        { sender: 'agent', message: 'We allow up to 2 pets per unit with a $300 deposit per pet. Dogs must be under 50 pounds.', timestamp: '14:31' },
        { sender: 'customer', message: 'Great! Can I schedule a viewing?', timestamp: '14:32' },
        { sender: 'agent', message: 'Of course! When would work best for you?', timestamp: '14:32' },
        { sender: 'customer', message: 'This Friday afternoon?', timestamp: '14:33' },
        { sender: 'agent', message: 'Perfect! I\'ve scheduled a viewing for Friday at 2 PM. You\'ll receive a confirmation email shortly.', timestamp: '14:33' },
      ],
    },
    {
      id: '2',
      customerName: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      timestamp: '2025-10-12 15:45',
      duration: '5 min',
      status: 'completed',
      source: 'website',
      messages: [
        { sender: 'customer', message: 'Hi, I need information about parking.', timestamp: '15:45' },
        { sender: 'agent', message: 'Hello! I can help with that. We offer covered parking at $75/month and open parking at $50/month.', timestamp: '15:45' },
        { sender: 'customer', message: 'Are electric vehicle charging stations available?', timestamp: '15:46' },
        { sender: 'agent', message: 'Yes! We have 4 EV charging stations available for an additional $25/month.', timestamp: '15:46' },
        { sender: 'customer', message: 'Perfect, thank you!', timestamp: '15:47' },
      ],
    },
    {
      id: '3',
      customerName: 'Robert Kim',
      email: 'r.kim@example.com',
      timestamp: '2025-10-12 16:20',
      duration: '3 min',
      status: 'transferred',
      source: 'mobile',
      messages: [
        { sender: 'customer', message: 'I need to speak with a property manager about my lease.', timestamp: '16:20' },
        { sender: 'agent', message: 'I understand. Let me connect you with our property management team. May I have your name and contact information?', timestamp: '16:20' },
        { sender: 'customer', message: 'Robert Kim, r.kim@example.com, (555) 789-0123', timestamp: '16:21' },
        { sender: 'agent', message: 'Thank you, Robert. I\'ve noted your information and a property manager will contact you within 24 hours.', timestamp: '16:21' },
      ],
    },
  ];

  const handleViewChat = (chat: ChatTranscript) => {
    setSelectedChat(chat);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedChat(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'transferred':
        return 'warning';
      case 'active':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="Chat Transcripts" description="Website Chat Transcripts">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconMessage size={32} />
          <Typography variant="h4">Chat Transcripts</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          View all website chat conversations (does not include internal searches)
        </Typography>

        {/* Date Range Filter */}
        <Card elevation={4} sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <IconCalendar size={20} />
              <Typography variant="h6">Filter by Date Range</Typography>
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
                <Button variant="contained" fullWidth>
                  Apply Filter
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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
                      <Typography variant="h6">Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Date & Time</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Duration</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Source</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transcripts.map((transcript) => (
                    <TableRow key={transcript.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {transcript.customerName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{transcript.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{transcript.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{transcript.duration}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transcript.source.toUpperCase()}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transcript.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(transcript.status) as any}
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            size="small"
                            color="primary"
                            title="View Transcript"
                            onClick={() => handleViewChat(transcript)}
                          >
                            <IconFileText size={20} />
                          </IconButton>
                          <IconButton size="small" color="secondary" title="Download">
                            <IconDownload size={20} />
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

        {/* Chat Transcript Dialog */}
        <Dialog open={chatOpen} onClose={handleCloseChat} maxWidth="md" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5">Chat Transcript</Typography>
                {selectedChat && (
                  <Typography variant="caption" color="textSecondary">
                    {selectedChat.customerName} ({selectedChat.email}) - {selectedChat.timestamp}
                  </Typography>
                )}
              </Box>
              <IconButton onClick={handleCloseChat} size="small">
                <IconX />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {selectedChat && (
              <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                {selectedChat.messages.map((msg, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor:
                        msg.sender === 'agent' ? 'primary.light' : 'grey.100',
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar
                        sx={{
                          bgcolor: msg.sender === 'agent' ? 'primary.main' : 'grey.500',
                          width: 32,
                          height: 32,
                        }}
                      >
                        {msg.sender === 'agent' ? (
                          <IconRobot size={20} />
                        ) : (
                          <IconUser size={20} />
                        )}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={0.5}
                        >
                          <Typography variant="caption" fontWeight="700">
                            {msg.sender === 'agent' ? 'AI Agent' : 'Customer'}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {msg.timestamp}
                          </Typography>
                        </Stack>
                        <Typography variant="body2">{msg.message}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button startIcon={<IconDownload />} variant="outlined">
              Download Transcript
            </Button>
            <Button onClick={handleCloseChat} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ChatTranscriptsPage;
