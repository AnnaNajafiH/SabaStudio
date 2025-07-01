// Central export file for all Mongoose models
// This makes it easy to import models throughout the application

export { default as Contact, IContact } from './Contact';
export { default as Project, IProject } from './Project';
export { default as User, IUser } from './User';

// Re-export for convenience
import Contact from './Contact';
import Project from './Project';
import User from './User';

export const models = {
  Contact,
  Project,
  User
};

export default models;
