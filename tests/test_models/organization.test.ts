import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function clearOrganizationDatabase() {
	const users = await prisma.user.findMany();
	await prisma.user.deleteMany()
	await prisma.organization.deleteMany()
}

async function createOrganization() {
	const user = await prisma.user.create({
		data: {
			firstName: 'BullDog',
			lastName: 'Kubwa',
			password: 'Leonardo da Vinci',
			email: 'bulldog2@gmail.com'
		}
	})

	const organization = await prisma.organization.create({
		data: {
			name: 'Coolest Org',
			town: 'Coolest Town',
			userId: user.id
		}
	})

	return organization;
}

beforeEach(() => {
	return clearOrganizationDatabase()
})

test('Organization created successfully, when all required data is given', async () => {
	const organization = await createOrganization();
	expect(organization.name).toBe('Coolest Org')
})

test('Organization is tied to correct user', async () => {
	await createOrganization();
	
	const orgWithUserDetails = await prisma.organization.findFirst({
		include: {
			Owner: true
		}
	});

	expect(orgWithUserDetails?.Owner.firstName).toBe('BullDog')
})

test('Organization has attribute id', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('id')
})

test('Organization has attribute createdAt', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('createdAt')
})

test('Organization has attribute updatedAt', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('updatedAt')
})

test('Organization has attribute name', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('name')
})

test('Organization has attribute town', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('town')
})

test('Organization has attribute industry', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('industry')
})

test('Organization has attribute userId', async () => {
	const organization = await createOrganization();
	expect(organization).toHaveProperty('userId')
})