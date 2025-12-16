# 🚀 Meta Pixel & Google Tag Manager Testing App

A beautiful, modern React application designed to test and monitor **Google Tag Manager (GTM)** and **Meta Pixel** events in real-time.

## ✨ Features

- **Real-time Event Tracking**: Monitor GTM and Meta Pixel events as they fire
- **E-commerce Events**: Test complete shopping flow (ViewContent, AddToCart, InitiateCheckout, Purchase)
- **Lead Generation**: Track user registration and lead events
- **Engagement Tracking**: Monitor search, contact, and subscription events
- **Custom Events**: Send custom events with configurable parameters
- **Live Status Indicators**: Visual indicators showing tracker status
- **Event Log**: Real-time log of all tracked events with detailed data
- **Modern UI**: Beautiful dark theme with gradients, animations, and responsive design

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 Configuration

### Google Tag Manager Setup

1. Open `index.html`
2. Replace `GTM-XXXXXXX` with your actual GTM Container ID in two places:
   ```html
   <!-- In the <head> section -->
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-XXXXXXX');
   
   <!-- In the <body> section -->
   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   ```

### Meta Pixel Setup

1. Open `index.html`
2. Replace `YOUR_PIXEL_ID_HERE` with your actual Meta Pixel ID in two places:
   ```html
   fbq('init', 'YOUR_PIXEL_ID_HERE');
   
   <!-- And in the noscript tag -->
   src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1"
   ```

## 🎯 Event Types

### E-commerce Events

| Button | Event Name | Description |
|--------|------------|-------------|
| 👁️ View Content | ViewContent | User views a product |
| 🛒 Add to Cart | AddToCart | User adds item to cart |
| 💳 Initiate Checkout | InitiateCheckout | User begins checkout |
| ✅ Complete Purchase | Purchase | User completes purchase |

### Lead Generation Events

| Button | Event Name | Description |
|--------|------------|-------------|
| 📝 Generate Lead | Lead | User submits lead form |
| ✨ Complete Registration | CompleteRegistration | User completes registration |

### Engagement Events

| Button | Event Name | Description |
|--------|------------|-------------|
| 🔍 Search | Search | User performs search |
| 📧 Contact | Contact | User initiates contact |
| 🔔 Subscribe | Subscribe | User subscribes to newsletter |

### Custom Events

Use the custom event form to send any event with:
- Custom event name
- Event value (numeric)
- Currency selection (USD, EUR, GBP, INR, CAD, AUD)
- Additional data (JSON or text)

## 🔍 Testing in GTM

1. Open Google Tag Manager
2. Go to **Preview** mode
3. Enter your local development URL: `http://localhost:5173`
4. Click buttons in the app
5. See events firing in GTM Debug Console

## 📊 Testing in Meta Events Manager

1. Open [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel
3. Go to **Test Events** tab
4. Click buttons in the app
5. See events appearing in real-time

## 🎨 Design Features

- **Dark Theme**: Modern dark mode with gradient accents
- **Micro-animations**: Smooth hover effects and transitions
- **Glassmorphism**: Premium card designs with backdrop blur effects
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Google Fonts**: Uses Inter font for premium typography
- **CSS Variables**: Easy customization through CSS custom properties

## 📝 Event Data Structure

All events are logged with:
- **Type**: GTM or Meta Pixel
- **Event Name**: Name of the event
- **Timestamp**: When the event was fired
- **Data**: Complete event parameters in JSON format

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Vanilla CSS**: Custom CSS with modern features
- **GTM dataLayer**: Standard GTM implementation
- **Meta Pixel**: Facebook Pixel integration

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Privacy & Data

This is a testing application. For production use:
- Implement proper consent management
- Add cookie banners
- Follow GDPR/CCPA guidelines
- Review Meta and Google privacy policies

## 🐛 Troubleshooting

### GTM Not Loading
- Check your GTM Container ID
- Ensure GTM container is published
- Check browser console for errors
- Verify network requests in DevTools

### Meta Pixel Not Loading
- Verify your Pixel ID
- Check if ad blockers are disabled
- Review browser console for errors
- Use Meta Pixel Helper Chrome extension

### Events Not Firing
- Open browser console to see debug logs
- Check the Event Log section in the app
- Verify tracker status indicators are green
- Use GTM Preview mode for debugging

## 📚 Resources

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

MIT License - feel free to use this for testing and development!

## 🤝 Contributing

This is a testing tool. Feel free to fork and customize for your needs!

---

**Made with ❤️ for testing and learning**
