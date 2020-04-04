<template>
 <v-bottom-sheet v-model="isOpen">
      <v-sheet class="login-sheet__sheet">
        <div class="login-sheet__div">
            <h2 class="login-sheet__h2" v-t="'login.header'" />
            <v-form v-model="valid">
                <v-text-field
                        class="login-sheet__input"
                        :rules="[rules.required]"
                        v-model="email"
                        :placeholder="$t('common.email')"
                        autofocus
                ></v-text-field>
                <v-text-field
                        :rules="[rules.required]"
                        v-model="password"
                        type="password"
                        :placeholder="$t('common.password')"
                        @keyup.enter="loginByEmail"
                ></v-text-field>
            </v-form>
                <v-btn
                        v-if="!loading"
                    class="login-sheet__button text-uppercase"
                    @click="loginByEmail"
                    :disabled="!valid"
                    outlined
                    v-t="'login.action'"
                />
             <v-progress-circular
                     v-if="loading"
                     class="login-sheet__button"
                     size="36"
                     :width="3"
                     color="#3a4748"
                     indeterminate
             ></v-progress-circular>
                <v-btn
                    class="login-sheet__button text-uppercase"
                    text
                    color="red"
                    @click="$emit('closeLoginEmailSheet')"
                    v-t="'common.cancel'"
                />
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: "LoginEmail",
        props: {
            sheet: {
                type: Boolean
            }
        },
        computed: {
          isOpen: {
              get() {
                return this.sheet
              },
              set () {
                  this.$emit('closeLoginEmailSheet')
              }
          }
        },
        data: () => ({
            email: '',
            password: '',
            valid: true,
            loading: false,
            rules: {
                required: value => !!value || 'Required.',
            },
        }),
        methods: {
            ...mapActions('user', ['loginEmail']),
            async loginByEmail() {
                const credentials = {
                    email: this.email, password: this.password
                }
                this.loading = true
                try {
                    await this.loginEmail(credentials)
                    this.$emit('closeLoginEmailSheet')
                    this.email = ''
                    this.password = ''
                    this.loading = false
                    this.valid = true
                } catch (e) {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-btn--outlined {
        border: thin solid #3a4748;;
    }
.login-sheet{
    &__sheet {
        padding-top: 50px;
        padding-bottom: 50px;
        height: 100% !important;;
    }
    &__h2 {
        font-size: 2.5rem;
        font-weight: 200;
        margin-bottom: 20px;
    }
    &__input {
        margin-top: 20px;
    }
}
    @media (min-width: 768px) {
        .login-sheet {
            &__div {
                width: 50%;
                margin: auto;
                display: flex;
                flex-direction: column;
            }
            &__button {
                margin: auto;
                margin-top: 20px;
                width: 20%;
            }
        }
    }
    @media (max-width: 768px) {
        .login-sheet {
            &__div {
                width: 75%;
                margin: auto;
                display: flex;
                flex-direction: column;
            }
            &__button {
                margin: auto;
                margin-top: 20px;
                width: 60%;
            }
        }
    }
</style>
