import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-existis-error";

interface RegiserUseCaseRequest {
  name: string;
  email: string;
  password: string
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor( private usersRepository: UsersRepository ) {}

  async execute({
    name,
    email,
    password
  }: RegiserUseCaseRequest) {
  
    const password_hash = await hash(password, 6);

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError();
    } 

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

