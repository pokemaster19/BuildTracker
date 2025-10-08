// Construction Defects Management System - Main Application Logic

// Application data from provided JSON
const appData = {
  "defects": [
    {
      "id": 1,
      "title": "Трещина в стене",
      "description": "Обнаружена трещина в несущей стене на 3 этаже",
      "status": "new",
      "priority": "high",
      "category": "structures",
      "assignee": "Иван Петров",
      "createdAt": "2025-09-28",
      "updatedAt": "2025-09-28",
      "photos": ["crack1.jpg", "crack2.jpg"],
      "location": "Блок А, 3 этаж, кв. 15"
    },
    {
      "id": 2,
      "title": "Протечка в ванной",
      "description": "Протекает водопроводная труба под ванной",
      "status": "in_progress",
      "priority": "medium",
      "category": "plumbing",
      "assignee": "Сергей Сидоров",
      "createdAt": "2025-09-25",
      "updatedAt": "2025-09-27",
      "photos": ["leak1.jpg"],
      "location": "Блок Б, 2 этаж, кв. 8"
    },
    {
      "id": 3,
      "title": "Неработающая розетка",
      "description": "В спальне не работает розетка возле окна",
      "status": "completed",
      "priority": "low",
      "category": "electrical",
      "assignee": "Михаил Волков",
      "createdAt": "2025-09-20",
      "updatedAt": "2025-09-26",
      "photos": [],
      "location": "Блок А, 1 этаж, кв. 3"
    },
    {
      "id": 4,
      "title": "Сколы на плитке",
      "description": "Множественные сколы на плитке в прихожей",
      "status": "rejected",
      "priority": "medium",
      "category": "finishing",
      "assignee": "Андрей Козлов",
      "createdAt": "2025-09-22",
      "updatedAt": "2025-09-24",
      "photos": ["chips1.jpg", "chips2.jpg", "chips3.jpg"],
      "location": "Блок В, 4 этаж, кв. 20"
    },
    {
      "id": 5,
      "title": "Проблемы с вентиляцией",
      "description": "Слабая тяга в вентиляционной системе кухни",
      "status": "new",
      "priority": "critical",
      "category": "hvac",
      "assignee": "Дмитрий Новиков",
      "createdAt": "2025-09-29",
      "updatedAt": "2025-09-29",
      "photos": ["vent1.jpg"],
      "location": "Блок А, 5 этаж, кв. 25"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Иван Петров",
      "role": "Инженер-конструктор",
      "avatar": "avatar1.jpg",
      "email": "i.petrov@company.com",
      "phone": "+7 (999) 123-45-67"
    },
    {
      "id": 2,
      "name": "Сергей Сидоров", 
      "role": "Сантехник",
      "avatar": "avatar2.jpg",
      "email": "s.sidorov@company.com",
      "phone": "+7 (999) 234-56-78"
    },
    {
      "id": 3,
      "name": "Михаил Волков",
      "role": "Электрик",
      "avatar": "avatar3.jpg", 
      "email": "m.volkov@company.com",
      "phone": "+7 (999) 345-67-89"
    },
    {
      "id": 4,
      "name": "Андрей Козлов",
      "role": "Отделочник",
      "avatar": "avatar4.jpg",
      "email": "a.kozlov@company.com", 
      "phone": "+7 (999) 456-78-90"
    },
    {
      "id": 5,
      "name": "Дмитрий Новиков",
      "role": "Специалист по вентиляции",
      "avatar": "avatar5.jpg",
      "email": "d.novikov@company.com",
      "phone": "+7 (999) 567-89-01"
    }
  ],
  "statistics": {
    "totalDefects": 5,
    "newDefects": 2,
    "inProgress": 1, 
    "completed": 1,
    "rejected": 1,
    "highPriority": 1,
    "mediumPriority": 2,
    "lowPriority": 1,
    "criticalPriority": 1,
    "byCategory": {
      "structures": 1,
      "plumbing": 1, 
      "electrical": 1,
      "finishing": 1,
      "hvac": 1
    },
    "monthlyTrend": [
      {"month": "Май", "defects": 12},
      {"month": "Июнь", "defects": 8}, 
      {"month": "Июль", "defects": 15},
      {"month": "Август", "defects": 6},
      {"month": "Сентябрь", "defects": 5}
    ]
  },
  "categories": [
    {"id": "structures", "name": "Конструкции", "color": "#EF4444"},
    {"id": "plumbing", "name": "Сантехника", "color": "#3B82F6"},
    {"id": "electrical", "name": "Электрика", "color": "#F59E0B"}, 
    {"id": "finishing", "name": "Отделка", "color": "#10B981"},
    {"id": "hvac", "name": "Вентиляция", "color": "#8B5CF6"}
  ],
  "priorities": [
    {"id": "low", "name": "Низкий", "color": "#6B7280"},
    {"id": "medium", "name": "Средний", "color": "#F59E0B"},
    {"id": "high", "name": "Высокий", "color": "#EF4444"}, 
    {"id": "critical", "name": "Критический", "color": "#DC2626"}
  ],
  "statuses": [
    {"id": "new", "name": "Новый", "color": "#3B82F6"},
    {"id": "in_progress", "name": "В работе", "color": "#F59E0B"},
    {"id": "completed", "name": "Завершен", "color": "#10B981"},
    {"id": "rejected", "name": "Отклонен", "color": "#6B7280"}
  ]
};

// Global state
let currentPage = 'dashboard';
let filteredDefects = [...appData.defects];
let charts = {};

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeToggleIcon();
    this.updateThemeOptions();
  }

  updateThemeToggleIcon() {
    const lightIcon = document.querySelector('.theme-icon--light');
    const darkIcon = document.querySelector('.theme-icon--dark');
    
    if (this.currentTheme === 'dark') {
      lightIcon?.classList.add('hidden');
      darkIcon?.classList.remove('hidden');
    } else {
      lightIcon?.classList.remove('hidden');
      darkIcon?.classList.add('hidden');
    }
  }

  updateThemeOptions() {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      const theme = option.dataset.theme;
      if (theme === this.currentTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  bindEvents() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        this.setTheme(option.dataset.theme);
      });
    });
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.showPage('dashboard');
  }

  bindEvents() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.showPage(page);
      });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar--open');
      });

      // Close sidebar when clicking outside
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.remove('sidebar--open');
        }
      });
    }
  }

  showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      currentPage = pageName;
    }

    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.dataset.page === pageName) {
        item.classList.add('nav-item--active');
      } else {
        item.classList.remove('nav-item--active');
      }
    });

    // Initialize page-specific content
    this.initializePage(pageName);
  }

  initializePage(pageName) {
    switch (pageName) {
      case 'dashboard':
        this.initDashboard();
        break;
      case 'defects':
        this.initDefects();
        break;
      case 'reports':
        this.initReports();
        break;
      case 'settings':
        this.initSettings();
        break;
    }
  }

  initDashboard() {
    updateStatistics();
    renderRecentDefects();
    createCharts();
  }

  initDefects() {
    renderDefectsGrid();
    bindDefectsFilters();
  }

  initReports() {
    createReportCharts();
  }

  initSettings() {
    // Settings initialization is handled by ThemeManager
  }
}

// Statistics Management
function updateStatistics() {
  const stats = appData.statistics;
  
  document.getElementById('totalDefects').textContent = stats.totalDefects;
  document.getElementById('newDefects').textContent = stats.newDefects;
  document.getElementById('inProgressDefects').textContent = stats.inProgress;
  document.getElementById('completedDefects').textContent = stats.completed;
}

// Charts Management
function createCharts() {
  createStatusChart();
  createTrendChart();
}

function createStatusChart() {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;

  const stats = appData.statistics;
  const data = {
    labels: ['Новые', 'В работе', 'Завершены', 'Отклонены'],
    datasets: [{
      data: [stats.newDefects, stats.inProgress, stats.completed, stats.rejected],
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  if (charts.statusChart) {
    charts.statusChart.destroy();
  }

  charts.statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

function createTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;

  const trendData = appData.statistics.monthlyTrend;
  
  const data = {
    labels: trendData.map(item => item.month),
    datasets: [{
      label: 'Дефекты',
      data: trendData.map(item => item.defects),
      borderColor: '#1FB8CD',
      backgroundColor: 'rgba(31, 184, 205, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  if (charts.trendChart) {
    charts.trendChart.destroy();
  }

  charts.trendChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  });
}

function createReportCharts() {
  createCategoryChart();
  createPriorityChart();
}

function createCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  const categoryData = appData.statistics.byCategory;
  const categories = appData.categories;
  
  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [{
      data: categories.map(cat => categoryData[cat.id] || 0),
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
      borderWidth: 0
    }]
  };

  if (charts.categoryChart) {
    charts.categoryChart.destroy();
  }

  charts.categoryChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

function createPriorityChart() {
  const ctx = document.getElementById('priorityChart');
  if (!ctx) return;

  const stats = appData.statistics;
  
  const data = {
    labels: ['Низкий', 'Средний', 'Высокий', 'Критический'],
    datasets: [{
      data: [stats.lowPriority, stats.mediumPriority, stats.highPriority, stats.criticalPriority],
      backgroundColor: ['#DB4545', '#D2BA4C', '#964325', '#944454'],
      borderWidth: 0
    }]
  };

  if (charts.priorityChart) {
    charts.priorityChart.destroy();
  }

  charts.priorityChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

// Recent Defects Table
function renderRecentDefects() {
  const container = document.getElementById('recentDefectsTable');
  if (!container) return;

  const recentDefects = appData.defects.slice(0, 5);
  
  const table = `
    <table class="table">
      <thead class="table__header">
        <tr>
          <th>Дефект</th>
          <th>Статус</th>
          <th>Приоритет</th>
          <th>Исполнитель</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody class="table__body">
        ${recentDefects.map(defect => `
          <tr>
            <td>
              <div class="defect-title">${defect.title}</div>
              <div class="defect-description">${defect.description}</div>
            </td>
            <td>
              <span class="status-badge status-badge--${defect.status}">
                ${getStatusName(defect.status)}
              </span>
            </td>
            <td>
              <span class="priority-badge priority-badge--${defect.priority}">
                ${getPriorityName(defect.priority)}
              </span>
            </td>
            <td>
              <div class="defect-assignee">${defect.assignee}</div>
              <div class="defect-location">${defect.location}</div>
            </td>
            <td>${formatDate(defect.createdAt)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = table;
}

// Defects Grid
function renderDefectsGrid() {
  const container = document.getElementById('defectsGrid');
  if (!container) return;

  const defectsHTML = filteredDefects.map(defect => `
    <div class="defect-card">
      <div class="defect-card__header">
        <div>
          <h3 class="defect-card__title">${defect.title}</h3>
          <span class="defect-card__id">#${defect.id}</span>
        </div>
      </div>
      
      <p class="defect-card__description">${defect.description}</p>
      
      <div class="defect-card__meta">
        <span class="status-badge status-badge--${defect.status}">
          ${getStatusName(defect.status)}
        </span>
        <span class="priority-badge priority-badge--${defect.priority}">
          ${getPriorityName(defect.priority)}
        </span>
      </div>
      
      <div class="defect-card__footer">
        <div class="defect-assignee-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          ${defect.assignee}
        </div>
        <div class="defect-location-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${defect.location}
        </div>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = defectsHTML;
}

// Filters
function bindDefectsFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('defectsSearch');

  [statusFilter, priorityFilter, categoryFilter, searchInput].forEach(element => {
    if (element) {
      element.addEventListener('input', filterDefects);
    }
  });
}

function filterDefects() {
  const statusFilter = document.getElementById('statusFilter')?.value || '';
  const priorityFilter = document.getElementById('priorityFilter')?.value || '';
  const categoryFilter = document.getElementById('categoryFilter')?.value || '';
  const searchQuery = document.getElementById('defectsSearch')?.value.toLowerCase() || '';

  filteredDefects = appData.defects.filter(defect => {
    const matchesStatus = !statusFilter || defect.status === statusFilter;
    const matchesPriority = !priorityFilter || defect.priority === priorityFilter;
    const matchesCategory = !categoryFilter || defect.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      defect.title.toLowerCase().includes(searchQuery) ||
      defect.description.toLowerCase().includes(searchQuery);

    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  renderDefectsGrid();
}

// Modal Management
function showAddDefectModal() {
  const modal = document.getElementById('addDefectModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function hideAddDefectModal() {
  const modal = document.getElementById('addDefectModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('addDefectForm').reset();
  }
}

// Form Management
function bindFormEvents() {
  const form = document.getElementById('addDefectForm');
  if (form) {
    form.addEventListener('submit', handleAddDefect);
  }

  // File upload
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = fileUpload?.querySelector('.file-upload__input');
  const fileZone = fileUpload?.querySelector('.file-upload__zone');

  if (fileInput && fileZone) {
    fileZone.addEventListener('click', () => fileInput.click());
    
    fileZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileZone.classList.add('file-upload__zone--dragover');
    });
    
    fileZone.addEventListener('dragleave', () => {
      fileZone.classList.remove('file-upload__zone--dragover');
    });
    
    fileZone.addEventListener('drop', (e) => {
      e.preventDefault();
      fileZone.classList.remove('file-upload__zone--dragover');
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    });
    
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    });
  }
}

function handleAddDefect(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const newDefect = {
    id: appData.defects.length + 1,
    title: formData.get('title'),
    description: formData.get('description'),
    status: 'new',
    priority: formData.get('priority'),
    category: formData.get('category'),
    assignee: formData.get('assignee') || 'Не назначен',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    photos: [],
    location: formData.get('location') || ''
  };

  // Add to data
  appData.defects.unshift(newDefect);
  appData.statistics.totalDefects++;
  appData.statistics.newDefects++;

  // Update UI
  hideAddDefectModal();
  showToast('Дефект успешно создан', 'Новый дефект добавлен в систему', 'success');
  
  // Refresh current page data
  if (currentPage === 'dashboard') {
    updateStatistics();
    renderRecentDefects();
  } else if (currentPage === 'defects') {
    filterDefects();
  }
}

function handleFileUpload(files) {
  const validFiles = files.filter(file => {
    return file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024; // 5MB
  });

  if (validFiles.length > 0) {
    showToast('Файлы загружены', `Загружено ${validFiles.length} файл(ов)`, 'success');
  }

  if (validFiles.length < files.length) {
    showToast('Некоторые файлы отклонены', 'Проверьте формат и размер файлов', 'error');
  }
}

// Toast Notifications
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toastId = Date.now();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__content">
      <h4 class="toast__title">${title}</h4>
      <p class="toast__message">${message}</p>
    </div>
    <button class="toast__close" onclick="hideToast(${toastId})">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  
  toast.dataset.toastId = toastId;
  container.appendChild(toast);

  // Auto-hide after 5 seconds
  setTimeout(() => hideToast(toastId), 5000);
}

function hideToast(toastId) {
  const toast = document.querySelector(`[data-toast-id="${toastId}"]`);
  if (toast) {
    toast.remove();
  }
}

// Utility Functions
function getStatusName(statusId) {
  const status = appData.statuses.find(s => s.id === statusId);
  return status ? status.name : statusId;
}

function getPriorityName(priorityId) {
  const priority = appData.priorities.find(p => p.id === priorityId);
  return priority ? priority.name : priorityId;
}

function getCategoryName(categoryId) {
  const category = appData.categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Global functions for HTML onclick handlers
window.showPage = function(pageName) {
  navManager.showPage(pageName);
};

window.showAddDefectModal = showAddDefectModal;
window.hideAddDefectModal = hideAddDefectModal;
window.hideToast = hideToast;

// Search functionality
function bindGlobalSearch() {
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length > 2) {
        const results = appData.defects.filter(defect =>
          defect.title.toLowerCase().includes(query) ||
          defect.description.toLowerCase().includes(query)
        );
        
        if (results.length > 0 && currentPage !== 'defects') {
          showToast('Результаты поиска', `Найдено ${results.length} дефект(ов)`, 'info');
        }
      }
    });
  }
}

// Keyboard shortcuts
function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('.modal:not(.hidden)');
      if (visibleModal) {
        hideAddDefectModal();
      }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('globalSearch');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}

// Responsive behavior
function handleResize() {
  // Redraw charts on resize
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.resize === 'function') {
      chart.resize();
    }
  });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  const themeManager = new ThemeManager();
  const navManager = new NavigationManager();
  window.navManager = navManager; // Make it globally accessible

  // Bind events
  bindFormEvents();
  bindGlobalSearch();
  bindKeyboardShortcuts();
  
  // Handle resize
  window.addEventListener('resize', debounce(handleResize, 250));
  
  // Initialize with dashboard
  navManager.showPage('dashboard');
  
  // Show welcome message
  setTimeout(() => {
    showToast('Добро пожаловать!', 'Система управления дефектами готова к работе', 'success');
  }, 1000);
});

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance monitoring
if (typeof performance !== 'undefined') {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Приложение загружено за ${loadTime.toFixed(2)}мс`);
  });
}