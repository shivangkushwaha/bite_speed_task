
# Identity Reconciliation Service

This is a Node.js-based web service for identity reconciliation using MySQL. The service provides an endpoint to consolidate customer contact information based on email and phone number.

## Prerequisites

- Node.js
- MySQL

## Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/shivangkushwaha/bite_speed_task
cd identity-reconciliation
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure MySQL

1. Ensure MySQL is installed and running.
2. Create a database:

```sql
CREATE DATABASE identity_reconciliation;
```

3. Update the database configuration in `src/models.js`:

```javascript
const sequelize = new Sequelize('identity_reconciliation', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql'
});
```

### Step 4: Run the Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## API Endpoint

### `/identify`

**Method**: `POST`

**Request Body**:

```json
{
    "email": "string",
    "phoneNumber": "integer"
}
```

**Response**:

```json
{
    "contact": {
        "primaryContactId": "number",
        "emails": ["string"],
        "phoneNumbers": ["string"],
        "secondaryContactIds": ["number"]
    }
}
```

## License

This project is licensed under the MIT License.
