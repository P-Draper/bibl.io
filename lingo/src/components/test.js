
const axios = require('axios');

const apiKey = 'AIzaSyDoufgxgfWbxd5YywuHm5WBYGxNP9r1oIU'
const videoUrl = 'https://www.youtube.com/watch?v=uyBvPcPFXyc&t=18s';
const videoId = videoUrl.split('=')[1];
const apiEndpoint = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
axios.get(apiEndpoint)
  .then((response) => {
    if (response.status === 200) {
      const videoTitle = response.data.items[0].snippet.title;
      console.log(`${videoTitle}`);
    } else {
      console.log('Failed to retrieve video title.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });