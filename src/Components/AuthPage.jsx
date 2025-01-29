import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: '#ad0bde',
    },
    secondary: {
      main: purple[500], // Corrected usage of purple
    },
  },
});

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // Removed type annotation for JavaScript
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview);
      }
    };
  }, [profilePicturePreview]);
  

  const handleSubmit = async (event) => {
    console.log(apiBaseUrl)
    event.preventDefault();
    setError(null); // Clear any previous errors
    
    // Basic validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
  
    // Additional validation for sign-up
    if (!isLogin && (!username || !dateOfBirth || !city || !state)) {
      setError('Please fill in all profile details.');
      return;
    }
  
    try {
      // Prepare the URL
      const url = `${apiBaseUrl}/api/auth/${isLogin ? 'login' : 'register'}`;
  
      // Create payload
      let payload;
      if (isLogin) {
        payload = { email, password };
      } else {
        // Use FormData to include the profile picture
        payload = new FormData();
        payload.append('email', email);
        payload.append('password', password);
        payload.append('username', username);
        payload.append('date_of_birth', dateOfBirth);
        payload.append('city', city);
        payload.append('state', state);
  
        if (profilePicture) {
          payload.append('profile_picture', profilePicture);
        }
        
      }

      console.log(dateOfBirth)
  
      // Make the Axios request
      const response = await axios.post(url, payload, {
        headers: isLogin
          ? { 'Content-Type': 'application/json' }
          : { 'Content-Type': 'multipart/form-data' },withCredentials: true
      });
  
      console.log(response.data.message); // Display success message
      onLoginSuccess(email);
    } catch (error) {
      // Handle error responses from the server
      if (error.response) {
        setError(error.response.data.message); // Set error message from server response
      } else {
        setError('An error occurred. Please try again.'); // Fallback error message
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            mt: 8,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Typography component="h1" variant="h5" color="primary">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Typography>
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 2, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
                margin="normal"
                required
                fullWidth
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                id="date_of_birth"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
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
          </>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => setIsLogin(!isLogin)}
            sx={{ cursor: 'pointer', textTransform: 'none' }}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </Box>
      </Box>
    
      </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AuthPage;