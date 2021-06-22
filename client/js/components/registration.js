var registrationForm = new Vue({
    el: "#registrationForm",
    data: {
        username: '',
        email: '',
        password: '',
        rePassword: '',


        isRegistered: false,
        passwordNotEqual: false,
        validationError: false,
        message: ''


    },
    mounted() {

    },
    updated() {

    },
    methods: {

        registerContractor: function () {

            if (this.arePasswordsSame()) {
                var contractor = { password: this.password, email: this.email, username: this.username };

                axios.post(BASEURL + 'contractors/create', contractor)
                    .then((res) => {

                        if (res.status == 201) {
                            this.isRegistered = true;

                        }
                        else if(res.status == 400){
                            this.validationError = true;
                            this.message = res.message;
                        }

                    })
                    .catch((err) => {

                        this.validationError = true;
                        this.message = err.response.data.message;
                    });
            }else{
                this.passwordNotEqual = true;
                this.message = 'Passwords do not match of empty please retype correct password'
            }


        },

        arePasswordsSame: function () {
            return this.password === this.rePassword && this.password!= '' && this.rePassword !='';
        }
    }
})