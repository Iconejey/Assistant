const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(8014, () => console.log('Server running on port 8014'));
