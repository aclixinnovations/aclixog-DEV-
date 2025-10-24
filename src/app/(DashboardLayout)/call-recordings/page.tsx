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
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import {
  IconPhone,
  IconPlayerPlay,
  IconDownload,
  IconFileText,
  IconX,
} from '@tabler/icons-react';

interface CallRecording {
  id: string;
  customerName: string;
  phoneNumber: string;
  duration: string;
  timestamp: string;
  status: 'completed' | 'transferred' | 'missed';
  transcript: string;
}

const CallRecordingsPage = () => {
  const [selectedRecording, setSelectedRecording] = useState<CallRecording | null>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const recordings: CallRecording[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      phoneNumber: '+1 (555) 123-4567',
      duration: '4:32',
      timestamp: '2025-10-12 09:15 AM',
      status: 'completed',
      transcript: `Agent: Thank you for calling Aclix Property Management. How can I help you today?\n\nCustomer: Hi, I'm interested in viewing an apartment in the downtown area.\n\nAgent: Great! I'd be happy to help you with that. We have several available units downtown. When would be a convenient time for you to schedule a viewing?\n\nCustomer: How about next Tuesday afternoon?\n\nAgent: Tuesday afternoon works perfectly. I've scheduled a viewing for you at 2 PM on Tuesday, October 17th. You'll receive a confirmation email shortly with the property details and meeting location.\n\nCustomer: That sounds perfect, thank you!\n\nAgent: You're welcome! Is there anything else I can help you with today?\n\nCustomer: No, that's all. Thanks!\n\nAgent: Great! Have a wonderful day and we'll see you on Tuesday.`,
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      phoneNumber: '+1 (555) 234-5678',
      duration: '2:18',
      timestamp: '2025-10-12 10:30 AM',
      status: 'transferred',
      transcript: `Agent: Thank you for calling. How may I assist you?\n\nCustomer: I need to speak with someone about a maintenance issue in my apartment.\n\nAgent: I understand. Let me transfer you to our maintenance department right away.\n\nCustomer: Thank you.`,
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      phoneNumber: '+1 (555) 345-6789',
      duration: '6:45',
      timestamp: '2025-10-12 11:45 AM',
      status: 'completed',
      transcript: `Agent: Good morning! Thank you for calling. How can I help you?\n\nCustomer: I have questions about your pet policy and lease terms.\n\nAgent: Of course! I'd be happy to explain our policies. Our pet policy allows up to two pets per unit, with a one-time pet deposit of $300 per pet. We accept cats and dogs under 50 pounds.\n\nCustomer: That's great. What about the lease terms?\n\nAgent: We offer both 6-month and 12-month lease options. The 12-month lease comes with a 5% discount on the monthly rent. Would you like me to email you our complete policy documentation?\n\nCustomer: Yes, please. That would be very helpful.\n\nAgent: Perfect! I'll send that right away. Is there anything else you'd like to know?\n\nCustomer: No, that covers everything. Thank you!`,
    },
  ];

  const handleViewTranscript = (recording: CallRecording) => {
    setSelectedRecording(recording);
    setTranscriptOpen(true);
  };

  const handleCloseTranscript = () => {
    setTranscriptOpen(false);
    setSelectedRecording(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'transferred':
        return 'warning';
      case 'missed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="Call Recordings" description="Call Recordings and Transcripts">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconPhone size={32} />
          <Typography variant="h4">Call Recordings</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          View and manage all call recordings with AI-generated transcripts
        </Typography>

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
                      <Typography variant="h6">Phone Number</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Date & Time</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Duration</Typography>
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
                  {recordings.map((recording) => (
                    <TableRow key={recording.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {recording.customerName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{recording.phoneNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{recording.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{recording.duration}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={recording.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(recording.status) as any}
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton size="small" color="primary" title="Play Recording">
                            <IconPlayerPlay size={20} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="info"
                            title="View Transcript"
                            onClick={() => handleViewTranscript(recording)}
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

        {/* Transcript Dialog */}
        <Dialog
          open={transcriptOpen}
          onClose={handleCloseTranscript}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5">Call Transcript</Typography>
                {selectedRecording && (
                  <Typography variant="caption" color="textSecondary">
                    {selectedRecording.customerName} - {selectedRecording.timestamp}
                  </Typography>
                )}
              </Box>
              <IconButton onClick={handleCloseTranscript} size="small">
                <IconX />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {selectedRecording && (
              <Box>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    lineHeight: 1.8,
                  }}
                >
                  {selectedRecording.transcript}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button startIcon={<IconDownload />} variant="outlined">
              Download Transcript
            </Button>
            <Button onClick={handleCloseTranscript} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default CallRecordingsPage;
