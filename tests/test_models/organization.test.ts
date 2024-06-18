import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearOrganizationDatabase() {
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.event.deleteMany();
    await prisma.event.deleteMany();
    await prisma.$disconnect();
}

async function initializeOrganizationDatabase() {
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            firstName: 'Kelvin',
            lastName: 'Rapando',
            password: 'Leonardo da Vinci',
            email: 'Kelvin2@gmail.com'
        }
    });

    await prisma.organization.create({
        data: {
            name: 'Quest NC',
            town: 'Jamhuri Town',
            userId: user.id
        }
    });
}

beforeEach(() => {
    return initializeOrganizationDatabase();
});
afterEach(() => {
    return clearOrganizationDatabase();
});

test('Organization created successfully, when all required data is given', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization?.name).toBe('Quest NC');
});

test('Organization is tied to correct user', async () => {
    const orgWithUserDetails = await prisma.organization.findFirst({
        include: {
            owner: true
        }
    });

    expect(orgWithUserDetails?.owner.firstName).toBe('Kelvin');
});

test('Organization has attribute id', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('id');
});

test('Organization has attribute createdAt', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('createdAt');
});

test('Organization has attribute updatedAt', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('updatedAt');
});

test('Organization has attribute name', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('name');
});

test('Organization has attribute town', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('town');
});

test('Organization has attribute industry', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('industry');
});

test('Organization has attribute userId', async () => {
    const organization = await prisma.organization.findFirst();
    expect(organization).toHaveProperty('userId');
});
