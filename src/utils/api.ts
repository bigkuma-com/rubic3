import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_URL_CMS);

export async function getFullList({
  collection,
  params = {
    sort: "created",
  },
}: {
  collection: string;
  params?: any;
}) {
  const records = await pb.collection(collection).getFullList(200, params);

  return records;
}

export async function getList({
  collection,
  page = 1,
  perPage = 50,
  params = {
    sort: "created",
  },
}: {
  page?: number;
  perPage?: number;
  collection: string;
  params?: any;
}) {
  const records = await pb
    .collection(collection)
    .getList(page, perPage, params);

  return records;
}

export async function getOne({
  id,
  collection,
  params = {
    sort: "created",
  },
}: {
  id: string;
  collection: string;
  params?: any;
}) {
  const record = await pb.collection(collection).getOne(id, params);

  return record;
}

export async function postOne({
  collection,
  data,
}: {
  collection: string;
  data: any;
}) {
  const record = await pb.collection(collection).create(data);

  return record;
}

export function getImage({
  collectionName,
  recordId,
  filename,
}: {
  collectionName: string;
  recordId: string;
  filename: string;
}) {
  return `${process.env.NEXT_PUBLIC_URL_CMS}/api/files/${collectionName}/${recordId}/${filename}`;
}
