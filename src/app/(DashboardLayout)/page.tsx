'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import QuickStats from '@/app/(DashboardLayout)/components/dashboard/QuickStats';
import RecentInteractions from '@/app/(DashboardLayout)/components/dashboard/RecentInteractions';
import SentimentSummary from '@/app/(DashboardLayout)/components/dashboard/SentimentSummary';
import IntegrationButtons from '@/app/(DashboardLayout)/components/dashboard/IntegrationButtons';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Aclix AI Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* Quick Stats - Full Width */}
          <Grid size={12}>
            <QuickStats />
          </Grid>

          {/* Recent Interactions - Left Side */}
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <RecentInteractions />
          </Grid>

          {/* Right Side - Sentiment & Integrations */}
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <SentimentSummary />
              </Grid>
              <Grid size={12}>
                <IntegrationButtons />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
