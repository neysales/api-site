const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            currentPage: 'login',
            isAuthenticated: false,
            phone: '',
            verificationCode: '',
            language: 'pt-BR',
            logo: 'images/logo.png',
            attendants: [
                { id: 1, name: 'Dr. João Silva', specialty: 'Clínico Geral', status: 'Disponível' },
                { id: 2, name: 'Dra. Maria Santos', specialty: 'Pediatra', status: 'Ocupado' }
            ],
            calendar: null
        }
    },
    methods: {
        $t(key) {
            const keys = key.split('.');
            let value = translations[this.language];
            for (const k of keys) {
                value = value[k];
            }
            return value;
        },
        login() {
            // Commented API call
            /*
            fetch(url_api + '/login', {
                method: 'POST',
                body: JSON.stringify({ phone: this.phone })
            });
            */
            this.currentPage = 'verification';
        },
        verify() {
            // Commented API call
            /*
            fetch(url_api + '/login/' + this.verificationCode)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        this.isAuthenticated = true;
                        this.currentPage = 'agenda';
                    }
                });
            */
            this.isAuthenticated = true;
            this.currentPage = 'agenda';
        },
        logout() {
            // Commented API call
            /*
            fetch(url_api + '/logout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                localStorage.removeItem('token');
                this.isAuthenticated = false;
                this.currentPage = 'login';
            });
            */
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.currentPage = 'login';
        },
        initCalendar() {
            const calendarEl = document.getElementById('calendar');
            if (calendarEl) {
                this.calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'timeGridDay',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    slotMinTime: '07:00:00',
                    slotMaxTime: '20:00:00',
                    slotDuration: '00:30:00',
                    allDaySlot: false,
                    locale: this.language,
                    height: 'auto',
                    expandRows: true,
                    stickyHeaderDates: true,
                    nowIndicator: true,
                    businessHours: {
                        daysOfWeek: [ 1, 2, 3, 4, 5, 6 ],
                        startTime: '07:00',
                        endTime: '20:00',
                    },
                    scrollTime: '07:00:00',
                    slotLabelFormat: {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }
                });
                this.calendar.render();
            }
        }
    },
    watch: {
        language(newVal) {
            document.documentElement.lang = newVal;
            document.cookie = `language=${newVal};path=/;max-age=31536000`;
            if (this.calendar) {
                this.calendar.setOption('locale', newVal);
            }
        },
        currentPage(newVal) {
            if (newVal === 'agenda' && this.isAuthenticated) {
                this.$nextTick(() => {
                    this.initCalendar();
                });
            }
            // Reinitialize masks when page changes
            if (newVal === 'verification') {
                this.$nextTick(() => {
                    $('.code-mask').mask('000000', {
                        clearIfNotMatch: true,
                        placeholder: "000000"
                    });
                });
            }
        }
    },
    mounted() {
        // Initialize phone mask
        $('.phone-mask').mask('(00) 00000-0000', {
            clearIfNotMatch: true,
            placeholder: "(00) 00000-0000"
        });

        // Initialize verification code mask
        $('.code-mask').mask('000000', {
            clearIfNotMatch: true,
            placeholder: "000000"
        });
        
        // Get logo from environment
        if (typeof LOGO !== 'undefined') {
            this.logo = LOGO;
        }

        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
            this.currentPage = 'agenda';
            this.initCalendar();
        }

        // Check for saved language preference
        const languageCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('language='));
        if (languageCookie) {
            this.language = languageCookie.split('=')[1];
        }
    }
}).mount('#app');
