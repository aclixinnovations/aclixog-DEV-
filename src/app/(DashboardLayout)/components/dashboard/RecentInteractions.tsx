'use client'
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { IconPhone, IconMessage, IconMail } from '@tabler/icons-react';

interface Interaction {
  id: string;
  type: 'call' | 'chat' | 'email';
  customerName: string;
  summary: string;
  timestamp: string;
  status: 'completed' | 'transferred' | 'pending';
}

const RecentInteractions = () => {
  const interactions: Interaction[] = [
    {
      id: '1',
      type: 'call',
      customerName: 'Sarah Johnson',
      summary: 'Inquiry about apartment availability in downtown area. Scheduled viewing for next Tuesday.',
      timestamp: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'chat',
      customerName: 'Mike Chen',
      summary: 'Questions about lease terms and pet policy. Provided documentation and policy details.',
      timestamp: '4 hours ago',
      status: 'completed',
    },
    {
      id: '3',
      type: 'call',
      customerName: 'Emily Rodriguez',
      summary: 'Requested to speak with property manager about maintenance issue. Transferred to support.',
      timestamp: '5 hours ago',
      status: 'transferred',
    },
    {
      id: '4',
      type: 'email',
      customerName: 'David Williams',
      summary: 'Follow-up on rental application status. Sent update about approval process timeline.',
      timestamp: '1 day ago',
      status: 'completed',
    },
    {
      id: '5',
      type: 'chat',
      customerName: 'Jessica Brown',
      summary: 'Inquiry about amenities and parking options. Sent brochure and pricing information.',
      timestamp: '1 day ago',
      status: 'completed',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <IconPhone size={20} />;
      case 'chat':
        return <IconMessage size={20} />;
      case 'email':
        return <IconMail size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'transferred':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card elevation={9}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          Recent Interactions
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={3}>
          Last 5 customer interactions summary
        </Typography>
        <List>
          {interactions.map((interaction, index) => (
            <React.Fragment key={interaction.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderRadius: '8px',
                  mb: 2,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 40,
                    height: 40,
                    mr: 2,
                  }}
                >
                  {getTypeIcon(interaction.type)}
                </Avatar>
                <ListItemText
                  primary={
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="h6" component="span">
                        {interaction.customerName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {interaction.timestamp}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary" mb={1}>
                        {interaction.summary}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={interaction.type.toUpperCase()}
                          size="small"
                          variant="outlined"
                          sx={{ height: '20px', fontSize: '0.7rem' }}
                        />
                        <Chip
                          label={interaction.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(interaction.status) as any}
                          sx={{ height: '20px', fontSize: '0.7rem' }}
                        />
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
  );
};

export default RecentInteractions;
