# 💰 Bytebank

Projeto frontend do Bytebank desenvolvido com [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) e [Material UI](https://mui.com).

🎥 [Assista à demonstração no YouTube](https://www.youtube.com/watch?v=SjfjRfZSjK0)

## 📦 Tecnologias

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Material UI (MUI)](https://mui.com)
- [Docker](https://www.docker.com)

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/bytebank.git
cd bytebank
```

2. Instale as dependências:

```bash
yarn install
```

## 🧪 Scripts disponíveis

- `yarn dev` – Inicia o servidor de desenvolvimento.
- `yarn build` – Compila o projeto para produção.
- `yarn start` – Inicia o servidor em modo de produção.
- `yarn lint` – Executa o linter para análise de código.
- `yarn docker:build` – Cria a imagem Docker do frontend.
- `yarn docker:start` – Executa o container Docker na porta 3000.

## 🐳 Usando Docker

Para rodar o projeto com Docker:

### 1. Build da imagem

```bash
yarn docker:build
```

### 2. Executar container

```bash
yarn docker:start
```

O app estará disponível em: [http://localhost:3000](http://localhost:3000)

---
