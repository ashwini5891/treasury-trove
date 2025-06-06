# Treasury Trove

**Treasury Trove** is a collaborative expense tracking app built for groups, clubs, flatshares, and communities who need a simple and transparent way to manage shared finances. It replaces spreadsheet chaos with a modern, API-driven platform designed to streamline expense logging, summaries, and exports.

---

## MVP Overview

The MVP delivers core features to track income and expenses, organise users into groups, and provide monthly summaries and exportable reports.

### Features
- Secure user authentication (JWT-based)
- Group creation and role-based access (Treasurer / Viewer)
- Add income and expenses with category, date, and optional receipt
- Transaction history with sorting and filtering
- Monthly summaries by category
- CSV/PDF export of transactions for custom date ranges

---

## Tech Stack

- **Frontend**: React  
- **Backend**: C# / .NET microservices  
- **Database**: PostgreSQL  
- **Auth**: JWT with optional Keycloak integration  
- **API Gateway**: YARP (Yet Another Reverse Proxy)

---

## Microservices

| Service             | Responsibility                           |
|---------------------|-------------------------------------------|
| Auth Service        | Signup/Login, JWT issuance & validation   |
| User Service        | User and group management                 |
| Transaction Service | Expense & income logging                  |
| Export Service      | Generate PDF/CSV transaction summaries    |
| API Gateway/BFF     | Central access point, request orchestration |

---

## Getting Started (Dev)

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- PostgreSQL
- (Optional) [Keycloak](https://www.keycloak.org/) for advanced auth

### Setup Instructions
1. Clone the repo
2. Run each microservice from `/services/*`
3. Start the frontend from `/frontend`
4. Launch PostgreSQL containers (or use a local instance)
5. Use `.env.sample` files as needed to configure local secrets

---

## Roadmap

- [ ] Split transactions by event
- [ ] Mobile-friendly UI
- [ ] OCR for receipt upload
- [ ] Custom categories
- [ ] Notifications for group members

---

## License

MIT License
