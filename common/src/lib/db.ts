type User = { id: string; name: string; };

let db: User[] = []; // in-memory database

export const userList = async (): Promise<User[]> => {
  return db;
};

export const userById = async (id: string): Promise<User | undefined> => {
  return db.find(user => user.id === id);
};

export const userCreate = async (data: { name: string }): Promise<User> => {
  const newUser: User = { id: Date.now().toString(), name: data.name };
  db.push(newUser);
  return newUser;
};
