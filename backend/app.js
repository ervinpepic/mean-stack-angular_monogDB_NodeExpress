const express = require('express');
const app = express();


app.use('/api/posts', (requ, resp, next) => {
  const posts = [
    {
      id: '1',
      title: 'Ervin',
      content: 'Pepic'
    },
    {
      id: '2',
      title: 'Emel',
      content: 'Pepic'
    },
    {
      id: '3',
      title: 'Erna',
      content: 'Pepic'
    }
  ];
  resp.status(200).json({
    message: 'Posts fetched done!',
    posts: posts
  });
});

module.exports = app;
