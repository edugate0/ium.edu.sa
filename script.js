// Student data
const studentData = {
    studentId: '202401001',
    password: '1034612992',
    name: 'حصة مسحل فواز العتيبي',
    nationalId: '1034612992',
    phone: '0550664728',
    college: 'كلية الشريعة',
    major: 'الشريعة',
    level: 'الأول',
    semester: 'الأول 1447هـ',
    gpa: null, // New student
    registeredHours: 18,
    maxHours: 21,
    fees: 750
};

// Navigation functions
function goToLogin() {
    window.location.href = 'login.html';
}

function goToPage(page) {
    window.location.href = page;
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function logout() {
    // Clear any stored session data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Password toggle function
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '<i class="icon"></i>';
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '<i class="icon"></i>';
    }
}

// Login form handling
function handleLogin(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Show loading state
    const submitBtn = document.querySelector('.login-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>جاري تسجيل الدخول...</span>';
    submitBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        // Validate credentials
        if (studentId === studentData.studentId && password === studentData.password) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(studentData));
            
            // Show success message
            showMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showMessage('الرقم الجامعي أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.', 'error');
        }
    }, 1000);
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages that require authentication
    const protectedPages = ['dashboard.html', 'courses.html', 'personal_info.html', 
                           'schedule.html', 'grades.html', 'study_plan.html', 'financial.html'];
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Show message function
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            messageDiv.style.background = '#10b981';
            break;
        case 'error':
            messageDiv.style.background = '#ef4444';
            break;
        case 'warning':
            messageDiv.style.background = '#f59e0b';
            break;
        default:
            messageDiv.style.background = '#3b82f6';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Course registration functions
function registerCourse(courseCode) {
    showMessage(`تم تسجيل مقرر ${courseCode} بنجاح`, 'success');
    // Here you would typically update the UI to reflect the change
}

function dropCourse(courseCode) {
    if (confirm(`هل أنت متأكد من حذف مقرر ${courseCode}؟`)) {
        showMessage(`تم حذف مقرر ${courseCode} بنجاح`, 'success');
        // Here you would typically update the UI to reflect the change
    }
}

// Save changes function
function saveChanges() {
    showMessage('تم حفظ التغييرات بنجاح', 'success');
}

// Print function
function printSchedule() {
    window.print();
}

// Update personal info function
function updatePersonalInfo() {
    showMessage('تم تحديث البيانات الشخصية بنجاح', 'success');
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Initialize page based on current page
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check authentication for protected pages
    if (!checkAuth()) {
        return;
    }
    
    // Page-specific initialization
    switch(currentPage) {
        case 'login.html':
            initializeLoginPage();
            break;
        case 'dashboard.html':
            initializeDashboard();
            break;
        case 'courses.html':
            initializeCoursesPage();
            break;
        case 'personal_info.html':
            initializePersonalInfoPage();
            break;
        case 'schedule.html':
            initializeSchedulePage();
            break;
        case 'grades.html':
            initializeGradesPage();
            break;
        case 'study_plan.html':
            initializeStudyPlanPage();
            break;
        case 'financial.html':
            initializeFinancialPage();
            break;
        default:
            initializeHomePage();
    }
}

function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function initializeDashboard() {
    // Load user data and update dashboard
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Update user info in header if elements exist
    const userNameElement = document.querySelector('.user-name');
    const userIdElement = document.querySelector('.user-id');
    
    if (userNameElement) userNameElement.textContent = userData.name || 'الطالب';
    if (userIdElement) userIdElement.textContent = userData.studentId || '';
    
    // Update dashboard stats
    const registeredHoursElement = document.getElementById('registeredHours');
    const studentLevelElement = document.getElementById('studentLevel');
    const currentSemesterElement = document.getElementById('currentSemester');
    const remainingFeesElement = document.getElementById('remainingFees');
    
    if (registeredHoursElement) registeredHoursElement.textContent = userData.registeredHours || '0';
    if (studentLevelElement) studentLevelElement.textContent = userData.level || 'غير محدد';
    if (currentSemesterElement) currentSemesterElement.textContent = userData.semester || 'غير محدد';
    if (remainingFeesElement) remainingFeesElement.textContent = userData.fees || '0';
    
    // Update student ID card
    const cardNameElement = document.getElementById('card-name');
    const cardStudentIdElement = document.getElementById('card-studentId');
    const cardMajorElement = document.getElementById('card-major');
    const cardCollegeElement = document.getElementById('card-college');
    
    if (cardNameElement) cardNameElement.textContent = userData.name || '';
    if (cardStudentIdElement) cardStudentIdElement.textContent = userData.studentId || '';
    if (cardMajorElement) cardMajorElement.textContent = userData.major || '';
    if (cardCollegeElement) cardCollegeElement.textContent = userData.college || '';
}

function initializeCoursesPage() {
    // Add event listeners for course registration buttons
    const registerButtons = document.querySelectorAll('.btn-primary.btn-sm');
    const dropButtons = document.querySelectorAll('.btn-danger.btn-sm');
    
    registerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseCode = e.target.closest('.table-row').querySelector('.col').textContent;
            registerCourse(courseCode);
        });
    });
    
    dropButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseCode = e.target.closest('.table-row').querySelector('.col').textContent;
            dropCourse(courseCode);
        });
    });
}

function initializePersonalInfoPage() {
    // Initialize personal info form if it exists
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updatePersonalInfo();
        });
    }
}

function initializeSchedulePage() {
    // Initialize schedule page
    console.log('Schedule page initialized');
}

function initializeGradesPage() {
    // Initialize grades page
    console.log('Grades page initialized');
}

function initializeStudyPlanPage() {
    // Initialize study plan page
    console.log('Study plan page initialized');
}

function initializeFinancialPage() {
    // Initialize financial page
    console.log('Financial page initialized');
}

function initializeHomePage() {
    // Initialize home page
    console.log('Home page initialized');
}

// Responsive table handling
function makeTablesResponsive() {
    const tables = document.querySelectorAll('.courses-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('.table-header .col');
        const rows = table.querySelectorAll('.table-row');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('.col');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index].textContent);
                }
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    makeTablesResponsive();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle window resize for responsive features
window.addEventListener('resize', function() {
    makeTablesResponsive();
});

// Service worker registration (if needed for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

