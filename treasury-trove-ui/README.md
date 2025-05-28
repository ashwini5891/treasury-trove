# Treasury Trove

A financial management application with Supabase authentication.

## Features

- User authentication (Sign up, Sign in, Password reset)
- Protected routes
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/treasury-trove.git
   cd treasury-trove/treasury-trove-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   Replace `your-supabase-url` and `your-supabase-anon-key` with your Supabase project credentials.

4. **Start the development server**
   ```bash
   npm start
   ```
   This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Supabase Setup

1. **Create a new project** in your [Supabase dashboard](https://app.supabase.com/)
2. **Enable Email/Password authentication**:
   - Go to Authentication > Providers
   - Enable "Email" provider
   - Configure email templates if needed
3. **Configure Site URL**:
   - Go to Authentication > URL Configuration
   - Add your development and production URLs (e.g., `http://localhost:3000`)

## Deployment

### Building for Production

```bash
npm run build
```

This will create a production build in the `build` folder.

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Add the environment variables in Netlify's site settings
4. Deploy!

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
