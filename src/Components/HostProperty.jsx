import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SvgIcon
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const HostPropertyForm = ({email}) => {
  const [formData, setFormData] = useState({
    email: email,
    property_name: '',
    no_of_guests: '',
    no_of_bedrooms: '',
    no_of_bed: '',
    no_of_bath: '',
    about: '',
    amenities: [],
    price_per_night: '',
    type: '',
    images: [],
    city: '',
    state: ''
  });

  const[imagesPreview, setImagesPreview] = useState([]);
  const[imageArray, setImageArray] = useState([]);
  const [error, setError] = useState(null); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a preview URL for the image
    }));
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files]
     })) // Add new images to the existing ones
    setImagesPreview((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    // Remove the image at the given index
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove the image
    }));

    setImagesPreview((prevPreview) => prevPreview.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      amenities: checked
        ? [...prevState.amenities, value]
        : prevState.amenities.filter(amenity => amenity !== value),
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PrabhavKarve"); // Replace with your Cloudinary upload preset

    try {
      console.log('Uploading image to Cloudinary...');
      const response = await axios.post("https://api.cloudinary.com/v1_1/dwfp6erra/image/upload", formData, {withCredentials: true});
      console.log('Image uploaded:', response.data.secure_url);
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Check if at least three images are uploaded
    if (formData.images.length < 3) {
        setError('Please upload at least three images');
        return;
    }

    try {
        // Upload images to Cloudinary and collect their URLs
        const imageUrls = await Promise.all(
            formData.images.map((image) => uploadToCloudinary(image))
        );
        console.log(imageUrls);

        // Prepare the data to send
        const dataToSend = {
            email: formData.email,
            property_name: formData.property_name,
            no_of_guests: formData.no_of_guests,
            no_of_bedrooms: formData.no_of_bedrooms,
            no_of_bed: formData.no_of_bed,
            no_of_bath: formData.no_of_bath,
            about: formData.about,
            price_per_night: formData.price_per_night,
            type: formData.type,
            amenities: formData.amenities, // This should be an array
            images: imageUrls, // This should be an array of image URLs
            city: formData.city,
            state: formData.state
        };

        // Send the data to the backend
        const response = await axios.post('http://localhost:5000/api/auth/hostProperty', dataToSend, {
            headers: {
                'Content-Type': 'application/json', // Ensure the correct content type
            },
            withCredentials: true
        });
        if (response.status === 201) {
            alert('Property listed successfully');
        }
        console.log('Form submitted successfully:', response.data);
    } catch (error) {
        console.error('Error uploading images or submitting the form:', error);
        setError('Failed to submit the form. Please try again.');
    }
};

  return (
    <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh', padding: '2rem' }}>
                {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 2, textAlign: 'center' }}
            >
              {error}
            </Typography>
          )}
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#ad0bde', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Host Your Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Property Name"
                name="property_name"
                value={formData.property_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Number of Guests"
                name="no_of_guests"
                type="number"
                value={formData.no_of_guests}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Number of Bedrooms"
                name="no_of_bedrooms"
                type="number"
                value={formData.no_of_bedrooms}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Number of Beds"
                name="no_of_bed"
                type="number"
                value={formData.no_of_bed}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Number of Bathrooms"
                name="no_of_bath"
                type="number"
                value={formData.no_of_bath}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="About"
                name="about"
                value={formData.about}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#484848', marginTop: '1rem' }}>
                Amenities
              </Typography>
              <Grid container>
                {['WiFi', 'Stove', 'Oven', 'Microwave', 'Refrigeration' , 'Parking', 'TV', 'Air Conditioning', 'Heating', 'Washing'].map((amenity) => (
                  <Grid item xs={6} sm={4} key={amenity}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.amenities.includes(amenity)}
                          onChange={handleAmenityChange}
                          value={amenity}
                          sx={{ color: '#ad0bde', '&.Mui-checked': { color: '#ad0bde' } }}
                        />
                      }
                      label={<span style={{ color: '#484848' }}>{amenity}</span>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Price per Night"
                name="price_per_night"
                type="number"
                value={formData.price_per_night}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="property-type-label">Property Type</InputLabel>
                <Select
                  labelId="property-type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Property Type"
                >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                  <MenuItem value="Cabin">Cabin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#484848', marginTop: '1rem' }}>
                Upload Property Images
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: '#ad0bde',
                  color: 'white',
                  marginTop: '1rem',
                  '&:hover': {
                    backgroundColor: '#8a0ab2',
                  },
                }}
              >
                Select Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            {/* Scrollable Image Preview Container */}
      <Grid item xs={12}>
         {imagesPreview.length > 0 && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
            {imagesPreview.map((image, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  width: "150px",
                  height: "150px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  "&:hover .remove-btn": {
                    display: "block", // Show the remove button on hover
                  },
                }}
              >
                <img
                  src={image.preview}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                 {/* Close Button */}
                 <SvgIcon
                  onClick={() => handleRemoveImage(index)}
                  className="remove-btn"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    // backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    display: "none", // Initially hidden
                    "&:hover": {
                      backgroundColor: "rgba(238, 10, 230, 0.8)",
                    },
                  }}
                >
                  <CloseIcon />
                </SvgIcon>
              </Box>
            ))}
        </Box>
      )}
      </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#ad0bde',
                  color: 'white',
                  marginTop: '1rem',
                  '&:hover': {
                    backgroundColor: '#8a0ab2',
                  },
                }}
              >
                Relet Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default HostPropertyForm;
