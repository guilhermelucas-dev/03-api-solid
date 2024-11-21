# Setup

# App

GymPass style app.

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível de autenticar;
- [] Deve ser possível objer o pefil de um usuário logado;
- [] Deve ser possível objer o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histório de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por admistrádores;
- [] A acacemia só pode ser cadastrada por administradores/

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas lista de dados precisam estar paginadas com 20 items por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);

```

```
