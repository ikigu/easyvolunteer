import { PrismaClient, EventAttendeeRoleType } from '@prisma/client';

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
            eventAttendeeRoles: {
                createMany: {
                    data: [
                        {
                            title: 'Route Marshall',
                            type: 'Volunteer'
                        },
                        {
                            title: '10k race',
                            type: 'Participant'
                        }
                    ]
                }
            }
        }
    });

    let roleType: EventAttendeeRoleType = 'Volunteer';

    const eventWithVolunteerDetails = await prisma.event.findUniqueOrThrow({
        where: {
            id: event.id
        },
        include: {
            eventAttendeeRoles: {
                where: {
                    type: roleType
                }
            }
        }
    });

    roleType = 'Participant';

    const eventWithParticipantDetails = await prisma.event.findUniqueOrThrow({
        where: {
            id: event.id
        },
        include: {
            eventAttendeeRoles: {
                where: {
                    type: roleType
                }
            }
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
                roleId: eventWithVolunteerDetails.eventAttendeeRoles[0].id,
                roleType: 'Volunteer'
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
                roleId: eventWithParticipantDetails?.eventAttendeeRoles[0].id,
                roleType: 'Participant'
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
            role: true
        },
        where: {
            role: {
                title: '10k race'
            }
        }
    });

    expect(volunteerAttendee?.user.firstName).toBe('Participant');
});
