# My Boilerplate

> TypeScript, Tailwind + shadcn/ui, React Query (TanStack), React Router (Declarative mode), tRPC, React Hook Form + Zod, Vitest, dan Playwright.

```bash
# install react vite
npm create vite@latest my-boilerplate -- --template react-ts

cd my-boilerplate
```

```bash
# install deps
npm i react-router-dom @tanstack/react-query @trpc/client @trpc/react-query zod react-hook-form @hookform/resolvers
```

```bash
# install shadcn + tailwind
https://ui.shadcn.com/docs/installation/vite
```

## TRPC React + Server Express

karena react client side tidak memiliki server seperti next.js, jadi harus membuat server sendiri. dan disini kita menggunakan
monorepo.

pada folder client install deps berikut ini:

```bash
npm install @trpc/client @trpc/react-query @trpc/tanstack-react-query @tanstack/react-query @tanstack/react-query-devtools zod
```

pada folder server install deps berikut ini:

```bash
npm install @supabase/supabase-js @trpc/server cors dotenv express zod
```

**Bagaimana caranya menghubungkan antara server & client ?**

1. setup trpc di server dan client. bisa cek code yang sudah ada.
2. build server.
3. pada client lakukan ` npm install ../server`
4. pada folder client/providers/trpc-provider.tsx kita import trpc server routers seperti ini `import type { AppRouter } from "server/routers";` lalu coba jalankan clientnya.
5. setiap membuat route

jika ingin running bersamaan tinggal arahin ke root folder. lalu jalankan `npm run dev`

# Setelah clone

jika ingin mengubah nama projectnya, pada package.json client, server, dan server-hono, ganti namanya. nanti di package.json root juga harus diganti. jika sudah coba jalankan `npm run dev`
