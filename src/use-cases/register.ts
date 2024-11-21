import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-existis-error";
import { User } from "@prisma/client";

interface RegiserUseCaseRequest {
  name: string;
  email: string;
  password: string
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase 
{
  constructor( private usersRepository: UsersRepository ) {}

  async execute({
    name,
    email,
    password
  }: RegiserUseCaseRequest): Promise<RegisterUseCaseResponse> {
  
    const password_hash = await hash(password, 6);

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError();
    } 

   const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
