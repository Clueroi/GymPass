# App

gympass style app.

# RF (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas(ate 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

# RN (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validade até 20 min após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

# RNF (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT(JSON Web Token) 



Para rodar o projeto: 
1. Ao abrir a pasta /GymPass no vsCode, no terminal passar um "npm i" para instalar todas as dependências
2. Depois de instaladas as dependências, certifique-se de ter a extensão do docker no vs code instalada, e passe "docker compose up -d"
3. E agora você acessa com seu banco de dados, mas o do projeto, é o prisma que caso queira usa-lo, pode passar "npx prisma migrate dev" para subir as tabelas, e para checar pode usar o comando "npx prisma studio", e para testar, pode usar algum API client que preferir, como o postman, ou um front-end.