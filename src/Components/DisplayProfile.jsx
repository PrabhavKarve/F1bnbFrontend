import React from 'react';
import { Box, Typography, Button, Avatar, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProfileContainer = styled(Box)(({ theme }) => ({
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  }));
  
  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));
  
  const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: '150px',
    height: '150px',
    marginRight: '30px',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: '20px',
    },
  }));
  
  const ProfileStats = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '400px',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }));
  
  const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    flexBasis: '33.33%',
    marginBottom: '20px',
  }));
  
  const ProfileListings = styled(Grid)(({ theme }) => ({
    gap: '20px',
  }));
  
  const ListingCard = styled(Paper)(({ theme }) => ({
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
  }));

export default function DisplayProfile({ profile, email, onHost }) {

    const handleHostClick = () => {
        // Implement your hosting logic here
        console.log("Host button clicked!");
        onHost();
        // For example, you might want to redirect to a different page or open a modal
        // window.location.href = '/host'; // Uncomment and replace with your route if needed
      };

    return (
    <StyledProfileContainer>
      <Header>
        <ProfileAvatar src="/placeholder.svg?height=150&width=150" alt="Profile Avatar" />
        <Box
          sx={{
            width: '150px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px', // Add spacing between children
          }}
        >
          <Typography variant="h4">{email}</Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.city}, {profile.state}
          </Typography>
          <Button variant="contained" color="secondary">
            Edit Profile
          </Button>
          <Button variant="contained" color="secondary" onClick={handleHostClick}>
            Host
          </Button>
        </Box>
      </Header>

      <ProfileStats>
        <StatBox>
          <Typography variant="h6" color="secondary">
            {profile.review_count || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reviews
          </Typography>
        </StatBox>
        <StatBox>
          <Typography variant="h6" color="secondary">
            {profile.rating || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating
          </Typography>
        </StatBox>
        <StatBox>
          <Typography variant="h6" color="secondary">
            3
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Years hosting
          </Typography>
        </StatBox>
      </ProfileStats>

      <Box mb={3}>
        <Typography variant="h5" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">{profile.about}</Typography>
      </Box>

      <ProfileListings container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <ListingCard>
            <img
              src="/placeholder.svg?height=200&width=250"
              alt="Cozy Studio in Downtown"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Box p={2}>
              <Typography variant="h6">Cozy Studio in Downtown</Typography>
              <Typography variant="subtitle1" color="secondary">
                $120 / night
              </Typography>
            </Box>
          </ListingCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ListingCard>
            <img
              src="/placeholder.svg?height=200&width=250"
              alt="Spacious Loft with City View"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Box p={2}>
              <Typography variant="h6">Spacious Loft with City View</Typography>
              <Typography variant="subtitle1" color="secondary">
                $180 / night
              </Typography>
            </Box>
          </ListingCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ListingCard>
            <img
              src="/placeholder.svg?height=200&width=250"
              alt="Charming Cottage near the Beach"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Box p={2}>
              <Typography variant="h6">Charming Cottage near the Beach</Typography>
              <Typography variant="subtitle1" color="secondary">
                $150 / night
              </Typography>
            </Box>
          </ListingCard>
        </Grid>
      </ProfileListings>
    </StyledProfileContainer>
  )
}
