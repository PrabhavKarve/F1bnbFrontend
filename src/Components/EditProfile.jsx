import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid, Paper, Box } from "@mui/material";
import axios from 'axios';
const primaryColor = "#ad0bde";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function EditProfile({profile}) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [error, setError] = useState(null); // Removed type annotation for JavaScript
    const [newprofile, setProfile] = useState({
        oldemail: profile.email,
        email: "",
        username: "",
        date_of_birth: "",
        city: "",
        state: "",
        about: "",
    });

    useEffect(() => {
        return () => {
          if (profilePicturePreview) {
            URL.revokeObjectURL(profilePicturePreview);
          }
        };
      }, [profilePicturePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Create a FormData object
        const payload = new FormData();

        // Append only non-empty attributes to the payload
        Object.entries(newprofile).forEach(([key, value]) => {
            if (value !== "" && value !== null) {
                payload.append(key, value);
            }
        });

        if (profilePicture) {
            payload.append("profile_picture", profilePicture);
        }

        // Log the payload contents for debugging
        for (let pair of payload.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        const url = `${apiBaseUrl}/api/auth/editProfile`;
        const response = await axios.post(url, payload, {
            headers: { "Content-Type": "multipart/form-data" }, withCredentials: true
        });

        console.log(response.data.message); // Display success message
    } catch (error) {
        // Handle error responses from the server
        if (error.response) {
            setError(error.response.data.message); // Set error message from server response
        } else {
            setError("An error occurred. Please try again."); // Fallback error message
        }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 5, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: primaryColor }}>
          Edit Your Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label= "email"
                placeholder= {profile.email}
                name="email"
                value={newprofile.email}
                onChange={handleChange}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label= "username"
                placeholder= {profile.username}
                name="username"
                value={newprofile.username}
                onChange={handleChange}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label= "Date of Birth"
                name="date_of_birth"
                type="date"
                value={newprofile.date_of_birth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label= "city"
                placeholder= {profile.city}
                name="city"
                value={newprofile.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label= "state"
                placeholder={profile.state}
                name="state"
                value={newprofile.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label= "about"
                placeholder= {profile.about}
                name="about"
                value={newprofile.about}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfilePicture(file);
            
                  // Create a preview URL for the selected image
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setProfilePicturePreview(previewUrl);
                  }
                }}
              />
            </Button>
            {profilePicture && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mb: 2 }}
                >
                  Selected file: {profilePicture.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <img
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '2px solid #ad0bde',
                    }}
                  />
                </Box>
              </>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: primaryColor,
                    "&:hover": {
                      backgroundColor: "#8a09b3",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
            
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
