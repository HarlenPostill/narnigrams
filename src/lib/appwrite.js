import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6778c904002fbb0c8f63');

export const account = new Account(client);
export const databases = new Databases(client);

export const appwriteConfig = {
  databaseId: '6779e6550029782140b4',
  collections: {
    users: '6779e66600250fe01b74',
    games: '6779e674001e97c35d37',
    gameSessions: '6779e67b00358d167e39',
  },
};

export { ID } from 'appwrite';
