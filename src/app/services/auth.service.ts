import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface User {
  firstName: string;
  lastName: string;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private usersKey = 'users'; // Clave para almacenar la lista de usuarios
  private profileImageKey = 'profileImage';

  constructor(private storage: Storage) { }

  async registerUser(user: any) {
    const users = await this.getUsers(); // Obtener la lista de usuarios
    const existingUser = users.find((u: any) => u.correo === user.correo); // Buscar si el correo ya existe

    if (existingUser) {
      throw new Error('El correo ya está registrado.'); // Lanzar error si el correo ya está en uso
    }

    users.push(user); // Agregar el nuevo usuario a la lista
    await this.storage.set(this.usersKey, users); // Almacenar la lista actualizada
  }

  async getUsers() {
    return (await this.storage.get(this.usersKey)) || []; // Obtener la lista de usuarios o un arreglo vacío
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users: User[] = await this.getUsers(); // Especifica el tipo de users como User[]
    return users.find((user: User) => user.correo === email); // Especifica el tipo de user
  }

  async setUserEmail(email: string) {
    await this.storage.set('loggedInUserEmail', email); // Almacena el correo del usuario que ha iniciado sesión
  }

  async getUserEmail() {
    return await this.storage.get('loggedInUserEmail'); // Obtiene el correo del usuario que ha iniciado sesión
  }

   // Actualizar usuario
  async updateUser(updatedUser: any): Promise<void> {
    const users = await this.storage.get('users') || [];
    const index = users.findIndex((user: any) => user.correo === updatedUser.correo);
    if (index !== -1) {
      users[index] = updatedUser;
      await this.storage.set('users', users);
    }
  }

  // Nuevo método para obtener el primer nombre del usuario actual
  async getCurrentUserFirstName(): Promise<string | undefined> {
    const email = await this.getUserEmail(); // Obtener el correo del usuario actual
    if (email) {
      const user = await this.getUserByEmail(email); // Obtener el usuario por correo
      return user ? user.firstName : undefined; // Devolver el primer nombre o undefined
    }
    return undefined; // Si no hay correo, devolver undefined
  }


  async setProfileImage(image: string) {
    return new Promise((resolve) => {
      localStorage.setItem('profileImage', image); // Guardar la imagen en localStorage
      resolve(true);
    });
  }

  async getProfileImage(): Promise<string | null> {
    return new Promise((resolve) => {
      const profileImage = localStorage.getItem('profileImage');
      resolve(profileImage ? profileImage : null);
    });
  }

}
