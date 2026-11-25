import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { MongoClient } from 'mongodb';

const dataDir = path.join(process.cwd(), 'data');
const legacyFiles = {
  webinars: path.join(dataDir, 'webinars.json'),
  registrations: path.join(dataDir, 'registrations.json')
};

const globalForMongo = globalThis;

async function getDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!globalForMongo.mongoPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    globalForMongo.mongoPromise = client.connect()
      .then(() => client.db(process.env.MONGODB_DB || 'cresthour'))
      .catch((error) => {
        globalForMongo.mongoPromise = null;
        throw error;
      });
  }

  return globalForMongo.mongoPromise;
}

function publicDocument(document) {
  if (!document) return null;
  const { _id, ...data } = document;
  return data;
}

async function collectionFor(name) {
  const database = await getDatabase();
  const collection = database.collection(name);

  if (await collection.estimatedDocumentCount() === 0) {
    let legacyData = [];
    try {
      legacyData = JSON.parse(await fs.readFile(legacyFiles[name], 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    if (!Array.isArray(legacyData)) {
      throw new Error(`Legacy ${name} data must be an array`);
    }

    await Promise.all(legacyData.map((document) => {
      const id = document.id || randomUUID();
      return collection.updateOne(
        { _id: id },
        { $setOnInsert: { ...document, id, _id: id } },
        { upsert: true }
      );
    }));
  }

  return collection;
}

export async function getWebinars() {
  const webinars = await collectionFor('webinars')
    .then((collection) => collection.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray());
  return webinars;
}

export async function getWebinarById(id) {
  const collection = await collectionFor('webinars');
  return publicDocument(await collection.findOne({ id }));
}

export async function createWebinar(data) {
  const collection = await collectionFor('webinars');
  const count = await collection.countDocuments();

  if (data.isFeatured) {
    await collection.updateMany({}, { $set: { isFeatured: false } });
  }

  const newWebinar = {
    id: `webinar-${Date.now()}-${randomUUID()}`,
    title: data.title || 'Weekly Webinar',
    weekLabel: data.weekLabel || `Week ${count + 1} Live Session`,
    category: data.category || 'Soft Skills & Basic Coding',
    date: data.date || '',
    time: data.time || '07:00 PM IST',
    duration: data.duration || '90 Minutes',
    price: Number(data.price) || 199,
    originalPrice: Number(data.originalPrice) || (Number(data.price) ? Number(data.price) * 3 : 999),
    seatsLeft: Number(data.seatsLeft) || 50,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : count === 0,
    posterUrl: data.posterUrl || '',
    meetingLink: data.meetingLink || '',
    whatsappGroupLink: data.whatsappGroupLink || '',
    speaker: data.speaker || 'Lead Mentor',
    speakerRole: data.speakerRole || 'Software Engineer & Career Coach',
    description: data.description || '',
    topics: Array.isArray(data.topics) ? data.topics : (data.topics ? data.topics.split('\n').filter(Boolean) : []),
    createdAt: new Date().toISOString()
  };

  await collection.insertOne({ ...newWebinar, _id: newWebinar.id });
  return newWebinar;
}

export async function updateWebinar(id, updates) {
  const collection = await collectionFor('webinars');
  const existing = await collection.findOne({ id });
  if (!existing) return null;

  if (updates.isFeatured) {
    await collection.updateMany({ id: { $ne: id } }, { $set: { isFeatured: false } });
  }

  const normalizedUpdates = {
    ...updates,
    ...(updates.price !== undefined ? { price: Number(updates.price) } : {}),
    ...(updates.originalPrice !== undefined ? { originalPrice: Number(updates.originalPrice) } : {}),
    ...(updates.seatsLeft !== undefined ? { seatsLeft: Number(updates.seatsLeft) } : {}),
    updatedAt: new Date().toISOString()
  };

  await collection.updateOne({ id }, { $set: normalizedUpdates });
  return publicDocument(await collection.findOne({ id }));
}

export async function deleteWebinar(id) {
  const collection = await collectionFor('webinars');
  const result = await collection.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function getRegistrations() {
  const collection = await collectionFor('registrations');
  const registrations = await collection.find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  return registrations;
}

export async function createRegistration(data) {
  const collection = await collectionFor('registrations');
  const newRegistration = {
    id: `reg-${Date.now()}-${randomUUID()}`,
    type: data.type || (data.isMonthlyPass ? 'monthly_pass' : 'single_webinar'),
    webinarId: data.webinarId || 'monthly_pass_all',
    webinarTitle: data.webinarTitle || 'All-Access Monthly Pass (4 Webinars)',
    userName: data.userName,
    userEmail: data.userEmail,
    userPhone: data.userPhone,
    amount: data.amount,
    paymentId: data.paymentId || 'free_reg',
    orderId: data.orderId || '',
    status: data.status || 'paid',
    whatsappStatus: data.whatsappStatus || 'pending',
    createdAt: new Date().toISOString()
  };

  await collection.insertOne({ ...newRegistration, _id: newRegistration.id });
  return newRegistration;
}

export async function updateRegistration(id, updates) {
  const collection = await collectionFor('registrations');
  const result = await collection.updateOne({ id }, { $set: updates });
  if (!result.matchedCount) return null;
  return publicDocument(await collection.findOne({ id }));
}
