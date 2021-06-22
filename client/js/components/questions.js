var questions = new Vue({
    el: "#questions",
    data: {
        isLoggedIn: false,
        status: null,
        questions: [],
        answers: []

    },
    mounted() {

    },
    updated() {
    },
    methods: {

        getQuestions: function () {

            axios.get(BASEURL + 'questions')
                .then((res) => {
                    if (res.status == 200) {
                        this.questions = res.data;
                    }

                })
                .catch((err) => {
                    alert('something went wrong while fetching data...');
                });
        },

        answerQuestion(questionId, answer) {

            $('#' + questionId).addClass('block');
            this.answers.push({ question: questionId, answer: answer });
            if (questionId == this.questions[this.questions.length - 1]._id) {

                const parseJwt = (token) => {
                    try {
                        return JSON.parse(atob(token.split('.')[1]));
                    } catch (e) {
                        return null;
                    }
                };

                let postAnswersObj = {
                    contractorId: parseJwt(localStorage.getItem("token")).sub,
                    answers: this.answers
                }

                //submit answers
                axios.post(BASEURL + 'contractors/answer', postAnswersObj)
                    .then((res) => {
                        if (res.status == 201) {

                            console.log(res);

                            $('#questions').hide();
                            userProfile.getContractorDetails(parseJwt(localStorage.getItem("token")).username);
                            this.answers = [];

                            if(res.data.status == 2 && res.data.nextSteps){
                                window.open(res.data.nextSteps, '_blank');
                            }

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        alert('Something went wrong');
                    });
            }

        }
    }
})