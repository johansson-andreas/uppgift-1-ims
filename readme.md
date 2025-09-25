### 1. 📦 Install Dependencies

```bash
npm install
```

---

### 2. 🔐 Create `.env` File

Create a `.env` file in the root directory and follow the structure provided in `.env.example`:

```bash
.env.example 
```

Then update the keys in `.env` as needed.

---

### 3. 🌱 Seed the Database

Run the seed script while in root to populate the database with fake users and tasks:

```bash
npx tsx scripts/seed.ts
```

### 4. 🚀 Start the Server

```bash
npm run dev
```

Then go to:

```
http://localhost:3000/graphql
```

to interact with the GraphQL API.

---