# Blessed Detailz - Car Detailing Frontend

A modern React web application for booking car detailing services.

## Features

- 🚗 **Service Selection**: Choose from Basic, Premium, or Ultimate detailing packages
- 📅 **Date Selection**: Pick your preferred date for service
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful interface with gradients and animations

## Tech Stack

### Frontend
- React 19 with TypeScript
- React DatePicker for date selection
- Modern CSS with gradients and animations

## Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd BlessedDetailz
chmod +x setup.sh
./setup.sh
```

### 2. Start the Application
```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Services Offered

| Service | Duration | Price | Description |
|---------|----------|-------|-------------|
| Basic Wash | 60 min | $45 | Exterior wash, interior vacuum, basic cleaning |
| Premium Detail | 120 min | $95 | Basic wash + interior deep clean, tire dressing, wax |
| Ultimate Detail | 180 min | $150 | Premium detail + paint correction, ceramic coating |

## Business Hours

- **Monday - Friday**: 9:00 AM - 6:00 PM
- **Saturday**: 9:00 AM - 4:00 PM  
- **Sunday**: Closed

## Project Structure

```
BlessedDetailz/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── setup.sh                # Automated setup script
└── README.md               # This file
```

## Development

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please contact the development team or create an issue in the repository. 