import express from 'express';
import userApis from './user_apis/user';

const app = express();

const port = process.env.API_PORT || 5001;

app.use(userApis);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
