# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Razorpay Configuration

This project uses Razorpay for payment processing. To configure the Razorpay integration:

1. Create a `.env` file based on the `.env.example` template
2. For development, use your Razorpay test key:

   ```
   VITE_RAZORPAY_KEY=rzp_test_YOUR_TEST_KEY
   ```

3. For production, use your Razorpay live key:

   ```
   VITE_RAZORPAY_KEY=rzp_live_YOUR_LIVE_KEY
   ```

4. Deploy your application with the proper environment variables set for production.

Never commit your actual keys to version control. Always use environment variables to manage sensitive credentials.

# Environment Variables

Create a `.env` file in the project root with the following content (do NOT commit this file):

```
RAZOR_PAY_API_KEY=your_razorpay_key
RAZOR_PAY_API_SECRET=your_razorpay_secret
```

The application will use these environment variables for payment integration. Never share or commit your `.env` file to version control.
