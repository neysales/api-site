app.component('verification-page', {
    data() {
        return {
            code: ''
        }
    },
    methods: {
        verify() {
            this.$emit('verify', this.code);
        },
        goBack() {
            this.$emit('back');
        }
    },
    template: `
        <div class="login-page">
            <div class="login-box">
                <div class="logo-container">
                    <img :src="$root.logo" alt="Logo">
                </div>
                <div class="mb-3">
                    <label class="form-label">{{ $t('verification.code') }}</label>
                    <input type="tel" inputmode="numeric" pattern="[0-9]*" 
                           class="form-control code-mask" v-model="code" 
                           placeholder="000000" maxlength="6">
                </div>
                <div class="buttons-container">
                    <button class="btn btn-secondary" @click="goBack">{{ $t('common.back') }}</button>
                    <button class="btn btn-primary" @click="verify">{{ $t('verification.enter') }}</button>
                </div>
            </div>
        </div>
    `
});
