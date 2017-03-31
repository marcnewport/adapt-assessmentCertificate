# adapt-assessmentCertificate

Generates a certificate as a png file (data uri) when an assessment is passed. Extending the functionality of the [adapt-contrib-AssessmentResults component](https://github.com/adaptlearning/adapt-contrib-assessmentResults).

![demo](https://cloud.githubusercontent.com/assets/951725/24533657/ddf38450-1614-11e7-82ef-3bc7e3ab5530.gif)

## Installation

With Adapt CLI installed, run `adapt install assessmentCertificate`

Alternatively, download the ZIP and extract into the src > extensions directory.

## Usage

Extend the `adapt-contrib-AssessmentResults` component by adding a `_certificate` proprty with the following attributes (see exaple.json for further infromation).

**_buttons**

||Attribute||Type||Description||
|start|string|The label for the button on the assessment results component|
|yes|string|The label for the continue button on the modal box|
|no|string|The label for the cancel button on the modal box|

**_prompt**

||Attribute||Type||Description||
|title|string|The title of the modal prompt|
|body|string|The body text of the modal prompt|
|instruction|string|The instruction text of the modal prompt (serves as for the user name input field)|
|placeholder|string|The placeholder text for the user name input field|

**_display**

||Attribute||Type||Description||
|_graphic.src|string|The path to the certificate graphic|
|_graphic.width|int|The width of the certificate graphic|
|_graphic.height|int|The height of the certificate graphic|
|_userName.x|int/string|The x position for the placement of the user name (use `"center"` to centre the text relative to the certificate with)|
|_userName.y|int|The y position for the placement of the user name|
|_userName.font|string|The style of font to use eg. `"48px Arial"`|
|_courseName.x|int/string|The x position for the placement of the user name (use `"center"` to centre the text relative to the certificate with)|
|_courseName.y|int|The y position for the placement of the user name|
|_courseName.font|string|The style of font to use eg. `"48px Arial"`|
|_courseDate.x|int/string|The x position for the placement of the user name (use `"center"` to centre the text relative to the certificate with)|
|_courseDate.y|int|The y position for the placement of the user name|
|_courseDate.font|string|The style of font to use eg. `"48px Arial"`|

## Limitations

**Cross-platform coverage:** Chrome, Firefox, Edge, IE 11, IE10

## Credits

Sample certificate image designed by [Freepik](http://www.freepik.com/free-vector/diploma-with-classic-frame_1070437.htm)
