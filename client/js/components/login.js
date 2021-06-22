var login = new Vue({
    el: "#loginForm",
    data: {
        username: '',
        password: '',
        isLoggedIn: false
    },
    mounted() {

    },
    updated() {

    },
    methods: {

        authenticate: function () {

            var credentials = { password: this.password, email: this.username };

            axios.post(BASEURL + 'auth/login', credentials)
                .then((res) => {

                    if (res.status == 201) {
                        this.isLoggedIn = true;

                        localStorage.setItem("token", res.data.access_token);
                        localStorage.setItem("username", res.data.firstName + ' ' + res.data.lastName);

                        // after login get contractor profile to show badge and profile details (if nessasary)
                        const parseJwt = (token) => {
                            try {
                                return JSON.parse(atob(token.split('.')[1]));
                            } catch (e) {
                                return null;
                            }
                        };
                        userProfile.getContractorDetails(parseJwt(res.data.access_token).username);
                        userProfile.isLoggedIn = true;
                        questions.isLoggedIn = true;
                        questions.getQuestions();

                    }

                })
                .catch((err) => {
                    console.log(err)
                    alert('Incorrect email or password');
                });
        }
    }
})