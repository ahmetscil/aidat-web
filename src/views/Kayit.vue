<template>
  <v-item-group>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snacktype">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="dark" dense v-bind="attrs" @click="snackbar = false">
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card light flat>
            <v-card-title>Aiddat'a Hoş Geldin!</v-card-title>
            <v-card-text>
              <p>Aidat'ı kullanabilmek için lütfen aramıza katıl!</p>
              <p>zaten bir hesabınız varsa <router-link :to="{ name: 'Giris' }">Oturum Açın</router-link></p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card light flat>
            <v-card-text>
              <v-card-subtitle v-if="isLoading">
                Hesabınız oluşturuluyor, lütfen bekleyin...
              </v-card-subtitle>
              <form>
                <v-text-field v-model="form.name" :readonly="isLoading" :error-messages="nameErrors" label="Name" required @input="$v.form.name.$touch()" @blur="$v.form.name.$touch()" />
                <v-text-field v-model="form.email" :readonly="isLoading" :error-messages="emailErrors" label="E-mail" required @input="$v.form.email.$touch()" @blur="$v.form.email.$touch()" />
                <v-text-field v-model="form.password" :readonly="isLoading" :error-messages="passwordErrors" label="Password" type="password" :counter="12" required @input="$v.form.password.$touch()" @blur="$v.form.password.$touch()" />
                <v-checkbox v-model="form.checkbox" :error-messages="checkboxErrors" label="Kullanım Koşullarını Kabul Ediyorum" required @change="$v.form.checkbox.$touch()" @blur="$v.form.checkbox.$touch()" />
                <v-btn class="mr-4" @click="submit" :disabled="isLoading">
                  Aramıza Katıl
                </v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { mapState } from 'vuex'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
      form: {
        name: { required },
        email: { required, email },
        password: { required, maxLength: maxLength(12), minLength: minLength(6) },
        checkbox: {
          checked (val) {
            return val
          }
        }
      }
    },
    data: () => ({
      snackbar: false,
      snackText: 'Bir hata ile karşılaşıldı.',
      snacktype: 'warning',
      timeout: 2500,
      form: {
        name: '',
        email: '',
        password: '',
        checkbox: false
      }
    }),
    watch: {
      returnCount: function (e) {
        switch (e) {
          case 1:
            this.snackText = 'Aramıza Hoş Geldin!'
            this.snackbar = true
            this.snacktype = 'success'
            this.$router.push({ name: 'Giris' })
            console.log('giris')
            break
        }
      },
      errorMessage: function (e) {
        for (let x = 0; x < e.length; x++) {
          this.snackText = e[x]
          this.snackbar = true
          this.snacktype = 'warning'
        }
      }
    },
    computed: {
      ...mapState(['returnCount', 'errorMessage', 'isLoading']),
      checkboxErrors () {
        const errors = []
        if (!this.$v.form.checkbox.$dirty) return errors
        !this.$v.form.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.form.password.$dirty) return errors
        !this.$v.form.password.maxLength && errors.push('Şifreniz 6-12 karakter arasında olmalıdır.')
        !this.$v.form.password.minLength && errors.push('Şifreniz 6-12 karakter arasında olmalıdır.')
        !this.$v.form.password.required && errors.push('Şifre zorunludur.')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.form.name.$dirty) return errors
        !this.$v.form.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.form.email.$dirty) return errors
        !this.$v.form.email.email && errors.push('Must be valid e-mail')
        !this.$v.form.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.form.$touch()
        if (this.$v.$error) {
          this.snackText = 'Lütfen tüm zorunlu alanları doldurun'
          this.snackbar = true
          this.snacktype = 'warning'
        } else {
          this.snackbar = false
          this.$store.dispatch('authRegister', {...this.send, form: this.form})
        }
      }
    }
  }
</script>
