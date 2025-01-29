import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayProfile from './DisplayProfile';
import HostPropertyForm from './HostProperty';
import EditProfile from './EditProfile';
import { Box, Typography, Button, Avatar, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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

export default function Profile({ email }) {
  const [toDisplayProfile, setToDisplayProfile] = useState(true)
  const [toHostProperty, setToHostProperty] = useState(false)
  const [toEditProfile, setToEditProfile] = useState(false)
  const [properties, setProperties] = useState([]);
  const [profile, setProfile] = useState({
    email: '',
    username: '',
    date_of_birth: '',
    city: '',
    state: '',
    rating: null,
    review_count: null,
    about: '',
    profile_picture: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(`${apiBaseUrl}/api/auth/getProfile`, { email }, { withCredentials: true });
        setProfile({
          email: response.data.email,
          username: response.data.username,
          date_of_birth: response.data.date_of_birth,
          city: response.data.city,
          state: response.data.state,
          rating: response.data.rating ?? null,
          review_count: response.data.review_count ?? null,
          about: response.data.about ?? '',
          profile_picture: response.data.profile_picture ?? '',
          propreties: response.data.properties
        });
        setProperties(Array.isArray(response.data.properties) ? response.data.properties : []);
        localStorage.setItem('profile', email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [email]);

  const handleHostClick = () => {
    setToHostProperty(true); // Mark user as authenticated
    setToDisplayProfile(false)
    setToEditProfile(false)
  };

  const handleDisplayProfileClick = () => {
    setToHostProperty(false); // Mark user as authenticated
    setToDisplayProfile(true)
    setToEditProfile(false)
  };

  const handleEditProfile = () => {
    setToHostProperty(false); // Mark user as authenticated
    setToDisplayProfile(false)
    setToEditProfile(true)
  }

  return (
    <div>
     <StyledProfileContainer>
      <Header>
        <ProfileAvatar src={profile.profile_picture} alt="Profile Avatar" />
            <Box>
              <Typography variant="h4">{email}</Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.city}, {profile.state}
              </Typography>
              <Button variant="contained" color="secondary" sx={{ marginRight: '1rem' }} onClick={handleDisplayProfileClick}>
                Your Sites
              </Button>
              <Button variant="contained" color="secondary" sx={{ marginRight: '1rem' }} onClick={handleEditProfile}>
                Edit Profile
              </Button>
              <Button variant="contained" color="secondary" sx={{ marginRight: '1rem' }} onClick={handleHostClick}>
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

      {toDisplayProfile && <div><Box mb={3}>
        <Typography variant="h5" gutterBottom>
            About
        </Typography>
        <Typography variant="body1">{profile.about}</Typography>
      </Box>
      
      <ProfileListings container spacing={2}>
      {properties.map((property, index) => (

        <Grid item xs={12} sm={6} md={4}>
                  <ListingCard>
                    <img
                      src= {`${properties[index].images[0]}`} // Use the first image of the property
                      alt={property.property_name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <Box p={2}>
                      <Typography variant="h6">{property.property_name}</Typography>
                      <Typography variant="subtitle1" color="secondary">
                        ${property.price_per_night} / night
                      </Typography>
                    </Box>
                  </ListingCard>
                </Grid>
      ))}
      </ProfileListings></div>}
      {toHostProperty && <HostPropertyForm email = {email}></HostPropertyForm>}
      {toEditProfile && <EditProfile profile = {profile}></EditProfile>}
    </StyledProfileContainer>
    </div>
  );
}
