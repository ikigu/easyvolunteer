import express from 'express';
import userApis from './user_apis/user';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.API_PORT || 5001;

app.use(bodyParser.json());
app.use(userApis);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
