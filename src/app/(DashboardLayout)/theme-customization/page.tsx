'use client'
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Alert,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { IconPalette, IconCheck } from '@tabler/icons-react';
import { useThemeContext } from '@/contexts/ThemeContext';

interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

const ThemeCustomizationPage = () => {
  const { themeMode, setThemeMode } = useThemeContext();
  const [selectedTheme, setSelectedTheme] = useState(themeMode);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSelectedTheme(themeMode);
  }, [themeMode]);

  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Default Blue',
      description: 'Professional blue theme with modern aesthetics',
      primaryColor: '#5D87FF',
      secondaryColor: '#49BEFF',
      backgroundColor: '#F5F7FA',
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes with dark backgrounds',
      primaryColor: '#1E88E5',
      secondaryColor: '#26C6DA',
      backgroundColor: '#1A1A1A',
    },
    {
      id: 'green',
      name: 'Nature Green',
      description: 'Fresh and calming green palette',
      primaryColor: '#4CAF50',
      secondaryColor: '#8BC34A',
      backgroundColor: '#F1F8E9',
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      description: 'Elegant purple theme for a premium look',
      primaryColor: '#7C4DFF',
      secondaryColor: '#B388FF',
      backgroundColor: '#F3E5F5',
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      description: 'Warm and energetic orange tones',
      primaryColor: '#FF6F00',
      secondaryColor: '#FFB74D',
      backgroundColor: '#FFF3E0',
    },
    {
      id: 'teal',
      name: 'Ocean Teal',
      description: 'Cool and professional teal palette',
      primaryColor: '#00897B',
      secondaryColor: '#4DB6AC',
      backgroundColor: '#E0F2F1',
    },
  ];

  const handleSave = () => {
    setThemeMode(selectedTheme as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageContainer title="Theme Customization" description="Dashboard Theme Settings">
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconPalette size={32} />
          <Typography variant="h4">Theme Customization</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Choose a color palette that matches your brand identity
        </Typography>

        {saved && (
          <Alert severity="success" icon={<IconCheck />} sx={{ mb: 3 }}>
            Theme saved successfully!
          </Alert>
        )}

        <RadioGroup value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value as any)}>
          <Grid container spacing={3}>
            {themes.map((theme) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={theme.id}>
                <Card
                  elevation={selectedTheme === theme.id ? 12 : 4}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    border: selectedTheme === theme.id ? 3 : 0,
                    borderColor: 'primary.main',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s',
                    },
                  }}
                  onClick={() => setSelectedTheme(theme.id as any)}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{theme.name}</Typography>
                      <FormControlLabel
                        value={theme.id}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                    </Stack>

                    <Typography variant="body2" color="textSecondary" mb={2}>
                      {theme.description}
                    </Typography>

                    {/* Color Preview */}
                    <Stack direction="row" spacing={1} mb={2}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.primaryColor,
                          borderRadius: 1,
                          border: '2px solid',
                          borderColor: 'divider',
                        }}
                      />
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.secondaryColor,
                          borderRadius: 1,
                          border: '2px solid',
                          borderColor: 'divider',
                        }}
                      />
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.backgroundColor,
                          borderRadius: 1,
                          border: '2px solid',
                          borderColor: 'divider',
                        }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption" color="textSecondary">
                        Primary
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Secondary
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Background
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
            startIcon={<IconCheck />}
          >
            Save Theme Settings
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ThemeCustomizationPage;
