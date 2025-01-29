import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Search, Send } from 'lucide-react';

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Did you finish the project?', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Bob Johnson', lastMessage: 'Let\'s meet tomorrow', avatar: '/placeholder.svg?height=40&width=40' },
  ];

  const messages = [
    { id: 1, sender: 'John Doe', text: 'Hey, how are you?', time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'I\'m good, thanks! How about you?', time: '10:05 AM' },
    { id: 3, sender: 'John Doe', text: 'Doing great! Any plans for the weekend?', time: '10:10 AM' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Box display="flex" height="100vh" fontFamily="'Circular', -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif" color="#484848">
      <Box width="350px" borderRight="1px solid #EBEBEB" display="flex" flexDirection="column">
        <Box padding="16px" position="relative">
          <Search size={20} color="#484848" style={{ position: 'absolute', top: '26px', left: '26px' }} />
          <TextField
            variant="outlined"
            placeholder="Search conversations"
            fullWidth
            InputProps={{
              startAdornment: <Search />,
              style: { paddingLeft: '40px' },
            }}
          />
        </Box>
        <List style={{ overflowY: 'auto', flexGrow: 1 }}>
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              button
              selected={selectedChat && selectedChat.id === chat.id}
              onClick={() => setSelectedChat(chat)}
              style={{
                backgroundColor: selectedChat && selectedChat.id === chat.id ? '#f9e6ff' : 'transparent',
              }}
            >
              <ListItemAvatar>
                <Avatar src={chat.avatar} alt={chat.name} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6">{chat.name}</Typography>}
                secondary={<Typography variant="body2" color="textSecondary">{chat.lastMessage}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
        {selectedChat ? (
          <>
            <AppBar position="static" style={{ backgroundColor: '#ad0bde' }}>
              <Toolbar>
                <Avatar src={selectedChat.avatar} alt={selectedChat.name} style={{ marginRight: '12px' }} />
                <Typography variant="h6" style={{ color: '#ffffff' }}>{selectedChat.name}</Typography>
              </Toolbar>
            </AppBar>
            <Box style={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  display="flex"
                  justifyContent={msg.sender === 'You' ? 'flex-end' : 'flex-start'}
                  mb={2}
                >
                  <Box
                    bgcolor="#F7F7F7"
                    borderRadius="18px"
                    p={2}
                    maxWidth="70%"
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box component="form" display="flex" padding="16px" borderTop="1px solid #EBEBEB" onSubmit={handleSendMessage}>
              <TextField
                variant="outlined"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                style={{ borderRadius: '24px' }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '12px' }}>
                <Send size={20} color="#ffffff" />
              </Button>
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h5" color="textSecondary">Select a conversation to start messaging</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatsPage;
