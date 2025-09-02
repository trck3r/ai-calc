
#!/bin/bash

# Railway deployment script
echo "Starting deployment process..."

# Install dependencies
echo "Installing dependencies..."
yarn install --frozen-lockfile

# Generate Prisma client
echo "Generating Prisma client..."
yarn prisma generate

# Build the application
echo "Building application..."
yarn build

echo "Deployment process complete!"
