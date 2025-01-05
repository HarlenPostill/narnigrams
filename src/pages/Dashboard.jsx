// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { account } from '../lib/appwrite';
import StatCard from '../components/stats/StatCard';

const Dashboard = ({ user, onLogout, colorMode, toggleColorMode }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate fetching stats data
    // Replace this with your actual API call
    const fetchStats = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Replace this with your actual data fetching
        setStats({
          matchesPlayed: '42',
          winRate: '68%',
          totalScore: '1,337',
        });
      } catch (error) {
        toast({
          title: 'Error loading stats',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  async function handleLogout() {
    try {
      await account.deleteSession('current');
      onLogout();
      toast({
        title: 'Logged out successfully',
        status: 'info',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }

  return (
    <Box minH="100vh" p={20}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="lg">
          <Skeleton isLoaded={!isLoading} display="inline-block">
            Welcome, {user.name}!
          </Skeleton>
        </Heading>
        <Flex gap={2}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <Button onClick={handleLogout} colorScheme="red">
            Logout
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <StatCard
          label="Matches Played"
          value={stats?.matchesPlayed || '0'}
          isLoading={isLoading}
        />
        <StatCard label="Win Rate" value={stats?.winRate || '0%'} isLoading={isLoading} />
        <StatCard label="Total Score" value={stats?.totalScore || '0'} isLoading={isLoading} />
        <Button colorScheme="green" w="full">
          {' New Game'}
        </Button>
      </SimpleGrid>
    </Box>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  colorMode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Dashboard;
