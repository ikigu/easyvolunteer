import bodyParser from 'body-parser';
import express from 'express';
import organizationApis from './organization_apis/organization';
import userApis from './user_apis/user';

const app = express();

const port = process.env.API_PORT || 5001;

app.use(bodyParser.json());
app.use(userApis);
app.use(organizationApis);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
