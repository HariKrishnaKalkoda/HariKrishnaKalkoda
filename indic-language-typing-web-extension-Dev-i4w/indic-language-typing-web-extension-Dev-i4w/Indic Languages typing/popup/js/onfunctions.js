console.log('Working')
var OutputElement = document.getElementById("txtOutput");
function vTransform() {
    var inputMethod = 0;  // RTS
    var outputMethod = 1; // unicode

    var InputElement = document.getElementById("txtInput");

    var input = "`" + InputElement.value + "`";
    var transformer = Transformer.createTransformer(inputMethod, outputMethod);
    transformer.setRTSMode(RTSTransformer.rtsEnglish);
    var output = transformer.convert(input);

    // Delete the & in the output (kal&haara, bil&haNuDu)
    var vRegExp = new RegExp(/(\S)(&)(\S)/gm);
    if (vRegExp.test(output)) {
        output = output.replace(vRegExp, "$1$3");
    }

    // Replace $$ with Rupee sign
    output = output.replace(/\${2}/g, '₹');

    OutputElement.value = output;
    InputElement.focus();

    // Auto-scroll
    if (InputElement.scrollHeight - InputElement.clientHeight == InputElement.scrollTop) {
        OutputElement.scrollTop = OutputElement.scrollHeight - OutputElement.clientHeight;
    }
    else {
        OutputElement.scrollTop = InputElement.scrollTop * 1.4375;
    }
    //	window.status = "ScrollHeight: " + InputElement.scrollHeight + "-" + OutputElement.scrollHeight +
    //		" ScrollTop: " + InputElement.scrollTop + "-" + OutputElement.scrollTop +
    //		" Height: " + InputElement.clientHeight + "-" + OutputElement.clientHeight;

    // Search links
    vSetSearchLinkHrefs();

}


// Modes: 0 - On demand; 1 - On the jump; 2 - On the fly
var $mode = 2; // default on-the-fly

function vSetMode($mode_selected) {
    $mode = $mode_selected;
    document.getElementById("txtInput").focus();
}

// transform if these keys are pressed
function vVerify(event) {
    let $code = event ? event.keyCode : -1;
    $length = document.getElementById("txtInput").value.length;

    // transfrom on demand (down arrow pressed), any mode
    if ($code == 40) vTransform();

    // on-the-jump mode
    else if ($mode == 1 && (
        $code == 13	// Enter
        || $code == 32	// Spacebar
        || $code == 188	// Comma
        || $code == 190	// Fullstop
        || $code == 191	// Qestion mark
        || $code == 49	// Exclamation mark
    )) vTransform();

    // disable on-the-fly mode if length > cut-off chars
    var $cutoff = 600;
    if ($length > $cutoff) {
        document.getElementById("fly").disabled = true;
        if ($mode == 2) {
            $mode = 1; //set to on-the-jump
            document.getElementById("jump").checked = true;
        }
    }
    else {
        document.getElementById("fly").disabled = false;

        // on-the-fly mode
        if ($mode == 2) vTransform();

        // switch to on-the-fly mode, if length is zero
        if (!$length && $mode != 0) {
            $mode = 2;
            document.getElementById("fly").checked = true;
        }
    }
}
function vSelectIt() {
    var OutputElement = document.getElementById("txtOutput");
    OutputElement.select();
    OutputElement.focus();

    if (navigator.clipboard) {
        navigator.clipboard.writeText(OutputElement.value).then();
    }
}
function vSetSearchLinkHrefs() {
    var googleSearchPrefix = 'http://www.google.com/search?hl=te&q=';
    var liveSearchPrefix = 'http://search.live.com/results.aspx?q=';

    var sQuery = document.getElementById("txtOutput").value
    document.getElementById("googlesearch").href = googleSearchPrefix + sQuery;
}
const ti = document.getElementById('txtInput');
ti.addEventListener('keydown', handleKeyDown);
function handleKeyDown(evt) {
    if (event.keyCode !== 9) return;

    vSelectIt();
    evt.preventDefault();

}
ti.addEventListener('keyup', vVerify);

OutputElement.addEventListener('keydown', (event) => {
    if(event.keyCode == 38) { document.getElementById('txtInput').focus(); }
})
