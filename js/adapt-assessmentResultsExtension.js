define([
    "core/js/adapt",
    "components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults",
    './adapt-assessmentCertificateView'
], function(Adapt, AssessmentResults, AssessmentCertificateView) {

    // Extends the assessmentResults component
    var AssessmentResultsInitialize = AssessmentResults.prototype.initialize;

    AssessmentResults.prototype.initialize = function(options) {

        if (this.model.get('_certificate')) {

            // Extend the componentView with new functionality
            _.extend(this, AssessmentCertificateView);
        }

        // Initialize the article in the normal manner
        return AssessmentResultsInitialize.apply(this, arguments);
    };

});
