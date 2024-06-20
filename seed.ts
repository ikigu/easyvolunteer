import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { EventAttendee, EventAttendeeRole } from '@prisma/client';

export const prisma = new PrismaClient();

/**------ Users --------
 *
 */

const user1 = {
    firstName: 'Alfrida',
    lastName: 'Aluoch',
    password: bcrypt.hashSync('%883/?  _YuiNk', 10),
    email: 'alfie_aluoch@gmail.com',
    id: '3259287c-cafb-4efa-9acd-2b4005fc066b'
};

const user2 = {
    firstName: 'Susan',
    lastName: 'Otieno',
    password: bcrypt.hashSync('%84zzDFA53/?  _YuiNk', 10),
    email: 'susan@actionaid-kenya.org.com',
    id: '4b679c56-207c-49fd-a246-617cf3c7740e'
};

const user3 = {
    firstName: 'Nicholas',
    lastName: 'Kimincha',
    password: bcrypt.hashSync('BrYiin783n!>>', 10),
    email: 'nick_kimincha@gmail.com',
    id: '035571b2-1d1d-433f-9ee5-09977cd4111a'
};

const user4 = {
    firstName: 'Angela',
    lastName: 'Sheldrick',
    password: bcrypt.hashSync('%8445re]])3/?  _YuiNk', 10),
    email: 'angela@sheldrickwildlifetrust.org',
    id: '699e9241-1264-41a5-a297-e70c1c0711da'
};

const user5 = {
    firstName: 'Robert',
    lastName: 'Walker',
    password: bcrypt.hashSync('%84423$43/?fas _YuiNk', 10),
    email: 'r_wanki@gmail.com',
    id: '2bb929c2-6beb-4659-9977-14e706c41afb'
};

const user6 = {
    firstName: 'Njoki',
    lastName: 'Mbugua',
    password: bcrypt.hashSync('%8&&  _Y=Nk', 10),
    email: 'j_mbugua@gmail.com',
    id: 'a990b081-76ec-4b7f-9e7f-09ef3947acc8'
};

/** ----------- Organizations --------------------- */

const organization1 = {
    id: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    name: 'Nairobi Chapel Ngong Road',
    userId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    town: 'Jamhuri',
    industry: 'Religious'
};

const organization2 = {
    id: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    name: 'Sheldrick Wildlife Trust',
    userId: '699e9241-1264-41a5-a297-e70c1c0711da',
    town: 'Nairobi',
    industry: 'Conservation'
};

const organization3 = {
    id: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    name: 'ActionAid International Kenya',
    userId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    town: 'Nairobi',
    industry: 'Gender Equality'
};

/**-------------- Events ------------------- */

const event1 = {
    id: 'c17b9723-4acd-471d-a806-ab1830681cad',
    creatorId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    organizationId: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    title: 'Membership Class',
    cost: 0,
    startTime: new Date(2024, 4, 12),
    endTime: new Date(2021, 9, 19)
};

const event2 = {
    id: 'ee3cecd4-b812-42d2-9c00-f31db8122284',
    creatorId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    organizationId: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    title: 'New Believer Class',
    cost: 555,
    startTime: new Date(),
    endTime: new Date()
};

const event3 = {
    id: '9735c5ed-2af6-42c4-9d05-76b6c013efad',
    creatorId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    organizationId: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    title: 'Divorce Care Season 3',
    cost: 4455,
    startTime: new Date(2024, 7, 8),
    endTime: new Date(2024, 9, 29)
};

const event4 = {
    id: '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c',
    creatorId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    organizationId: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    title: 'Man Enough Camp',
    cost: 12000,
    startTime: new Date(),
    endTime: new Date()
};

const event5 = {
    id: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    creatorId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    organizationId: 'e98a5900-a675-4f6d-b992-b279a7dab938',
    title: 'Quest Adventure Camp',
    cost: 5000,
    startTime: new Date(),
    endTime: new Date()
};

const event6 = {
    id: '2c2f462b-81ab-498b-91c2-22132aeb4a14',
    creatorId: '699e9241-1264-41a5-a297-e70c1c0711da',
    organizationId: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    title: 'Tree Planting',
    cost: 9494,
    startTime: new Date(),
    endTime: new Date()
};

const event7 = {
    id: 'e263e08b-3734-4b90-815b-74b4d8477081',
    creatorId: '699e9241-1264-41a5-a297-e70c1c0711da',
    organizationId: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    title: 'Building Bowsers',
    cost: 94944,
    startTime: new Date(),
    endTime: new Date()
};

const event8 = {
    id: '51820a22-f016-467d-9ba4-babf37125e85',
    creatorId: '699e9241-1264-41a5-a297-e70c1c0711da',
    organizationId: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    title: 'Conservation Talk',
    cost: 48488,
    startTime: new Date(),
    endTime: new Date()
};

const event9 = {
    id: '82fa2f19-bdc6-44a3-8941-69f1c167ea41',
    creatorId: '699e9241-1264-41a5-a297-e70c1c0711da',
    organizationId: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    title: 'Remembering Daphne',
    cost: 4455,
    startTime: new Date(),
    endTime: new Date()
};

const event10 = {
    id: '01af7706-c554-428f-9db3-e11708df7438',
    creatorId: '699e9241-1264-41a5-a297-e70c1c0711da',
    organizationId: 'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    title: 'Orphans Showcase',
    cost: 7890,
    startTime: new Date(),
    endTime: new Date()
};

const event11 = {
    id: 'abd40c58-fbda-4c3a-b1d5-ae8ed55a55f4',
    creatorId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    organizationId: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    title: 'Soup Kitchen',
    cost: 859430,
    startTime: new Date(),
    endTime: new Date()
};

const event12 = {
    id: '837139f1-4a86-4281-8426-a013564fd7f6',
    creatorId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    organizationId: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    title: 'Soup Kitchen',
    cost: 333,
    startTime: new Date(),
    endTime: new Date()
};

const event13 = {
    id: '',
    creatorId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    organizationId: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    title: 'Tree Planting',
    cost: 8493,
    startTime: new Date(),
    endTime: new Date()
};

const event14 = {
    id: '669fe24d-dd21-4b58-bd4e-02e92d972fe7',
    creatorId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    organizationId: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    title: 'Feed the Children',
    cost: 74982,
    startTime: new Date(),
    endTime: new Date()
};

const event15 = {
    id: 'bd18577c-158d-41f3-99de-34b76d8e108e',
    creatorId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    organizationId: '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    title: 'Pad Drive',
    cost: 3330,
    startTime: new Date(2024, 6, 28),
    endTime: new Date(2024, 6, 29)
};

/*----------- ParticipantRoles ------------------------------**/

const participantRole1 = {
    title: 'Collector',
    eventId: 'bd18577c-158d-41f3-99de-34b76d8e108e',
    id: '6059a8b6-cf63-482b-b68e-50586f8d361e'
};

const participantRole2 = {
    title: 'Donor',
    eventId: '01af7706-c554-428f-9db3-e11708df7438',
    id: 'cc6e0d69-3a5c-4746-a133-b412f5c99f98'
};

const participantRole3 = {
    title: 'Security',
    eventId: '82fa2f19-bdc6-44a3-8941-69f1c167ea41',
    id: '1be76250-3bba-4332-9097-e694a61bf55c'
};

/**------------ VolunteerRoles ------------------------------ */

const volunteerRole1 = {
    title: 'Facilitator',
    eventId: '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c', // Man Enough Camp
    id: '59c8e005-14dd-4d87-8b3d-91e2317413c4'
};

const volunteerRole2 = {
    title: 'Teacher',
    eventId: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    id: '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c'
};

/**------------ EventAttendees ------------------------------ */

type eventAttendee = {
    id: string;
    eventId: string;
    userId: string;
    participantRoleId: string | null;
    volunteerRoleId: string | null;
    role: EventAttendeeRole;
};

const eventAttendee1: eventAttendee = {
    id: '6ae9de01-8ce6-46b4-b95f-505d63ba2401',
    eventId: 'bd18577c-158d-41f3-99de-34b76d8e108e',
    userId: '3259287c-cafb-4efa-9acd-2b4005fc066b',
    participantRoleId: '6059a8b6-cf63-482b-b68e-50586f8d361e',
    volunteerRoleId: null,
    role: 'Participant'
};

const eventAttendee2: eventAttendee = {
    id: '3aae08af-05f6-41b7-a3bc-0d46a454f99d',
    eventId: '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c',
    volunteerRoleId: '59c8e005-14dd-4d87-8b3d-91e2317413c4',
    userId: '2bb929c2-6beb-4659-9977-14e706c41afb',
    role: 'Volunteer',
    participantRoleId: null
};

const eventAttendee3: eventAttendee = {
    id: '1446be17-effb-4a86-b875-e556c7b8f21b',
    eventId: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    volunteerRoleId: '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c',
    userId: '3259287c-cafb-4efa-9acd-2b4005fc066b',
    role: 'Volunteer',
    participantRoleId: null
};

const eventAttendee4: eventAttendee = {
    id: 'a37e2586-dc7a-4d3b-9588-c204efc01718',
    eventId: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    volunteerRoleId: '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c',
    userId: '035571b2-1d1d-433f-9ee5-09977cd4111a',
    role: 'Volunteer',
    participantRoleId: null
};

const eventAttendee5: eventAttendee = {
    id: 'af2f1754-3bdb-47dd-8def-d7a2c7026b23',
    eventId: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    volunteerRoleId: '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c',
    userId: '4b679c56-207c-49fd-a246-617cf3c7740e',
    role: 'Volunteer',
    participantRoleId: null
};

const eventAttendee6: eventAttendee = {
    id: '0910d6aa-19d7-4775-ad39-99dbe44666c4',
    eventId: 'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    volunteerRoleId: '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c',
    userId: 'a990b081-76ec-4b7f-9e7f-09ef3947acc8',
    role: 'Volunteer',
    participantRoleId: null
};

async function main() {
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [user1, user2, user3, user4, user5, user6]
    });

    await prisma.organization.createMany({
        data: [organization1, organization2, organization3]
    });

    await prisma.event.createMany({
        data: [
            event1,
            event10,
            event11,
            event12,
            event13,
            event14,
            event15,
            event2,
            event3,
            event4,
            event5,
            event6,
            event7,
            event8,
            event9
        ]
    });

    await prisma.participantRole.createMany({
        data: [participantRole1, participantRole2, participantRole3]
    });

    await prisma.volunteerRole.createMany({
        data: [volunteerRole1, volunteerRole2]
    });

    await prisma.eventAttendee.createMany({
        data: [
            eventAttendee1,
            eventAttendee2,
            eventAttendee3,
            eventAttendee4,
            eventAttendee5,
            eventAttendee6
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
