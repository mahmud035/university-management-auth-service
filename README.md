# University Management — Authentication Service

**The authentication & authorization microservice of a University Management System — TypeScript, Express, Mongoose (MongoDB), Zod, and JWT with role-based access control.**

This service owns identity for the whole platform: it creates and manages users across four roles (**super_admin, admin, faculty, student**), issues JWT access/refresh tokens, and enforces role-based authorization. It also owns the academic reference data that identity depends on — academic semesters, faculties, and departments. It is one half of a two-service system; the companion [core service](https://github.com/mahmud035/university-management-core-service) handles course, room, and semester-registration domains and **verifies the JWTs this service issues** (both share the access-token secret).

---

## Highlights

- **Layered, modular architecture** — every domain (`user`, `student`, `faculty`, `admin`, `auth`, `academicSemester`, `academicFaculty`, `academicDepartment`, `managementDepartment`) is split into `route → controller → service → validation → model → interface`; controllers never touch the database, services own all logic.
- **Role-based access control** — an `auth(...requiredRoles)` middleware verifies the JWT, attaches the decoded `{ userId, role }` to the request, and authorizes by role membership (403 on mismatch).
- **Auto-generated user IDs** — students, faculty, and admins receive sequential, semester/role-scoped IDs generated server-side on creation.
- **Secure credentials** — bcrypt hashing in a Mongoose `pre('save')` hook, with a `needsPasswordChange` flag so first-login password rotation can be enforced.
- **Access + refresh tokens** — login issues both; `/auth/refresh-token` re-mints an access token from a valid refresh token.
- **Validation at the edge** — a `validateRequest` middleware runs a Zod schema over the request before any handler executes.
- **Consistent errors & logging** — a global error handler normalizes Zod / Mongoose / cast / custom API errors into one envelope; winston with daily-rotate-file for structured logs.
- **Paginated, searchable listings** — every list endpoint supports `searchTerm`, `page`, `limit`, `sortBy`, and `sortOrder`.

---

## Architecture

```
                       ┌───────────────────────────────────────────────┐
   client / gateway ─▶ │  Auth Service (Express + TypeScript)          │
        JWT            │                                               │
                       │  route → validateRequest(Zod) → auth(roles)   │
                       │        → controller → service → Mongoose model │
                       │                                               │
                       │  cross-cutting: globalErrorHandler, winston,   │
                       │  jwtHelper, pagination helper                  │
                       └───────────────────────┬───────────────────────┘
                                               ▼
                                      MongoDB (Mongoose ODM)

  Issues JWTs ─────────────▶ verified by the sibling Core Service
  (shared access-token secret)   (course / room / semester-registration)
```

**Auth model:** `login` returns an access token and a refresh token (separate secrets/expiries) carrying `userId` and `role`; protected routes call `auth('admin', 'faculty', …)`; the same access-token secret lets the core service authorize requests without a second login.

---

## Tech stack

| Layer | Stack |
|---|---|
| Runtime / framework | Node.js, Express 4.18, TypeScript 5 |
| Database | MongoDB via Mongoose 8 |
| Validation | Zod 3.21 via `validateRequest` middleware |
| Auth | jsonwebtoken 9 (access + refresh), bcrypt 5 |
| Ops | winston 3 + daily-rotate-file, http-status, morgan, husky + lint-staged |
| Hosting | Vercel |

---

## Functional requirements

### Student
- Log in and log out.
- Manage and update their own profile (certain fields only).

### Faculty
- Log in and log out.
- Manage and update their own profile (certain fields only).

### Admin
- Log in and log out.
- Manage and update their own profile (certain fields only).
- Manage user accounts, including changing passwords.

---

## API Endpoints

### User
- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### Student
- `GET /students`
- `GET /students?searchTerm=fr797`
- `GET /students?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### Faculty
- `GET /faculties`
- `GET /faculties?searchTerm=john`
- `GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`

### Admin
- `GET /admins`
- `GET /admins?searchTerm=us88`
- `GET /admins?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### Academic Semester
- `POST /academic-semesters/create-semester`
- `GET /academic-semesters`
- `GET /academic-semesters?searchTerm=fal`
- `GET /academic-semesters?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET /academic-semesters/:id`
- `PATCH /academic-semesters/:id`
- `DELETE /academic-semesters/:id`

### Academic Department
- `POST /academic-departments/create-department`
- `GET /academic-departments`
- `GET /academic-departments?searchTerm=math`
- `GET /academic-departments?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-departments/:id`
- `PATCH /academic-departments/:id`
- `DELETE /academic-departments/:id`

### Academic Faculty
- `POST /academic-faculties/create-faculty`
- `GET /academic-faculties`
- `GET /academic-faculties?searchTerm=com`
- `GET /academic-faculties?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-faculties/:id`
- `PATCH /academic-faculties/:id`
- `DELETE /academic-faculties/:id`

### Authentication
- `POST /auth/login`
- `POST /auth/change-password`
- `POST /auth/refresh-token`

📮 **Postman documentation:** [Click here](https://documenter.getpostman.com/view/26682150/2s93zB72V9#acc25f08-de78-478b-809d-837ce239d2b3)

---

## Run locally

```bash
git clone https://github.com/mahmud035/university-management-auth-service.git
cd university-management-auth-service
yarn install
yarn dev          # ts-node-dev, respawns on change
```

**Environment (`.env`):**

```
DATABASE_URL=...                     # MongoDB connection string
DEFAULT_STUDENT_PASSWORD=...
DEFAULT_FACULTY_PASSWORD=...
DEFAULT_ADMIN_PASSWORD=...
BCRYPT_SALT_ROUNDS=...
JWT_SECRET=...                       # access-token secret (shared with core service)
EXPIRES_IN=...
JWT_REFRESH_SECRET=...
REFRESH_EXPIRES_IN=...
```

Build for production with `yarn build` (`tsc`), then `yarn start`.
