import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function clearOrganizationDatabase() {
	await prisma.organization.deleteMany()
	await prisma.user.deleteMany()
}

async function createOrganization() {
	const user = await prisma.user.create({
		data: {
			firstName: 'BullDog',
			lastName: 'Kubwa',
			password: 'Leonardo da Vinci',
			email: 'bulldog@gmail.com'
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