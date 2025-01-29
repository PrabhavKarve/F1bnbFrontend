import React, { useState, useEffect } from 'react';
import SiteDetails from './SiteDetails';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function ExploreHome() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [propertyType, setPropertyType] = useState('Any');
  const [properties, setProperties] = useState([]);
  const [toSelectedProperty, setToSelectedProperty] = useState(false);
  const [toAllProperties, setToAllProperties] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bedrooms, setBedrooms] = useState("Any");
  const [ratings, setRatings] = useState(3);
  const [city, setCity] = useState("Any");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleRatingsChange = (event, newValue) => {
    setRatings(newValue);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/auth/getAllProperties`, {withCredentials: true}); // Replace with your API endpoint
        setProperties(Array.isArray(response.data.properties) ? response.data.properties : []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      }
    };
    fetchProperties();
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setToSelectedProperty(true);
    setToAllProperties(false);
  };

  // Function to filter properties based on selected filters
  const handleFilters = () => {
    const filtered = properties.filter(property => {
      const withinPriceRange = property.price_per_night >= priceRange[0] && property.price_per_night <= priceRange[1];
      const matchesPropertyType = propertyType === 'Any' || property.property_type === propertyType;
      const matchesBedrooms = bedrooms === 'Any' || property.bedrooms === bedrooms;
      const matchesCity = city === 'Any' || property.city === city;

      return withinPriceRange && matchesPropertyType && matchesBedrooms && matchesCity;
    });
    
    setFilteredProperties(filtered);
    alert(`Filters applied: Price Range: $${priceRange[0]} - $${priceRange[1]}, Property Type: ${propertyType}, Bedrooms: ${bedrooms}, City: ${city}`);
  };

  // Initialize filtered properties on mount
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  // List of cities
  const cities = [
    "Any", "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", 
    "San Francisco", "Columbus", "Fort Worth", "Charlotte", "Indianapolis", 
    "Seattle", "Denver", "Washington", "Boston", "El Paso", "Detroit", 
    "Nashville", "Oklahoma City", "Portland", "Las Vegas", "Louisville", 
    "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", 
    "Long Beach", "Kansas City", "Mesa", "Virginia Beach", "Atlanta", 
    "Colorado Springs", "Omaha", "Raleigh", "Miami", "Cleveland", 
    "Tulsa", "Oakland", "Minneapolis", "Wichita", "New Orleans", 
    "Arlington", "Bakersfield", "Tampa", "Honolulu", "Anaheim", 
    "Aurora", "Santa Ana", "St. Louis", "Pittsburgh", "Corpus Christi",
    "Riverside", "Cincinnati", "Lexington", "Anchorage", "Stockton"
  ];

  return (
    <Box>
      {/* Filters */}
      {toAllProperties && (
        <div>
          <Box sx={{ padding: '20px', borderBottom: '1px solid #e5c1f5' }}>
            <Typography variant="h5" sx={{ color: '#ad0bde' }}>Filters</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, alignItems: 'flex-end' }}>
              {/* Price Range Filter */}
              <Box sx={{ flexGrow: 1, maxWidth: '300px' }}>
                <Typography>Price Range:</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  sx={{ color: '#ad0bde' }}
                />
                <Typography>${priceRange[0]} - ${priceRange[1]}</Typography>
              </Box>

              {/* Property Type Filter */}
              <FormControl sx={{ minWidth: 120, marginTop: '8px' }}>
                <InputLabel shrink={true} sx={{ backgroundColor: 'rgb(253, 244, 255)', padding: '0 4px' }}>
                  Property Type
                </InputLabel>
                <Select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  sx={{ borderColor: '#ad0bde' }}
                >
                  <MenuItem value="Any">Any</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="Cabin">Cabin</MenuItem>
                </Select>
              </FormControl>

              {/* Bedrooms Filter */}
              <FormControl sx={{ minWidth: 120, marginTop: '8px' }}>
                <InputLabel shrink={true} sx={{ backgroundColor: 'rgb(253, 244, 255)', padding: '0 4px' }}>
                  Bedrooms
                </InputLabel>
                <Select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  sx={{ borderColor: '#ad0bde' }}
                >
                  <MenuItem value="Any">Any</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4+</MenuItem>
                </Select>
              </FormControl>

              {/* City Filter */}
              <FormControl sx={{ minWidth: 120, marginTop: '8px' }}>
                <InputLabel shrink={true} sx={{ backgroundColor: 'rgb(253, 244, 255)', padding: '0 4px' }}>
                  City
                </InputLabel>
                <Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ borderColor: '#ad0bde' }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200, // Set maximum height
                        overflowY: 'auto', // Enable vertical scrolling
                      },
                    },
                  }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* Alert Button */}
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" sx={{ backgroundColor: '#ad0bde' }} onClick={handleFilters}>
                Apply
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ padding: '20px' }}>
            {filteredProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card
                  sx={{
                    border: '1px solid #e5c1f5',
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 20px rgba(173, 11, 222, 0.2)',
                    },
                  }}
                  onClick={() => handleCardClick(property)} // Add onClick event
                >
                  <CardMedia
                    component="img"
                    image={property.images[0]}
                    alt={property.property_name}
                    sx={{
                      height: 200,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#ad0bde' }}>
                      {property.property_name}
                    </Typography>
                    <Typography sx={{ color: '#666' }}>{property.about}</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#ad0bde' }}>
                      ${property.price_per_night} / night
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#ad0bde' }}>
                      ${property.city}, ${property.state} 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      {toSelectedProperty && <SiteDetails property={selectedProperty} onBack={() => {
        setToAllProperties(true);
        setToSelectedProperty(false);
      }}></SiteDetails>}
      {/* Additional Components */}
    </Box>
  );
}
