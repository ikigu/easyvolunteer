import bodyParser from 'body-parser';
import express from 'express';
import eventApis from './event_apis/event';
import organizationApis from './organization_apis/organization';
import sharedEventAttendeeRolesApis from './shared_event_roles_apis/shared_event_roles_routes';
import userApis from './user_apis/user';

const app = express();

const port = process.env.API_PORT || 5001;

app.use((req, res, next) => {
    console.log(`HTTP ${req.httpVersion} ${req.method} ${req.path}`);
    next();
});
app.use(bodyParser.json());
app.use(eventApis);
app.use(organizationApis);
app.use(sharedEventAttendeeRolesApis); // volunteerRoles and participantRoles
app.use(userApis);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
