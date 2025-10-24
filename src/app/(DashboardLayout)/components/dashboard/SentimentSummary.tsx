'use client'
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Grid,
} from '@mui/material';
import {
  IconMoodHappy,
  IconMoodSmile,
  IconMoodEmpty,
  IconMoodSad,
} from '@tabler/icons-react';

interface SentimentData {
  label: string;
  score: number;
  color: string;
  icon: React.ReactNode;
}

const SentimentSummary = () => {
  const sentiments: SentimentData[] = [
    {
      label: 'Very Positive',
      score: 65,
      color: '#13DEB9',
      icon: <IconMoodHappy size={30} />,
    },
    {
      label: 'Positive',
      score: 25,
      color: '#5D87FF',
      icon: <IconMoodSmile size={30} />,
    },
    {
      label: 'Neutral',
      score: 8,
      color: '#FFAE1F',
      icon: <IconMoodEmpty size={30} />,
    },
    {
      label: 'Negative',
      score: 2,
      color: '#FA896B',
      icon: <IconMoodSad size={30} />,
    },
  ];

  const overallScore = 8.4;

  return (
    <Card elevation={9}>
      <CardContent>
        <Typography variant="h5" mb={1}>
          Sentiment Summary
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={3}>
          Emotion scores from customer interactions
        </Typography>

        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'primary.light',
            borderRadius: '12px',
            padding: 3,
            mb: 3,
          }}
        >
          <Typography variant="h2" fontWeight="700" color="primary.main">
            {overallScore}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Overall Satisfaction Score
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Out of 10 | Based on last 100 interactions
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {sentiments.map((sentiment, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ color: sentiment.color }}>{sentiment.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.5}
                  >
                    <Typography variant="body2" fontWeight="600">
                      {sentiment.label}
                    </Typography>
                    <Typography variant="body2" fontWeight="700">
                      {sentiment.score}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={sentiment.score}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: sentiment.color,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SentimentSummary;
