# Todo List Application - Local Storage

A modern, fully-functional todo list web application with **local storage** functionality. Your tasks persist across browser sessions automatically!

## 🎯 Features

✅ **Add Tasks** - Create new tasks with Enter key support  
✅ **Mark Complete** - Check off completed tasks  
✅ **Delete Tasks** - Remove individual tasks  
✅ **Filter Tasks** - View All, Active, or Completed tasks  
✅ **Statistics** - Real-time counter for total, completed, and active tasks  
✅ **Local Storage** - Tasks automatically saved to browser storage  
✅ **Clear Completed** - Bulk delete all completed tasks  
✅ **Delete All** - Clear all tasks with confirmation  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Beautiful UI** - Gradient background with smooth animations  

## 📁 Project Structure

```
todo-app/
├── index.html       (HTML structure)
├── styles.css       (Styling and animations)
├── script.js        (Logic and local storage)
└── README.md        (This file)
```

## 🚀 Quick Start

### Method 1: Direct File Access
1. Clone the repository:
   ```bash
   git clone https://github.com/santykendre-rgb/file-upload-download-api.git
   cd file-upload-download-api/todo-app
   ```

2. Open `index.html` in your browser:
   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Then visit: http://localhost:8000/todo-app/
```

## 💾 How Local Storage Works

- **Automatic Save**: Every task action (add, delete, complete) automatically saves to browser storage
- **Browser Storage**: Data is stored locally on your computer, not on any server
- **Privacy**: Your tasks never leave your device
- **Persistence**: Tasks remain even after:
  - Closing the browser tab
  - Closing the entire browser
  - Restarting your computer
- **Per-Browser Storage**: Each browser/device has its own separate task list
- **Clear Cache Warning**: Clearing browser cache/cookies will delete stored tasks

## 🎮 How to Use

### Adding Tasks
1. Type your task in the input field
2. Press **Enter** or click **"Add Task"** button
3. Task appears in the list below

### Managing Tasks
| Action | How to Do It |
|--------|-------------|
| **Mark Complete** | Click the checkbox next to the task |
| **Delete Task** | Click the "Delete" button on the task |
| **View by Status** | Click "All", "Active", or "Completed" filter |
| **Clear Completed** | Click "Clear Completed" button |
| **Delete All** | Click "Delete All" button (requires confirmation) |

### Viewing Statistics
The statistics panel shows:
- **Total** - Total number of tasks
- **Completed** - Number of completed tasks
- **Active** - Number of incomplete tasks

## 🎨 Features in Detail

### Local Storage
```javascript
// Tasks are saved automatically using browser's localStorage API
localStorage.setItem('todoTasks', JSON.stringify(tasks));

// Tasks are loaded when the page loads
const tasks = JSON.parse(localStorage.getItem('todoTasks'));
```

### Filtering
- **All**: Show all tasks
- **Active**: Show only incomplete tasks
- **Completed**: Show only completed tasks

### Data Structure
Each task is stored as an object:
```javascript
{
  id: 1234567890,          // Unique identifier (timestamp)
  text: "Buy groceries",   // Task description
  completed: false,        // Completion status
  createdAt: "5/17/2026"   // Creation timestamp
}
```

## 📱 Responsive Design

The application is fully responsive:
- **Desktop (1024px+)**: Full layout with all features
- **Tablet (600px-1024px)**: Adjusted spacing and sizing
- **Mobile (<600px)**: Optimized touch interface

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - No external dependencies
- **LocalStorage API** - Browser's native storage mechanism

### Browser Compatibility
Works on all modern browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### File Size
- `index.html` - ~2.5 KB
- `styles.css` - ~8 KB
- `script.js` - ~5.5 KB
- **Total**: ~16 KB

## 🛡️ Data Security

- **Local Storage Only**: No data is sent to any server
- **Encryption**: Tasks are stored as plain JSON (no encryption, but no transmission)
- **Privacy**: Only accessible from the same browser on the same device
- **Third-Party**: No external libraries or APIs

## 🧹 Clearing Your Data

### Clear Individual Tasks
1. Click the "Delete" button next to any task

### Clear Completed Tasks
1. Click "Clear Completed" button (only deletes checked tasks)

### Clear All Tasks
1. Click "Delete All" button
2. Confirm in the popup dialog

### Clear Browser Storage
1. Open Developer Tools (F12)
2. Go to **Application** → **Local Storage**
3. Find and delete the entry
4. Or clear browser cache/data

## 🎨 Customization

### Change Colors
Edit the CSS gradients in `styles.css`:
```css
/* Change the main gradient color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Font
Update the font-family in `styles.css`:
```css
font-family: 'Your Font', sans-serif;
```

### Adjust Max File Size
Edit the task text validation in `script.js`:
```javascript
if (text.length > 200) {  // Change 200 to your desired limit
    alert('Task is too long!');
}
```

## 🚀 Future Enhancements

- 📅 Due dates for tasks
- 🏷️ Categories/tags
- 🔔 Notifications
- 📤 Export/Import functionality
- 🌙 Dark mode
- 🔐 Password protection
- ☁️ Cloud sync (optional)
- 📱 PWA (Progressive Web App)
- 🎯 Priority levels
- ⏰ Time-based reminders

## 📝 Example Usage

```
1. Open the app
2. Add tasks: "Buy milk", "Finish project", "Call mom"
3. Check off "Buy milk" as completed
4. Filter to see only "Active" tasks
5. Close the browser
6. Reopen the page → All tasks are still there!
```

## ⚠️ Important Notes

- **Local Storage Limit**: Most browsers allow 5-10MB per domain
- **Device-Specific**: Tasks are stored locally on each device
- **Browser-Specific**: Each browser has its own storage
- **Private Browsing**: Incognito mode may not persist storage

## 🤝 Contributing

Feel free to fork and improve this project! Suggestions welcome.

## 📄 License

MIT License - Feel free to use this for personal or commercial projects.

## 💡 Tips & Tricks

1. **Keyboard Shortcuts**: Press Enter to add tasks quickly
2. **Task Organization**: Use naming conventions like "WORK: ", "HOME: "
3. **Filtering**: Use filters to focus on specific task types
4. **Statistics**: Check statistics to track your productivity
5. **Backup**: Periodically take screenshots or export your tasks

---

**Built with ❤️ using HTML, CSS, and JavaScript**

Enjoy organizing your tasks! 📝✨
