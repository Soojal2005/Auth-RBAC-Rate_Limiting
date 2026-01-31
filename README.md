🔐 Auth RBAC Platform

A production-ready backend system implementing JWT authentication, Role-Based Access Control (RBAC), and Redis-backed rate limiting.
Built to demonstrate how real-world backend systems handle security, authorization, and API abuse prevention at scale.

🚀 Key Features
JWT-based authentication (stateless & scalable)
Role-Based Access Control (RBAC) with explicit permissions
Per-user, per-route rate limiting using Redis
Role-based API limits (e.g. Admin vs User)
Clean layered architecture (middleware → controller → service)
API versioning (/api/v1)
OpenAPI 3.0 documentation with Swagger UI
Centralized error handling

🧱 Architecture Overview

Each request passes through multiple layers to ensure security, correctness, and abuse prevention.

Client
  ↓
Auth Middleware (JWT verification)
  ↓
RBAC Middleware (permission checks)
  ↓
Rate Limiter (Redis)
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database


This separation ensures:

Clear responsibility boundaries
Easy extensibility
Production-grade maintainability

🔐 Authentication & Authorization (RBAC)

Authentication is handled using JWT tokens
On each request, the token is verified and the user context
(id, role) is attached to the request
Authorization is enforced via RBAC
Roles map to explicit permissions
Routes declare required permissions
Access is allowed or denied centrally via middleware
This avoids permission logic being scattered across routes.

🚦 Rate Limiting (Redis)

Rate limiting is implemented using Redis to prevent API abuse without hitting the database.
How it works:
Limits are applied per user + per route
Redis counters are incremented on each request
TTL (Time To Live) is set on the first request
When TTL expires, Redis automatically resets the counter
Different roles can have different limits
Why Redis instead of DB?
In-memory → very low latency
Automatic expiry via TTL
Horizontally scalable
No DB writes on hot paths
This mirrors how real SaaS backends handle rate limiting.

📘 API Documentation (Swagger)

All APIs are documented using OpenAPI 3.0 and exposed via Swagger UI.
Auth-protected routes are clearly marked
Request validation schemas prevent invalid requests
Versioned endpoints (/api/v1) keep APIs future-proof

### Swagger Overview

![Swagger Overview](screenshots/swagger-overview.png)

🔒 Authorized API Access

Swagger UI supports JWT authorization directly.

Once authenticated:

Bearer token is applied globally
Protected routes become accessible
Authorization is visually indicated

![Authorized Swagger](screenshots/swagger-authorized.png)


This confirms that authentication and authorization are fully wired, not mocked.

🧠 Learning Goals

This project was built to deeply understand:
Real-world authentication vs authorization
RBAC design using roles & permissions
Redis-based rate limiting without database dependency
Middleware-driven backend architecture
API versioning & request validation
Production-grade backend design patterns

🛠 Tech Stack
Node.js
TypeScript
Fastify
JWT
Redis
Prisma
PostgreSQl
Swagger / OpenAPI

📌 Status
✅ Core features implemented
🚧 Further enhancements possible (metrics, caching, audit logs)

📄 License
ISC

🔥 Final Note 
This project is intentionally focused on backend fundamentals done right —
not on UI or demo fluff.
It reflects how real backend systems are designed and reasoned about,
and is suitable for interviews, learning, and production extension.
