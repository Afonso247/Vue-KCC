# Vue-KCC

Esta aplicação front-end faz parte de um projeto chamado "Kokomi's Mindspace", em que a KokomAI, a inteligência artificial principal do projeto, atende usuários e fornece assistência terapeutica para quem precisa.

## Notas de Atualização

`v1.0.1` *
- Corrigido um bug em que, ao trocar de nome de usuário, o front não deixa você trocar para o nome original (a menos que a página seja atualizada)        
- Documentação e indentação do código

`v1.0.0` 
- Versão inicial do projeto front-end

## Índice

- [Configuração de IDE Recomendada](#configuração-de-ide-recomendada)
- [Instalação e Uso](#instalação-e-uso)
- [Contribuindo](#contribuindo)
- [Tecnologias e Funcionalidades](#tecnologias-e-funcionalidades)
- [Contato](#contato)

---

## Configuração de IDE Recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desative Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Instalação e Uso

Antes de iniciar a instalação, certifique-se de que você possui o Node.js instalado em sua máquina. Recomendo a versão 18.18.0 ou superior, para garantir que a aplicação rode sem problemas.

Siga os passos abaixo para configurar e rodar o projeto localmente:

### Clone o repositório
```bash
git clone https://github.com/Afonso247/Vue-KCC.git
```
### Navegue até a pasta do projeto
```bash
cd Vue-KCC
```

### Instale as dependências
```bash
npm install
```

### Compilar e Hot-Reload p/ Desenvolvimento (Porta 5173)

```sh
npm run dev
```

### Compilar e 'Minify' p/ Produção

```sh
npm run build
```
Para mais informações sobre os scripts do `npm run`, acesse o `package.json` da aplicação.

## Contribuindo

Você tem ideias interessantes para adicionar ao projeto? Não hesite em contribuir:

1. Faça um fork do repositório.

2. Crie uma branch nova para implementar suas alterações
```bash
git checkout -b minha-nova-feature
```

3. Commit suas mudanças com uma mensagem descritiva:
```bash
git commit -m 'Adicionando nova feature'
```

4. Faça um push para a branch criada:
```bash
git push origin minha-nova-feature
```

5. Abra um pull request.

## Tecnologias e Funcionalidades

### Tecnologias Utilizadas

Esta aplicação foi desenvolvida utilizando as seguintes tecnologias principais:

- **Vue.js**: Framework JavaScript utilizado para construir a interface do usuário.
- **Vite**: Ferramenta de build e desenvolvimento que oferece um ambiente de desenvolvimento rápido e moderno para aplicações Vue.js.
- **ESLint**: Ferramenta de desenvolvimento p/ clean code.
- **Vue Router**: Biblioteca para gerenciamento de rotas.
- **Axios**: Biblioteca para realizar requisições HTTP, facilitando a comunicação entre o front-end e o back-end.
- **Vuex**: Biblioteca para gerenciamento de estado.

### Funcionalidades Principais

A aplicação oferece as seguintes funcionalidades principais:

- **Layout da Aplicação**: Design intuitivo e responsivo para facilitar a navegação e usabilidade.
- **Navegação**: Sistema de rotas que permite a transição fluida entre diferentes páginas.
- **Autenticação de Usuário**: Sistema de login e autenticação seguro para usuários.
- **Configuração de Usuário**: Opção de personalizar configurações pessoais.
- **Chat entre Usuário e a IA**: Funcionalidade de chat interativo, permitindo a comunicação entre o usuário e a KokomAI.

## Contato

Se você tiver dúvidas, sugestões, ou qualquer outro assunto em relação ao repositório, entre em contato comigo:

- **Email**: afonsoh.dev@gmail.com
- **LinkedIn**: [Afonso Henrique](https://www.linkedin.com/in/afonso-h)
- **GitHub**: [Afonso247](https://github.com/Afonso247)

Fique à vontade para abrir issues no repositório ou enviar pull requests com melhorias e correções!

