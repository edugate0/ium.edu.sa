// Sample student data (in real application, this would come from a database)
const studentData = {
    "1034612992": {
        name: "حصة مسحل فواز العتيبي",
        nationalId: "1034612992",
        mobile: "0550664728",
        major: "شريعة",
        degree: "بكالوريوس",
        college: "كلية الشريعة",
        status: "مقبولة",
        fees: 750,
        referenceNumber: "IUM-2025-001234"
    }
};

// Current student data
let currentStudent = null;

// Show inquiry form (initial step)
function showInquiryForm() {
    hideAllForms();
    document.getElementById('inquiryForm').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check admission status
function checkAdmission(event) {
    event.preventDefault();
    
    const nationalId = document.getElementById('nationalId').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    
    // Validate input
    if (!nationalId || !mobile) {
        alert('يرجى إدخال جميع البيانات المطلوبة');
        return;
    }
    
    // Check if student exists
    const student = studentData[nationalId];
    
    if (student && student.mobile === mobile) {
        currentStudent = student;
        showAdmissionResult(student);
    } else {
        alert('عذراً، لم يتم العثور على بيانات مطابقة. يرجى التأكد من صحة البيانات المدخلة.');
    }
}

// Show admission result
function showAdmissionResult(student) {
    hideAllForms();
    
    // Update student information in the result
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentId').textContent = student.nationalId;
    document.getElementById('studentMajor').textContent = student.major;
    
    document.getElementById('admissionResult').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Confirm admission (simplified - no login required)
function confirmAdmission() {
    if (!currentStudent) {
        alert('حدث خطأ، يرجى المحاولة مرة أخرى');
        return;
    }
    
    showConfirmationSuccess();
}

// Show confirmation success
function showConfirmationSuccess() {
    hideAllForms();
    document.getElementById('confirmationSuccess').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show payment invoice directly
function showPayment() {
    if (!currentStudent) {
        alert('حدث خطأ، يرجى المحاولة مرة أخرى');
        return;
    }
    
    hideAllForms();
    document.getElementById('paymentSection').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle file upload
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('نوع الملف غير مدعوم. يرجى رفع ملف PDF أو صورة (JPG, PNG)');
            input.value = '';
            return;
        }
        
        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('حجم الملف كبير جداً. الحد الأقصى المسموح 5 ميجابايت');
            input.value = '';
            return;
        }
        
        // Show uploaded file
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('uploadedFile').classList.remove('hidden');
        document.querySelector('.upload-area').style.display = 'none';
    }
}

// Remove uploaded file
function removeFile() {
    document.getElementById('receiptFile').value = '';
    document.getElementById('uploadedFile').classList.add('hidden');
    document.querySelector('.upload-area').style.display = 'block';
}

// Submit payment
function submitPayment() {
    const fileInput = document.getElementById('receiptFile');
    
    if (!fileInput.files.length) {
        alert('يرجى رفع إيصال السداد أولاً');
        return;
    }
    
    // Simulate payment processing
    showPaymentSuccess();
}

// Show payment success
function showPaymentSuccess() {
    hideAllForms();
    
    // Generate reference number
    const referenceNumber = currentStudent ? currentStudent.referenceNumber : 'IUM-2025-001234';
    document.getElementById('referenceNumber').textContent = referenceNumber;
    
    document.getElementById('paymentSuccess').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go back to home
function goHome() {
    hideAllForms();
    currentStudent = null;
    
    // Reset form
    document.getElementById('nationalId').value = '';
    document.getElementById('mobile').value = '';
    
    // Reset file upload
    removeFile();
    
    // Show welcome section
    document.getElementById('welcome').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide all forms
function hideAllForms() {
    const sections = [
        'welcome',
        'inquiryForm', 
        'admissionResult', 
        'confirmationSuccess', 
        'paymentSection', 
        'paymentSuccess'
    ];
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

// Add smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    hideAllForms();
    document.getElementById('welcome').classList.remove('hidden');
    
    // Add click handlers for service cards
    const serviceCards = document.querySelectorAll('.service-card:not(.disabled)');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.textContent.includes('الاستعلام عن القبول')) {
                showInquiryForm();
            }
        });
    });
});

