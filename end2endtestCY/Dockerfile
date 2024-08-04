FROM cypress/included:12.17.1

WORKDIR /e2e

# Copy package.json and package-lock.json
COPY end2endtestCY/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY end2endtestCY .

# Run Cypress tests
CMD ["npx", "cypress", "run", "--browser", "chrome"]