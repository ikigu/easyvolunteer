import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.event.deleteMany();
    await prisma.eventAttendee.deleteMany();
}

async function closeDatabase() {
    await clearDatabase();
    await prisma.$disconnect();
}

async function createEventAttendee(role: 'participant' | 'volunteer') {
    const user = await prisma.user.create({
        data: {
            firstName: 'Alicia',
            lastName: 'Kamencu',
            password: '#@!$#1dk __a&!',
            email: 'alicia.@gmail.com'
        }
    });

    const organization = await prisma.organization.create({
        data: {
            name: 'Health4All',
            town: 'Kisumu',
            userId: user.id
        }
    });

    const event = await prisma.event.create({
        data: {
            organizationId: organization.id,
            title: 'Health4All Awareness Drive',
            startTime: new Date(),
            endTime: new Date(),
            cost: 559,
            creatorId: user.id,
            description:
                'On the 3rd of August, 2024 we march to create awareness on Health4All!',
            volunteerRoles: {
                create: {
                    title: 'Route Marshall'
                }
            },
            participantRoles: {
                create: {
                    title: '10k race'
                }
            }
        }
    });

    const eventWithVolunteerDetails = await prisma.event.findFirst({
        include: {
            volunteerRoles: true,
            participantRoles: true
        }
    });

    let volunteer: any;
    let participant: any;

    if (role === 'volunteer') {
        volunteer = await prisma.user.create({
            data: {
                firstName: 'Volunteer',
                lastName: 'Bureti',
                password: '12445,,89df',
                email: 'edgarb@gmail.com'
            }
        });

        await prisma.eventAttendee.create({
            data: {
                userId: volunteer.id,
                eventId: event.id,
                volunteerRoleId: eventWithVolunteerDetails?.volunteerRoles[0].id
            }
        });
    }

    if (role === 'participant') {
        participant = await prisma.user.create({
            data: {
                firstName: 'Participant',
                lastName: 'Delta',
                password: 'Fort Kn0x',
                email: 'v_helpful@gmail.com'
            }
        });

        await prisma.eventAttendee.create({
            data: {
                userId: participant.id,
                eventId: event.id,
                participantRoleId:
                    eventWithVolunteerDetails?.participantRoles[0].id
            }
        });
    }
}

beforeEach(async () => {
    return clearDatabase();
});
afterAll(async () => {
    return closeDatabase();
});

test('Volunteer EventAttendee is created, given all required details', async () => {
    await createEventAttendee('volunteer');

    const eventAttendee = await prisma.eventAttendee.findFirst({
        include: {
            user: true
        }
    });

    expect(eventAttendee?.user.firstName).toBe('Volunteer');
});

test('Participant EventAttendee is created, given all required details', async () => {
    await createEventAttendee('participant');

    const volunteerAttendee = await prisma.eventAttendee.findFirst({
        include: {
            user: true,
            participantRole: true
        },
        where: {
            participantRole: {
                title: '10k race'
            }
        }
    });

    expect(volunteerAttendee?.user.firstName).toBe('Participant');
});
