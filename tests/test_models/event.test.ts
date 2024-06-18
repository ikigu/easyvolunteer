import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearEventDatabase() {
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.event.deleteMany();
    await prisma.event.deleteMany();
    await prisma.$disconnect();
}

async function initializeEventDatabase() {
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            firstName: 'Javellin',
            lastName: 'Kiende',
            password: 'Leonardo da Vinci',
            email: 'Javellin3@gmail.com'
        }
    });

    const organization = await prisma.organization.create({
        data: {
            name: 'Quest NC',
            town: 'Jamhuri Town',
            userId: user.id
        }
    });

    await prisma.event.create({
        data: {
            organizationId: organization.id,
            title: 'Quest Adventure Camp',
            startTime: new Date(),
            endTime: new Date(),
            cost: 559,
            creatorId: user.id
        }
    });
}

beforeEach(() => {
    return initializeEventDatabase();
});
afterEach(() => {
    return clearEventDatabase();
});

test('Event created successfully given all required data', async () => {
    const event = await prisma.event.findFirst();

    expect(event?.title).toBe('Quest Adventure Camp');
});

test('Event is tied to correct org', async () => {
    const event = await prisma.event.findFirst({
        include: {
            organization: true
        }
    });

    expect(event?.organization.name).toBe('Quest NC');
});

test('Event has attribute id', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('id');
});

test('Event has attribute createdAt', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('createdAt');
});

test('Event has attribute updatedAt', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('updatedAt');
});

test('Event has attribute id', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('id');
});

test('Event has attribute organizationId', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('organizationId');
});

test('Event has attribute title', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('title');
});

test('Event has attribute startTime', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('startTime');
});

test('Event has attribute endTime', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('endTime');
});

test('Event has attribute cost', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('cost');
});

test('Event has attribute description', async () => {
    const event = await prisma.event.findFirst();

    expect(event).toHaveProperty('description');
});
