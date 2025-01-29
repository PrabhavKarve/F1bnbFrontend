import React from 'react';
import { Container, Typography, Button, Grid, Box, List, ListItem, Avatar } from '@mui/material';
import Slider from './Slider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const SiteDetails = ({ property, onBack }) => {
  return (
    <Container maxWidth="lg" sx={{ padding: 2, fontFamily: 'Arial, sans-serif' }}>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        variant="text" 
        sx={{ marginBottom: 2, color: '#ad0bde', '&:hover': { color: '#8f09b9' } }}
        onClick={onBack}
      >
        Back
      </Button>

      <Typography variant="h4" sx={{ color: '#ad0bde', marginBottom: 2 }}>
        {property.property_name}
      </Typography>

      <Box>
        <Slider property={property}></Slider>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Hosted by {property.username}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ color: '#717171' }}>
          <Typography>{property.no_of_guests} guests · {property.no_of_bedrooms} bedrooms · {property.no_of_bed} beds · {property.no_of_bath} bath</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ borderTop: '1px solid #e0e0e0', paddingTop: 2 }}>
            About this place
          </Typography>
          <Typography>{property.about}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ borderTop: '1px solid #e0e0e0', paddingTop: 2 }}>
            What this place offers
          </Typography>
          <List sx={{ padding: 0 }}>
            {property.amenities.map((amenity) => (
              <ListItem key={amenity} disablePadding>{amenity}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#ad0bde', color: 'white', borderRadius: 2, marginTop: 2, '&:hover': { backgroundColor: '#8f09b9' } }}
      >
        Book Now
      </Button>
    </Container>
  );
};

export default SiteDetails;