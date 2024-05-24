<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wordle-By-GK</title>
    <link rel="stylesheet" href="wordle.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>
    <section>
        <div class="help" id="help">
            <h1>Help</h1>
            <div class="wrong"><span class="bgcolor"></span>
                <p>The letter is not in the word.</p>
            </div>
            <div class="wrong-loc"><span class="bgcolor"></span>
                <p>The letter is in there but not in that position.</p>
            </div>
            <div class="correct"><span class="bgcolor"></span>
                <p>Letter is in correct Position.</p>
            </div>
            <span class="cross" onclick="hidehelp()">&cross;</span>
        </div>
        <div class="alertdata">Word not found.</div>
        <div class="container">
            <h1 class="title">Wordle</h1>
            <pre>Guess the word</pre>
            <div class="quest" title="help" onclick="showhelp()">&quest;</div>
            <div class="quest op1" onclick="setLength(5)">5</div>
            <div class="quest op2" onclick="setLength(6)">6</div>
            @php
                $length = 5; // Default length
                if (isset($_GET['length'])) {
                    $length = $_GET['length'];
                }
            @endphp
            @for ($i = 0; $i < 6; $i++)
                <div id="otp-form-0" class="otp-form">
                    @for ($j = 0; $j < $length; $j++)
                        <input type="text" id="otp-input-{{ $i }}{{ $j }}"
                            class="otp-input-{{ $i }} otp-inputs" maxlength="1" />
                    @endfor
                </div>
            @endfor
            <!-- Repeat similar forms for more if needed -->
            <button id="refreshButton">Get new word</button>
        </div>
    </section>
    <script>
        let k = 5; // Default value of k
        const urlParams = new URLSearchParams(window.location.search);
        const lengthParam = urlParams.get('length');
        if (lengthParam !== null) {
            k = parseInt(lengthParam); // Set k to the value of lengthParam if it exists
        }
        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('.otp-form');

            forms.forEach((form, index) => {
                const inputs = form.querySelectorAll('input');
                inputs.forEach((input, inputIndex) => {

                    input.addEventListener('input', function() {
                        if (this.value.length === 1) {
                            if (inputIndex < inputs.length - 1) {
                                inputs[inputIndex + 1].focus();
                            }
                        }
                    });

                    input.addEventListener('keydown', function(event) {
                        if (event.key === 'Backspace' && inputIndex > 0 && this.value
                            .length === 0) {
                            inputs[inputIndex - 1].focus();
                        }
                    });
                });

                if (index !== 0) {
                    inputs.forEach(input => {
                        input.disabled = true;

                    });
                }
            });

        });
        document.getElementById('refreshButton').addEventListener('click', function() {
            location.reload();
        });

        function showhelp() {
            var data = document.getElementById('help');
            data.style.display = "flex";
        }

        function hidehelp() {
            var data = document.getElementById('help');
            data.style.display = "none";
        }

        function setLength(length) {
            window.location.href = "/?length=" + length;
            k = length;
            console.log(k)
        }
    </script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/ajax.js"></script>
</body>

</html>
