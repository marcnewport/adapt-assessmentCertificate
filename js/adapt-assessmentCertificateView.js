define([
    "core/js/adapt",
    "core/js/views/componentView"
], function(Adapt) {

    var AssessmentCertificateView = {
        /**
         * Called when an assessment is completed
         *
         * @todo This method has been over-written, need to find docs on how to call super method
         */
        onAssessmentsComplete: function(state) {

            if (this.model.get("_assessmentId") === undefined ||
                this.model.get("_assessmentId") != state.id) return;

            this.model.set("_state", state);

            var feedbackBand = this.getFeedbackBand();

            this.setFeedback(feedbackBand);

            this.addClassesToArticle(feedbackBand);

            this.checkCertificateEnabled();

            this.render();

            this.show();
        },

        /**
         * Checks if the certificate button should be displayed
         */
        checkCertificateEnabled: function() {

            var state = this.model.get("_state");

            if (Modernizr.canvas) {
                if (state.isPass) {
                    this.model.set('_isCertificateEnabled', true);

                    // Eventlistener for the certificate button
                    // TODO : this should be attached to View's events property
                    this.$el.on('click', '.results-certificate-button', this.onCertificateShow.bind(this));
                }
            }
            else {
                console.warn('assessmentCertificate: browser does not support canvas');
            }
        },

        /**
         * Handler for when the certificate button on the component is clicked
         */
        onCertificateShow: function() {

            var template = Handlebars.templates['assessmentCertificateNotify'];
            var certificate = this.model.get('_certificate');
            // Get username from storage and add it to the certificate object for processing in hbs template
            certificate._userName = Adapt.offlineStorage.get("userName");

            // Listen for the prompt events added to promptObject
            this.listenToOnce(Adapt, "certificate:continue", this.certificateValidate);
            this.listenToOnce(Adapt, "certificate:cancel", this.certificateCancel);

            var promptObject = {
                title: certificate._prompt.title,
                body: template(certificate),
                _prompts: [
                    {
                        promptText: certificate._buttons.no,
                        _callbackEvent: "certificate:cancel",
                    },
                    {
                        promptText: certificate._buttons.yes,
                        _callbackEvent: "certificate:continue",
                    },
                ]
            };

            Adapt.trigger('notify:prompt', promptObject);
        },

        /**
         * The cancel handler
         */
        certificateCancel: function() {
            // Just remove the event listener, the modal will close automagically
            this.stopListening(Adapt, "certificate:cancel");
        },

        /**
         * [certificateValidate description]
         * @return {[type]} [description]
         */
        certificateValidate: function() {
            // Check a name was entered
            var userName = $('#assessment-certificate-user-name').val();
            var isValid = /[A-Za-z\-\s]{2,}/.test(userName);

            if (isValid) {
                // Add the username to the LMS
                Adapt.offlineStorage.set('userName', userName);
                this.certificateCreate(userName);
                this.stopListening(Adapt, "certificate:continue");
            }
            else {
                alert('no');
                // TODO : stop execution, dont close the notify modal
                return false;
            }
        },

        /**
         * Creates the certificate in a canvas, then exports it as an image in a new tab
         */
        certificateCreate: function(userName) {

            var certificate = this.model.get('_certificate');
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            canvas.width = certificate._display._graphic.width;
            canvas.height = certificate._display._graphic.height;

            var graphic = new Image();
            graphic.src = certificate._display._graphic.src;

            // Load in a pre-defined certificate image, and draw in the details based on json data
            graphic.onload = function() {
                context.drawImage(graphic, 0, 0);

                // Draw in the user name
                context.font = certificate._display._userName.font;
                var userNameWidth = context.measureText(userName).width;
                var userNameX = certificate._display._userName.x === 'center' ? (canvas.width - userNameWidth) / 2 : certificate._display._userName.x;
                context.fillText(userName, userNameX, certificate._display._userName.y);

                // Draw in the course name
                context.font = certificate._display._courseName.font;
                var courseName = Adapt.course.get('title');
                var courseNameWidth = context.measureText(courseName).width;
                var courseNameX = certificate._display._courseName.x === 'center' ? (canvas.width - courseNameWidth) / 2 : certificate._display._courseName.x;
                context.fillText(courseName, courseNameX, certificate._display._courseName.y);

                // Draw in the date
                context.font = certificate._display._courseDate.font;
                var date = new Date();
                var courseDate = date.toLocaleDateString();
                var courseDateWidth = context.measureText(courseDate).width;
                var courseDateX = certificate._display._courseDate.x === 'center' ? (canvas.width - courseDateWidth) / 2 : certificate._display._courseDate.x;
                context.fillText(courseDate, courseDateX, certificate._display._courseDate.y);

                // IE doesnt support browsing to a data uri
                // So lets test if the msSaveBlob method is available (IE 10+)
                // Otherwise open the image in a new tab
                if (window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(canvas.msToBlob());
                }
                else if (canvas.toDataURL) {
                    window.open(canvas.toDataURL());
                }
            }
        }
    };

    return AssessmentCertificateView;

});
