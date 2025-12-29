// ========================================
// ADD SCHEDULE - JAVASCRIPT
// ========================================
// This file handles all functionality for the Add Schedule page
// Including: form validation, dropdowns, and appointment scheduling
// ========================================

// ========================================
// DROPDOWN FUNCTIONALITY
// ========================================

// خيارات القوائم المنسدلة
const appointmentTypes = ['New Patient', 'Follow-up', 'Consultation', 'Emergency', 'Check-up'];
const appointmentTimes = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM',
    '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];
const durationOptions = ['15 minute', '30 minute', '45 minute', '60 minute', '90 minute', '120 minute'];

// إنشاء dropdown menu
function createDropdownMenu(options, currentValue, onSelect) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        margin-top: 5px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: none;
        direction: ltr;
        text-align: left;
    `;

    options.forEach(option => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = option;
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s;
            border-bottom: 1px solid #f3f4f6;
        `;
        
        if (option === currentValue) {
            item.style.background = '#f0f7ff';
            item.style.color = '#003785';
            item.style.fontWeight = '600';
        }
        
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f0f7ff';
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.textContent !== currentValue) {
                this.style.background = 'white';
            }
        });
        
        item.addEventListener('click', function() {
            onSelect(option);
            dropdown.style.display = 'none';
        });
        
        dropdown.appendChild(item);
    });
    
    // إزالة border من آخر عنصر
    if (dropdown.lastChild) {
        dropdown.lastChild.style.borderBottom = 'none';
    }
    
    return dropdown;
}

// تهيئة القوائم المنسدلة
function initializeDropdowns() {
    // Appointment Type Dropdown
    const appointmentTypeField = document.querySelector('.add-appointment__dropdown-button-3 .add-appointment__textfield');
    const appointmentTypeSpan = document.querySelector('.add-appointment__new-patient');
    
    if (appointmentTypeField && appointmentTypeSpan) {
        appointmentTypeField.style.position = 'relative';
        
        const dropdown = createDropdownMenu(appointmentTypes, appointmentTypeSpan.textContent, function(selected) {
            appointmentTypeSpan.textContent = selected;
            console.log('Appointment Type selected:', selected);
        });
        
        appointmentTypeField.appendChild(dropdown);
        
        appointmentTypeField.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });
            
            dropdown.style.display = isOpen ? 'none' : 'block';
        });
    }
    
    // Appointment Time Dropdown
    const appointmentTimeField = document.querySelector('.add-appointment__dropdown-button-32 .add-appointment__textfield');
    const appointmentTimeSpan = document.querySelector('.add-appointment__select-time');
    
    if (appointmentTimeField && appointmentTimeSpan) {
        appointmentTimeField.style.position = 'relative';
        
        const dropdown = createDropdownMenu(appointmentTimes, appointmentTimeSpan.textContent, function(selected) {
            appointmentTimeSpan.textContent = selected;
            console.log('Appointment Time selected:', selected);
        });
        
        appointmentTimeField.appendChild(dropdown);
        
        appointmentTimeField.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });
            
            dropdown.style.display = isOpen ? 'none' : 'block';
        });
    }
    
    // Duration Dropdown
    const durationField = document.querySelector('.add-appointment__dropdown-button-33 .add-appointment__textfield');
    const durationSpan = document.querySelector('.add-appointment___30-minute');
    
    if (durationField && durationSpan) {
        durationField.style.position = 'relative';
        
        const dropdown = createDropdownMenu(durationOptions, durationSpan.textContent, function(selected) {
            durationSpan.textContent = selected;
            console.log('Duration selected:', selected);
        });
        
        durationField.appendChild(dropdown);
        
        durationField.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });
            
            dropdown.style.display = isOpen ? 'none' : 'block';
        });
    }
    
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.add-appointment__textfield--dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
}

// ========================================
// FORM VALIDATION
// ========================================

// التحقق من صحة البيانات
function validateForm() {
    const patientName = document.querySelector('.add-appointment__enter-patent-name')?.value.trim();
    const phoneNumber = document.querySelector('.add-appointment__textbox-152 input')?.value.trim();
    const email = document.querySelector('.add-appointment__textbox-153 input')?.value.trim();
    const appointmentDate = document.querySelector('.add-appointment___09-feb-2021')?.value;
    const appointmentTime = document.querySelector('.add-appointment__select-time')?.textContent;
    const appointmentType = document.querySelector('.add-appointment__new-patient')?.textContent;
    
    const errors = [];
    
    // التحقق من اسم المريض
    if (!patientName) {
        errors.push('Patient name is required');
        highlightError('.add-appointment__textbox-15');
    } else {
        removeErrorHighlight('.add-appointment__textbox-15');
    }
    
    // التحقق من البريد الإلكتروني (مطلوب)
    if (!email) {
        errors.push('Email address is required');
        highlightError('.add-appointment__textbox-153');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
        highlightError('.add-appointment__textbox-153');
    } else {
        removeErrorHighlight('.add-appointment__textbox-153');
    }
    
    // التحقق من رقم الهاتف (اختياري لكن يجب أن يكون صحيحاً إذا تم إدخاله)
    if (phoneNumber && !isValidPhone(phoneNumber)) {
        errors.push('Please enter a valid phone number');
        highlightError('.add-appointment__textbox-152');
    } else {
        removeErrorHighlight('.add-appointment__textbox-152');
    }
    
    // التحقق من التاريخ
    if (!appointmentDate) {
        errors.push('Appointment date is required');
        highlightError('.add-appointment__textbox-16');
    } else {
        const selectedDate = new Date(appointmentDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Appointment date cannot be in the past');
            highlightError('.add-appointment__textbox-16');
        } else {
            removeErrorHighlight('.add-appointment__textbox-16');
        }
    }
    
    // التحقق من الوقت
    if (!appointmentTime || appointmentTime === 'Select Time') {
        errors.push('Please select an appointment time');
        highlightError('.add-appointment__dropdown-button-32');
    } else {
        removeErrorHighlight('.add-appointment__dropdown-button-32');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// إبراز الحقل الذي به خطأ
function highlightError(selector) {
    const field = document.querySelector(selector);
    if (field) {
        const textfield = field.querySelector('.add-appointment__textfield');
        if (textfield) {
            textfield.style.borderColor = '#ef4444';
            textfield.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    }
}

// إزالة إبراز الخطأ
function removeErrorHighlight(selector) {
    const field = document.querySelector(selector);
    if (field) {
        const textfield = field.querySelector('.add-appointment__textfield');
        if (textfield) {
            textfield.style.borderColor = '#e5e7eb';
            textfield.style.boxShadow = 'none';
        }
    }
}

// ========================================
// FORM SUBMISSION
// ========================================

// جمع بيانات النموذج
function collectFormData() {
    const patientName = document.querySelector('.add-appointment__enter-patent-name')?.value.trim();
    const phoneNumber = document.querySelector('.add-appointment__textbox-152 input')?.value.trim();
    const email = document.querySelector('.add-appointment__textbox-153 input')?.value.trim();
    const appointmentDate = document.querySelector('.add-appointment___09-feb-2021')?.value;
    const appointmentTime = document.querySelector('.add-appointment__select-time')?.textContent;
    const appointmentType = document.querySelector('.add-appointment__new-patient')?.textContent;
    const duration = document.querySelector('.add-appointment___30-minute')?.textContent;
    const notes = document.querySelector('.add-appointment__enter-any-addation-notes')?.value.trim();
    
    return {
        patientName,
        phoneNumber,
        email,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        notes
    };
}

// حفظ الموعد
function saveAppointment() {
    const validation = validateForm();
    
    if (!validation.isValid) {
        alert('Please fix the following errors:\n\n' + validation.errors.join('\n'));
        return;
    }
    
    const formData = collectFormData();
    
    // حفظ في localStorage (يمكن استبداله بـ API call)
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push({
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'Scheduled'
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    console.log('Appointment saved:', formData);
    
    // عرض رسالة نجاح
    showSuccessMessage('Appointment scheduled successfully!');
    
    // إعادة تعيين النموذج بعد ثانيتين
    setTimeout(() => {
        resetForm();
        // يمكن إغلاق النافذة أو إعادة التوجيه
        // window.close(); // إذا كانت في popup
        // window.location.href = '../schedule/schedule.html'; // للعودة لصفحة الجدول
    }, 2000);
}

// إعادة تعيين النموذج
function resetForm() {
    document.querySelector('.add-appointment__enter-patent-name').value = '';
    document.querySelector('.add-appointment__textbox-152 input').value = '';
    document.querySelector('.add-appointment__textbox-153 input').value = '';
    document.querySelector('.add-appointment___09-feb-2021').value = '';
    document.querySelector('.add-appointment__select-time').textContent = 'Select Time';
    document.querySelector('.add-appointment__new-patient').textContent = 'New Patient';
    document.querySelector('.add-appointment___30-minute').textContent = '30 minute';
    document.querySelector('.add-appointment__enter-any-addation-notes').value = '';
    
    // إزالة جميع إبرازات الأخطاء
    document.querySelectorAll('.add-appointment__textfield').forEach(field => {
        field.style.borderColor = '#e5e7eb';
        field.style.boxShadow = 'none';
    });
}

// عرض رسالة نجاح
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // إضافة animation
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
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 2000);
}

// ========================================
// BUTTON HANDLERS
// ========================================

// تهيئة الأزرار
function initializeButtons() {
    // زر الإغلاق (X)
    const closeButton = document.querySelector('.add-appointment__c-remove-1');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
                window.close(); // إذا كانت في popup
                // أو يمكن استخدام: window.location.href = '../schedule/schedule.html';
            }
        });
    }
    
    // زر Schedule Appointment
    const scheduleButton = document.querySelector('.add-appointment__button');
    if (scheduleButton) {
        scheduleButton.addEventListener('click', function(e) {
            e.preventDefault();
            saveAppointment();
        });
    }
    
    // زر Cancel
    const cancelButton = document.querySelector('.add-appointment__button-197');
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
                resetForm();
                window.close(); // إذا كانت في popup
                // أو يمكن استخدام: window.location.href = '../schedule/schedule.html';
            }
        });
    }
}

// ========================================
// DATE VALIDATION
// ========================================

// تعيين الحد الأدنى للتاريخ (اليوم)
function initializeDateField() {
    const dateInput = document.querySelector('.add-appointment___09-feb-2021');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // إذا كان التاريخ المحدد في الماضي، قم بتحديثه لليوم
        if (dateInput.value < today) {
            dateInput.value = today;
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

// وظيفة التهيئة الرئيسية
function initializeAddSchedule() {
    console.log('Initializing Add Schedule System...');
    console.log('DOM Ready State:', document.readyState);
    
    try {
        // تهيئة القوائم المنسدلة
        initializeDropdowns();
        
        // تهيئة حقل التاريخ
        initializeDateField();
        
        // تهيئة الأزرار
        initializeButtons();
        
        // إضافة event listeners للتحقق من صحة البيانات أثناء الكتابة
        const emailInput = document.querySelector('.add-appointment__textbox-153 input');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    highlightError('.add-appointment__textbox-153');
                } else {
                    removeErrorHighlight('.add-appointment__textbox-153');
                }
            });
        }
        
        const phoneInput = document.querySelector('.add-appointment__textbox-152 input');
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    highlightError('.add-appointment__textbox-152');
                } else {
                    removeErrorHighlight('.add-appointment__textbox-152');
                }
            });
        }
        
        console.log('✅ Add Schedule System Initialized Successfully');
        console.log('📅 Appointment scheduling ready');
    } catch (error) {
        console.error('❌ Error initializing Add Schedule:', error);
        console.error('Error details:', error.stack);
    }
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded - Initializing Add Schedule');
    initializeAddSchedule();
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM hasn't finished loading yet, wait for DOMContentLoaded
    console.log('⏳ Waiting for DOM to load...');
} else {
    // DOM is already loaded, initialize immediately
    console.log('✅ DOM already loaded - Initializing immediately');
    setTimeout(initializeAddSchedule, 50);
}

// ========================================
// EXPORT FUNCTIONS (if needed)
// ========================================

// جعل الوظائف متاحة عالمياً إذا لزم الأمر
window.saveAppointment = saveAppointment;
window.resetForm = resetForm;
window.validateForm = validateForm;

