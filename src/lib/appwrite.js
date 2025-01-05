import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6778c904002fbb0c8f63');

export const account = new Account(client);
export const databases = new Databases(client);

export const appwriteConfig = {
  databaseId: '6779e6550029782140b4',
  collections: {
    users: 'users',
    games: 'games',
    gameSessions: 'game_sessions',
  },
};

export { ID } from 'appwrite';
