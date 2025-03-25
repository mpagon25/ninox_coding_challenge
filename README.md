# GIF Gallery App

A React application that displays trending GIFs from GIPHY with search functionality and modal views for individual GIFs.

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd ninox_coding_challenge
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with your GIPHY API credentials:

```
VITE_GIPHY_API_KEY=your_giphy_api_key
VITE_GIPHY_API_URL=https://api.giphy.com/v1/gifs
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Running Tests

To run the test suite:

```bash
npm test
```

## Features

- Display trending GIFs in a responsive grid
- Search functionality with URL persistence
- Infinite scrolling for loading more GIFs
- Modal view for individual GIFs with details
- Keyboard navigation support
- Fully accessible components
