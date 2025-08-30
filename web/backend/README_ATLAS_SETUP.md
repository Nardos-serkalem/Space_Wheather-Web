# MongoDB Atlas Setup for Team Members

## Quick Start

1. **Create your .env file**: Copy the example and add your Atlas credentials
2. **Test connection**: Run `npm run test-connection`

## For New Team Members

### Step 1: Get MongoDB Atlas Access
- Ask the project admin for MongoDB Atlas credentials
- Or create your own Atlas account and get added to the project

### Step 2: Create Your Local .env File
1. Copy `.env.example` to your local machine and rename it to `.env`
2. Update the `MONGO_URI` with your credentials:

```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@atlascluster.y8sbi1n.mongodb.net/space-weather?retryWrites=true&w=majority
```

### Step 3: Test Your Connection
```bash
npm run test-connection
```

You should see:
```
✅ Connected to MongoDB Atlas successfully!
📚 Collections in space-weather database:
   1. admins
   2. events
   3. research
   4. staff
🔌 Connection closed successfully
```

## Security Notes

- **Never commit** `.env` to version control
- **Never share** your actual passwords in chat or email
- Each team member should have their own Atlas credentials
- The `.env` file is already in `.gitignore`

## Troubleshooting

### Connection Failed?
- Check your username/password
- Ensure your IP is whitelisted in Atlas Network Access
- Verify the cluster is running
- Check your internet connection

### Authentication Error?
- Double-check username and password
- Make sure you have the correct database permissions
- Verify you're using the right cluster

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run setup` - Create admin user
- `npm run test-connection` - Test Atlas connection

## Database Collections

The `space-weather` database contains:
- `admins` - Admin user accounts
- `events` - Space weather events
- `research` - Research publications
- `staff` - Staff member profiles

## Need Help?

- Check the MongoDB Atlas documentation
- Ask your team lead for credentials
- Verify your network access settings in Atlas

---

## 🚀 **Production Deployment Note**

**For the Company/Production Team:**

This application saves uploaded files to an `uploads/` folder and stores file paths in MongoDB. 

**For production deployment:**
- Configure the production `uploads/` directory on your server, OR
- Implement cloud storage (AWS S3, Cloudinary, etc.) and update file paths accordingly
- All file paths in the database will automatically point to your production storage location

**No code changes are required** - the application is already production-ready and will work with any storage solution you choose.
