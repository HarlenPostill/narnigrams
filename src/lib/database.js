import { databases, appwriteConfig } from './appwrite';
import { ID } from 'appwrite';

export const userService = {
  async createOrGetProfile(userId, name) {
    try {
      const existingUser = await this.getProfile(userId);
      if (existingUser) return existingUser;

      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.users,
        userId,
        {
          userId: userId,
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
      return await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.users,
        userId
      );
    } catch (error) {
      if (error.code === 404) return null;
      throw error;
    }
  },

  async updateProfile(userId, updates) {
    try {
      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.users,
        userId,
        updates
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};
