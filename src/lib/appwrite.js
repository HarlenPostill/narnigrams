import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6778c904002fbb0c8f63'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
