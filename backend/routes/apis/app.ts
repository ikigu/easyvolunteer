import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import eventApis from './event';
import eventAttendeeApis from './event_attendee';
import eventAttendeeRolesApis from './event_attendee_roles';
import organizationApis from './organization';
import userApis from './user';

const app = express();

const port = process.env.API_PORT || 5001;

app.set('json spaces', 2);
app.use(cors());

app.use((req, res, next) => {
    console.log(`HTTP ${req.httpVersion} ${req.method} ${req.path}`);
    next();
});
app.use(bodyParser.json());
app.use(eventAttendeeApis);
app.use(eventApis);
app.use(organizationApis);
app.use(eventAttendeeRolesApis); // volunteerRoles and participantRoles
app.use(userApis);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
