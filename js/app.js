const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            currentPage: 'login',
            isAuthenticated: false,
            phone: '',
            verificationCode: '',
            language: 'pt-BR',
            logo: 'images/logo.png'
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
            console.log('Login clicked');
            if (this.phone) {
                console.log('Phone is valid, changing to verification page');
                this.currentPage = 'verification';
            }
        },
        verify() {
            console.log('Verify clicked');
            if (this.verificationCode) {
                console.log('Code is valid, authenticating...');
                this.isAuthenticated = true;
                this.currentPage = 'agenda';
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.currentPage = 'login';
            this.phone = '';
            this.verificationCode = '';
            localStorage.removeItem('token');
        }
    },
    mounted() {
        // Remova qualquer token existente para garantir que comece na tela de login
        localStorage.removeItem('token');
        
        // Apply phone mask
        this.$nextTick(() => {
            $('.phone-mask').mask('(00) 00000-0000');
            $('.code-mask').mask('000000');
        });
    }
});

// Registrar os componentes
app.component('agenda-page', agendaComponent);
app.component('atendentes-page', atendentesComponent);
app.component('especialidades', especialidadesComponent);
app.component('configuracao-page', configuracaoComponent);

// Montar a aplicação
app.mount('#app');
