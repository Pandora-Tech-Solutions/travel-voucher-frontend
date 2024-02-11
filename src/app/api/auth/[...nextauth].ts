// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { NextApiRequest, NextApiResponse } from 'next';
// const options = {
//   providers: [
//     Credentials({
//       name: 'Email',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         // Aqui você pode implementar a lógica de autenticação com email e senha
//         // Verifique as credenciais fornecidas e retorne o usuário autenticado ou null se a autenticação falhar
//         const user = await yourAuthenticationLogic(credentials.email, credentials.password);
//         if (user) {
//           // Se a autenticação for bem-sucedida, retorne o objeto do usuário
//           return Promise.resolve(user);
//         } else {
//           // Se a autenticação falhar, retorne null
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
// };

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default handler;
