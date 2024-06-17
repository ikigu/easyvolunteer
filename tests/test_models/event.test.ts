import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function clearDatabase() {
	await prisma.user.deleteMany()
	await prisma.organization.deleteMany()
	await prisma.event.deleteMany()
}

async function closeDatabase() {
	await prisma.$disconnect()
}

async function createEvent() {
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

	const event = await prisma.event.create({
		data: {
			organizationId: organization.id,
			title: 'Coolest Event',
			startTime: new Date(),
			endTime: new Date(),
			cost: 559,
		}

	})

	return event;
}

beforeEach(() => {
	return clearDatabase()
})
afterAll(() => {
	return closeDatabase()
})

test('Event created successfully given all required data', async () => {
	const event = await createEvent()

	expect(event.title).toBe('Coolest Event')
})

test('Event has attribute id', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('id');
})

test('Event has attribute createdAt', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('createdAt');
})

test('Event has attribute updatedAt', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('updatedAt');
})

test('Event has attribute id', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('id');
})

test('Event has attribute organizationId', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('organizationId');
})

test('Event has attribute title', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('title');
})

test('Event has attribute startTime', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('startTime');
})

test('Event has attribute endTime', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('endTime');
})

test('Event has attribute cost', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('cost');
})

test('Event has attribute description', async () => {
	const event = await createEvent();

	expect(event).toHaveProperty('description');
})