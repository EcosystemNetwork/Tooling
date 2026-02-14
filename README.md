# Dev Tools Control Center (DTCC)

A comprehensive React-based dashboard application for managing development projects, assets, team members, and events. Built with React, React Router, and Vite. Each section is its own page with client-side routing. Data is persisted using browser LocalStorage.

## Features

### 📊 Project Dashboard (`/`)
- View and manage multiple development projects
- Track project status, team size, and completion percentage
- Add, edit, and delete projects
- Monitor last updated dates

### 🎨 Asset Manager (`/assets`)
- Organize and categorize development assets (3D Models, Textures, Audio, Animations, UI Elements)
- Search and filter assets by type
- Track asset metadata including size and author
- Add, edit, and delete assets

### 🚀 Build & Deploy Pipeline (`/builds`)
- Monitor build and deployment status
- Track build duration and triggered by information
- View build history with timestamps
- Add, edit, and delete build entries

### 👥 Team Management (`/team`)
- Manage team members and their roles (Admin, Developer, Artist, QA, Viewer)
- Track member status and last login times
- Add, edit, and delete team members
- Assign role-based permissions

### 📅 Events Schedule (`/events`)
- Schedule and track live operations and events
- Categorize events by type (Seasonal, Update, Tournament, Hotfix)
- Monitor event status (Upcoming, Live, Ended)
- Add, edit, and delete events

### 📈 Analytics & KPIs (`/analytics`)
- View key performance indicators
- Track metrics with trend indicators
- Monitor daily active users, revenue, retention rate, and more
- Add, edit, and delete KPI entries

### 💾 Data Management
- **Persistent Storage**: All data is automatically saved to browser LocalStorage
- **Export Data**: Download all your data as a JSON file
- **Import Data**: Upload a JSON file to restore or migrate data
- **Reset**: Clear all data and restore default examples

## Tech Stack

- **React 19** — UI framework
- **React Router 7** — Client-side routing (each tab is its own page)
- **Vite** — Build tool and dev server
- **LocalStorage** — Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Tooling

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Root component with React Router setup
├── index.css               # Global styles
├── components/
│   ├── Layout.jsx          # Shared layout (sidebar, header)
│   ├── Modal.jsx           # Reusable modal component
│   └── Toast.jsx           # Toast notification system
├── pages/
│   ├── Dashboard.jsx       # Project Dashboard page (/)
│   ├── Assets.jsx          # Asset Manager page (/assets)
│   ├── Builds.jsx          # Build Pipeline page (/builds)
│   ├── Team.jsx            # Team Management page (/team)
│   ├── Events.jsx          # Events Schedule page (/events)
│   └── Analytics.jsx       # Analytics & KPIs page (/analytics)
└── services/
    └── DataService.js      # LocalStorage data service layer
```

## Usage Guide

### Adding New Items

Each page has an "Add" button in the top-right corner:

1. **Add Project**: Click "+ Add Project" on the Dashboard page
2. **Add Asset**: Click "+ Add Asset" on the Assets page
3. **Add Build**: Click "+ Add Build" on the Builds page
4. **Add Team Member**: Click "+ Add Member" on the Team page
5. **Add Event**: Click "+ Add Event" on the Events page
6. **Add KPI**: Click "+ Add KPI" on the Analytics page

### Editing Items

Each item card or row has an edit button (✏️):
- Click the edit icon
- Update the information in the modal form
- Changes are automatically saved

### Deleting Items

Each item has a delete button (🗑️):
- Click the delete icon
- Confirm the deletion
- The item is permanently removed

### Searching and Filtering

**Asset Search**: Use the search bar on the Assets page to find assets by name or author.

**Asset Type Filter**: Click on type tags (All, 3D Models, Textures, etc.) to filter assets by category.

### Data Management

Access data management controls in the top header:

- **💾 Export**: Download all your data as a JSON file for backup or migration
- **�� Import**: Upload a previously exported JSON file to restore data
- **🔄 Reset**: Clear all data and restore the default example dataset

## Customization

### Modifying Default Data

Edit the `getDefault*()` methods in `src/services/DataService.js` to change the initial example data.

### Styling

Edit `src/index.css` to customize colors, fonts, and layout. Key CSS variables are defined in the `:root` selector:

```css
:root {
  --blue-dark: #0a2463;
  --green-primary: #00c9a7;
  --bg-body: #060e24;
  --text-primary: #eef0ff;
  /* ... more variables */
}
```

## Deployment

### Static Hosting

Build the project and deploy the `dist` folder to any static hosting service:

```bash
npm run build
```

- **GitHub Pages**: Push the `dist` folder or use a CI/CD pipeline
- **Netlify**: Connect to Git and set build command to `npm run build`
- **Vercel**: Import the project and deploy
- **AWS S3**: Upload `dist` files to an S3 bucket with static hosting enabled

### No Backend Required

This application runs entirely in the browser with no server-side dependencies. All data is stored locally using browser LocalStorage.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

LocalStorage must be enabled in your browser.

## License

This project is open source and available for use and modification.

## Support

For issues, questions, or contributions, please open an issue in the repository.
