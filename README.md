TrustVault is a blockchain-based contract and document management system designed to provide secure document storage and contract handling for different users, including receptionists and patients. The system ensures immutability, access control, and seamless document retrieval, similar to Google Drive but enhanced with blockchain security.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/14Rugved/TrustVault) [![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT) [![Version](https://img.shields.io/badge/version-1.0.0-orange)](https://github.com/14Rugved/TrustVault/releases)

1. Clone the repository
   ```bash
   git clone https://github.com/14Rugved/TrustVault.git
   cd TrustVault
   ```
2. Install dependencies
   ```bash
   npm install  # For backend
   cd frontend && npm install  # For React Native Expo frontend
   ```
3. Configure environment variables
   Create a .env file in the root folder and add:
   ```
   DATABASE_URL=<Your PostgreSQL connection string>
   FIREBASE_CONFIG=<Your Firebase credentials>
   BLOCKCHAIN_RPC_URL=<Your Blockchain Node RPC>
   TWILIO_SID=<Your Twilio SID>
   TWILIO_AUTH_TOKEN=<Your Twilio Auth Token>
   ```
4. Start the backend server
   ```bash
   npm start
   ```
5. Start the mobile app
   ```bash
   cd frontend
   npx expo start
   ```

### API Endpoints
| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | /auth/signup          | Register a new user       |
| POST   | /auth/login           | Authenticate user          |
| POST   | /documents/upload     | Upload a document          |
| GET    | /documents/view       | View all documents         |
| POST   | /contracts/create     | Create a blockchain contract|
| GET    | /contracts/view       | Retrieve contract details   |

✅ User Authentication: Separate login systems for Receptionists and Patients.
✅ Secure Document Storage: Upload and manage documents securely.
✅ Blockchain Integration: Ensures tamper-proof contract storage.
✅ Role-Based Access Control: Patients can access documents, but only receptionists can upload them.
✅ Reminder & Notifications: Automatic reminders for contract deadlines.
✅ PostgreSQL Backend: Efficient and scalable document management.
✅ React Native Expo App: Seamless and user-friendly mobile experience.

### Tech Stack
**Frontend**
- React Native Expo ⚛️
- Tailwind CSS 🎨
- ShadCN UI Components 📱

**Backend**
- Node.js & Express.js 🚀
- PostgreSQL 🗄️
- Firebase (for storing documents) 🔥
- Blockchain (Smart Contracts for immutability) 🔗
- Twilio & FCM (Notifications) 🔔

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository 🍴
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Added new feature'`
4. Push to branch: `git push origin feature-branch`
5. Open a pull request 📩

This project is licensed under the MIT License.

👤 Rugved Patil
📧 rigved.221235.co@mhssce.ac.in
📞 9022391299
GitHub: [14Rugved](https://github.com/14Rugved)
