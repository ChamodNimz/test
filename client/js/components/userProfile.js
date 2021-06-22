
const header = {
    Authorization: 'Bearer ' + localStorage.getItem("token")
};

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");

var userProfile = new Vue({
    el: "#userProfile",
    data: {
        username: '',
        email: '',
        id: '',
        status: 0,
        isLoggedIn : false

    },
    mounted() {

    },
    updated() {

    },
    methods: {

        getContractorDetails: function (email) {

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");

            axios.get(BASEURL + 'contractors/' + email)
                .then((res) => {
                    
                    if (res.status == 200) {
                        
                        let data = res.data;
                        this.username = data.username;
                        this.id = data._id;
                        this.status = data.status;
                        this.email = data.email;

                        questions.status = data.status;
                        
                    }

                })
                .catch((err) => {
                    console.log(err)
                    alert('something went wrong while fetching data...');
                });
        }
    }
})