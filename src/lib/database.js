import { databases } from './appwrite';
import { Query } from 'appwrite';

// Replace with your actual database and collection IDs
const DATABASE_ID = '6779e6550029782140b4';
const USERS_COLLECTION_ID = 'users';

export const userService = {
  async createOrGetProfile(userId, name) {
    try {
      // First try to get existing profile
      const existingUser = await this.getProfile(userId);
      if (existingUser) return existingUser;

      // If no profile exists, create one
      return await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userId, // Use the auth userId as the document ID
        {
          username: name,
          gamesPlayed: 0,
          gamesWon: 0,
          rating: 1000,
          isOnline: true,
          lastActive: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Error in createOrGetProfile:', error);
      throw error;
    }
  },

  async getProfile(userId) {
    try {
      return await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
    } catch (error) {
      if (error.code === 404) return null;
      throw error;
    }
  },

  async updateProfile(userId, updates) {
    try {
      return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, updates);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};
