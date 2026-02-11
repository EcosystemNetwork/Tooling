# Dev Tools Control Center (DTCC)

A comprehensive web-based dashboard application for managing development projects, assets, team members, and events. This application features persistent data storage using LocalStorage, allowing you to enter and manage real data.

## Features

### 📊 Project Dashboard
- View and manage multiple development projects
- Track project status, team size, and completion percentage
- Add, edit, and delete projects
- Monitor last updated dates

### 🎨 Asset Manager
- Organize and categorize development assets (3D Models, Textures, Audio, Animations, UI Elements)
- Search and filter assets by type
- Track asset metadata including size and author
- Add, edit, and delete assets

### 🚀 Build & Deploy Pipeline
- Monitor build and deployment status
- Track build duration and triggered by information
- View build history with timestamps
- Add, edit, and delete build entries

### 👥 Team Management
- Manage team members and their roles (Admin, Developer, Artist, QA, Viewer)
- Track member status and last login times
- Add, edit, and delete team members
- Assign role-based permissions

### 📅 Events Schedule
- Schedule and track live operations and events
- Categorize events by type (Seasonal, Update, Tournament, Hotfix)
- Monitor event status (Upcoming, Live, Ended)
- Add, edit, and delete events

### 📈 Analytics & KPIs
- View key performance indicators
- Track metrics with trend indicators
- Monitor daily active users, revenue, retention rate, and more
- Add, edit, and delete KPI entries

### 💾 Data Management
- **Persistent Storage**: All data is automatically saved to browser LocalStorage
- **Export Data**: Download all your data as a JSON file
- **Import Data**: Upload a JSON file to restore or migrate data
- **Reset**: Clear all data and restore default examples

## Getting Started

### Installation

1. Clone or download this repository
2. No build process or dependencies required - it's a standalone HTML/CSS/JS application

### Running the Application

Simply open `index.html` in a modern web browser:

```bash
# Using a local server (recommended)
python -m http.server 8000
# or
npx serve

# Then navigate to http://localhost:8000
```

Or directly open the file:
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## Usage Guide

### Adding New Items

Each section has an "Add" button in the top-right corner:

1. **Add Project**: Click "+ Add Project" in the Dashboard section
2. **Add Asset**: Click "+ Add Asset" in the Asset Manager section
3. **Add Build**: Click "+ Add Build" in the Build Pipeline section
4. **Add Team Member**: Click "+ Add Member" in the Team section
5. **Add Event**: Click "+ Add Event" in the Events section
6. **Add KPI**: Click "+ Add KPI" in the Analytics section

Follow the prompts to enter the required information.

### Editing Items

Each item card or row has an edit button (✏️):
- Click the edit icon
- Update the information in the prompts
- Changes are automatically saved

### Deleting Items

Each item has a delete button (🗑️):
- Click the delete icon
- Confirm the deletion
- The item is permanently removed

### Searching and Filtering

**Asset Search**: Use the search bar in the Asset Manager to find assets by name or author.

**Asset Type Filter**: Click on type tags (All, 3D Models, Textures, etc.) to filter assets by category.

### Data Management

Access data management controls in the top header:

- **💾 Export**: Download all your data as a JSON file for backup or migration
- **📥 Import**: Upload a previously exported JSON file to restore data
- **🔄 Reset**: Clear all data and restore the default example dataset

## Data Structure

All data is stored in browser LocalStorage with the following keys:

```javascript
{
  "projects": [...],      // Project entries
  "assets": [...],        // Asset entries
  "builds": [...],        // Build history
  "teamMembers": [...],   // Team member profiles
  "events": [...],        // Event schedules
  "kpis": [...]          // KPI metrics
}
```

### Example Data Format

**Project**:
```json
{
  "id": 1,
  "name": "Nebula Frontier",
  "status": "Active",
  "teamSize": 24,
  "lastUpdated": "2026-02-10",
  "completion": 78
}
```

**Asset**:
```json
{
  "id": 1,
  "name": "Spaceship Hull",
  "type": "3D Models",
  "size": "14.2 MB",
  "author": "J. Park",
  "color": "#1e88e5"
}
```

**Team Member**:
```json
{
  "id": 1,
  "name": "Jordan Park",
  "email": "j.park@studio.io",
  "role": "Admin",
  "status": "Active",
  "lastLogin": "2026-02-10 14:00",
  "color": "#1e88e5"
}
```

**Event**:
```json
{
  "id": 1,
  "name": "Winter Clash 2026",
  "game": "Shadowkeep Arena",
  "start": "2026-02-15",
  "end": "2026-03-15",
  "status": "Upcoming",
  "type": "Seasonal"
}
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

LocalStorage must be enabled in your browser.

## Data Persistence

- Data is stored locally in your browser using LocalStorage
- Data persists across browser sessions
- Data is specific to the domain/origin
- Maximum storage: ~5-10MB (browser dependent)
- Clearing browser data will delete stored information (use Export feature for backups)

## Customization

### Modifying Default Data

Edit the `getDefault*()` methods in `app.js` to change the initial example data:
- `getDefaultProjects()`
- `getDefaultAssets()`
- `getDefaultBuilds()`
- `getDefaultTeamMembers()`
- `getDefaultEvents()`
- `getDefaultKPIs()`

### Styling

Edit `styles.css` to customize colors, fonts, and layout. Key CSS variables are defined in the `:root` selector:

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

Deploy to any static hosting service:

- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Import the project and deploy
- **AWS S3**: Upload files to an S3 bucket with static hosting enabled

### No Backend Required

This application runs entirely in the browser with no server-side dependencies. All data is stored locally using browser LocalStorage.

## Limitations

- Data is stored locally per browser/device
- No multi-user collaboration (single-user application)
- No real-time sync across devices
- Storage limited to browser's LocalStorage capacity (~5-10MB)
- No authentication or user management

## Future Enhancements

To make this a production-ready application with real data sharing:

1. **Backend API**: Add a Node.js/Express backend with database (PostgreSQL, MongoDB)
2. **Authentication**: Implement user login and authentication
3. **Real-time Sync**: Add WebSocket support for live updates
4. **File Uploads**: Support actual file uploads for assets
5. **Multi-user**: Add collaboration features and permissions
6. **Cloud Storage**: Store assets in cloud storage (AWS S3, Azure Blob)
7. **Advanced Analytics**: Integrate with analytics platforms
8. **API Integration**: Connect to CI/CD tools, project management systems

## License

This project is open source and available for use and modification.

## Support

For issues, questions, or contributions, please open an issue in the repository.
