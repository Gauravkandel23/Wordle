$.ajaxSetup({
    headers: {
        'csrftoken': '{{ csrf_token() }}'
    }
});

// If random word is not already stored, generate one and store it

const possibleWords = ["apple", "beach", "chair", "dance", "eagle", "fairy", "grape", "happy", "image", "jolly",
    "knife", "lemon", "music", "novel", "oasis", "piano", "quiet", "roast", "sunny", "table",
    "umbra", "vault", "witty", "xenon", "young", "zebra", "acute", "baker", "camel", "dough",
    "elite", "flute", "globe", "heist", "igloo", "joker", "kiosk", "leash", "marsh", "onion",
    "peach", "quilt", "ruler", "snail", "tiger", "water", "abide", "braid", "cloud", "daisy",
    "enjoy", "flask", "heart", "inert", "jelly", "mango", "paste", "rugby", "snack", "toast",
    "upset", "whale", "amber", "brave", "candy", "drain", "emote", "flora", "green", "haste",
    "ivory", "jumbo", "knots", "major", "olive", "proud", "rival", "sweep", "trick", "agree",
    "bliss", "dream", "evoke", "fancy", "grass", "house", "input", "juicy", "karma", "lunch",
    "maple", "nurse", "opera", "round", "shock", "trend", "urban", "video", "angel", "bloom",
    "charm", "dusty", "event", "beach", "bland", "civic", "acute", "adore", "audio", "blend",
    "angel", "agree", "bliss", "dream", "evoke", "fancy", "agile", "audio", "blend", "bloom",
    "civic", "agile", "bland", "beach", "bloom", "charm", "civic", "dusty", "event", "agile",
    "bland", "beach", "bloom", "charm", "civic", "dusty", "event", "apple", "chair", "dance",
    "eagle", "fairy", "grape", "happy", "image", "jolly", "knife", "lemon", "music", "novel",
    "oasis", "piano", "quiet", "roast", "sunny", "table", "umbra", "vault", "witty", "xenon",
    "young", "zebra", "acorn", "badge", "chime", "delta", "elbow", "flame", "glove", "hefty",
    "idiot", "joust", "kayak", "laugh", "mirth", "nymph", "ovoid", "pique", "quash", "route",
    "sober", "talon", "ultra", "vouch", "whisk", "xenon", "yield", "zebra", "aglow", "bribe",
    "chess", "dwarf", "ember", "flake", "gauge", "hymen", "irate", "jaded", "klutz", "lunar",
    "merry", "nudge", "ocean", "pluck", "quest", "rusty", "savor", "taunt", "unify", "vista",
    "wedge", "xenon", "yield", "zebra", "abuzz", "balky", "cabin", "dusky", "edict", "flint",
    "gnarl", "haste", "irons", "jewel", "knell", "lance", "mirth", "nymph", "opine", "quail",
    "roost", "sloth", "tract", "unzip", "vomit", "witty", "xenon", "yield", "zebra", "alloy",
    "bland", "cloak", "dwell", "elude", "fluke", "glean", "humid", "irate", "joust", "kayak",
    "lucid", "mirth", "nymph", "omega", "quail", "roach", "serge", "twirl", "ultra", "vouch",
    "wedge", "xenon", "yield", "zebra", "adapt", "bleak", "chimp", "dusky", "eerie", "flora",
    "glide", "hatch", "inlay", "joust", "knack", "laser", "merge", "nifty", "optic", "quake",
    "rifle", "slash", "toast", "usurp", "vocal", "whims", "xenon", "yield", "zebra", "abate",
    "bluff", "cleft", "dusky", "elude", "flood", "girth", "havoc", "idyll", "jolly", "kebab",
    "latch", "merit", "nimble", "optic", "quart", "round", "stoke", "unzip", "vigor", "wreck",
    "xenon", "yield", "zebra", "align", "blurb", "climb", "dusky", "elixir", "fluid", "gizmo",
    "hover", "issue", "jumbo", "kudos", "latch", "mercy", "niche", "optic", "query", "rider",
    "sloth", "tweak", "ultra", "vivid", "wacky", "xenon", "yield", "zebra", "ambit", "brisk",
    "canto", "donut", "elide", "flora", "gusto", "honey", "irons", "joust", "kiosk", "latch",
    "melon", "noble", "optic", "quell", "rifle", "slash", "tweet", "umbra", "vocal", "whisk",
    "xenon", "yield", "zebra", "abbey", "blimp", "cadet", "drift", "elegy", "flour", "gnash",
    "hyper", "idyll", "joust", "karma", "lemon", "marsh", "noble", "optic", "quill", "rider",
    "smack", "trace", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "aegis", "blink",
    "caped", "dusky", "elixir", "flood", "gnome", "hubby", "irate", "jolly", "kiosk", "latch",
    "mocha", "niche", "optic", "query", "round", "smirk", "thump", "ultra", "vocal", "whisk",
    "xenon", "yield", "zebra", "adorn", "bloat", "crane", "dusty", "elite", "flame", "gaffe",
    "horde", "irate", "joust", "karma", "laser", "marry", "niche", "optic", "quest", "rusty",
    "smite", "trail", "unzip", "vocal", "whims", "xenon", "yield", "zebra", "aggro", "blush",
    "crash", "dusky", "elope", "flair", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "abase", "blunt", "crave", "dusky", "elude", "flora", "gnash",
    "hyper", "idyll", "joust", "karma", "lemon", "marsh", "noble", "optic", "quest", "rusty",
    "smack", "trace", "ultra", "vocal", "whisk", "xenon", "yield", "zebra", "abash", "blurb",
    "crane", "dusky", "eager", "flash", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "addle", "bluff", "crisp", "dusky", "elope", "flame", "gaffe",
    "horde", "irate", "jolly", "kiosk", "latch", "mocha", "niche", "optic", "quest", "rusty",
    "smite", "trail", "unzip", "vocal", "whims", "xenon", "yield", "zebra", "aggro", "blush",
    "crisp", "dusky", "elope", "flair", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "abash", "blurb", "crane", "dusky", "eager", "flash", "gnome",
    "hubby", "irate", "jolly", "kebab", "leash", "marsh", "noble", "optic", "query", "rifle",
    "slash", "twirl", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "addle", "bluff",
    "crisp", "dusky", "elope", "flame", "gaffe", "horde", "irate", "jolly", "kiosk", "latch",
    "mocha", "niche", "optic", "quest", "rusty", "smite", "trail", "unzip", "vocal", "whims",
    "xenon", "yield", "zebra", "aggro", "blush", "crisp", "dusky", "elope", "flair", "gnome",
    "hubby", "irate", "jolly", "kebab", "leash", "marsh", "noble", "optic", "query", "rifle",
    "slash", "twirl", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "abash", "blurb",
    "crane", "dusky", "eager", "flash", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra"];
const randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

// Include the random word in the request data

$(document).ready(function () {
    $('.otp-input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendDataToBackend();
        }
    });

    function sendDataToBackend() {
        var inputs = $('.otp-input');
        var inputData = [];

        // Check if any input field is empty
        var isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red'); // Set outline to red for empty input
            } else {
                inputData.push($(this).val());
                $(this).css('outline', ''); // Reset outline for non-empty input
            }
        });

        if (isEmpty) {
            // If any input field is empty, do not send the request
            console.log('Please fill all the input fields.');
            return;
        }

        // Select a random word from the list of possible words


        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                // Handle success response
                console.log('Data sent successfully:', response);
                // Update input field colors based on response
                updateInputFieldColors(response);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });
    }

    function updateInputFieldColors(response) {

        // Loop through response to update input field colors
        response.forEach(function (item, index) {
            var inputField = $('#otp-input-0' + index);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19');
                inputField.prop('disabled', true)
                // Set background color to green if state is 1
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey'); // Set background color to grey if state is 0
                inputField.prop('disabled', true)
            } else {
                inputField.css('background-color', ''); // Reset background color if state is -1
                inputField.prop('disabled', true)
            }
            setTimeout(function () {
                const count = item.count;
                if (count != 5) {
                    var inputfirst = $('.otp-input-1');
                    inputfirst.each(function () {
                        $(this).prop('disabled', false);
                    });
                }
                else {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'Correct word Guessed',
                        icon: 'success'
                    });
                    var inputfirst = $('.otp-input-1');
                    inputfirst.each(function () {
                        $(this).prop('disabled', true);
                    });
                }
            }, 300);
        });

    }
});




$(document).ready(function () {
    $('.otp-input-1').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendDataToBackend();
        }
    });

    function sendDataToBackend() {
        var inputs = $('.otp-input-1');
        var inputData = [];

        // Check if any input field is empty
        var isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red'); // Set outline to red for empty input
            } else {
                inputData.push($(this).val());
                $(this).css('outline', ''); // Reset outline for non-empty input
            }
        });

        if (isEmpty) {
            // If any input field is empty, do not send the request
            console.log('Please fill all the input fields.');
            return;
        }

        // Select a random word from the list of possible words

        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                // Handle success response
                console.log('Data sent successfully:', response);
                // Update input field colors based on response
                updateInputFieldColors(response);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });
    }

    function updateInputFieldColors(response) {
        // Loop through response to update input field colors
        response.forEach(function (item, index) {
            var inputField = $('#otp-input-1' + index);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19');
                inputField.prop('disabled', true)
                // Set background color to green if state is 1
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey'); // Set background color to grey if state is 0
                inputField.prop('disabled', true)
            } else {
                inputField.css('background-color', ''); // Reset background color if state is -1
                inputField.prop('disabled', true)
            }
            setTimeout(function () {
                const count = item.count;
                if (count != 5) {
                    var inputfirst = $('.otp-input-2');
                    inputfirst.each(function () {
                        $(this).prop('disabled', false);
                    });
                }
                else {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'Correct word Guessed',
                        icon: 'success'
                    });
                    var inputfirst = $('.otp-input-2');
                    inputfirst.each(function () {
                        $(this).prop('disabled', true);
                    });
                }
            }, 300);

        });
    }
});

$(document).ready(function () {
    $('.otp-input-2').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendDataToBackend();
        }
    });

    function sendDataToBackend() {
        var inputs = $('.otp-input-2');
        var inputData = [];

        // Check if any input field is empty
        var isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red'); // Set outline to red for empty input
            } else {
                inputData.push($(this).val());
                $(this).css('outline', ''); // Reset outline for non-empty input
            }
        });

        if (isEmpty) {
            // If any input field is empty, do not send the request
            console.log('Please fill all the input fields.');
            return;
        }

        // Select a random word from the list of possible words

        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                // Handle success response
                console.log('Data sent successfully:', response);
                // Update input field colors based on response
                updateInputFieldColors(response);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });
    }

    function updateInputFieldColors(response) {
        // Loop through response to update input field colors
        response.forEach(function (item, index) {
            var inputField = $('#otp-input-2' + index);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19');
                inputField.prop('disabled', true)
                // Set background color to green if state is 1
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey'); // Set background color to grey if state is 0
                inputField.prop('disabled', true)
            } else {
                inputField.css('background-color', ''); // Reset background color if state is -1
                inputField.prop('disabled', true)
            }
            setTimeout(function () {
                const count = item.count;
                if (count != 5) {
                    var inputfirst = $('.otp-input-3');
                    inputfirst.each(function () {
                        $(this).prop('disabled', false);
                    });
                }
                else {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'Correct word Guessed',
                        icon: 'success'
                    });
                    var inputfirst = $('.otp-input-3');
                    inputfirst.each(function () {
                        $(this).prop('disabled', true);
                    });
                }
            }, 300);
        });

    }
});

$(document).ready(function () {
    $('.otp-input-3').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendDataToBackend();
        }
    });

    function sendDataToBackend() {
        var inputs = $('.otp-input-3');
        var inputData = [];

        // Check if any input field is empty
        var isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red'); // Set outline to red for empty input
            } else {
                inputData.push($(this).val());
                $(this).css('outline', ''); // Reset outline for non-empty input
            }
        });

        if (isEmpty) {
            // If any input field is empty, do not send the request
            console.log('Please fill all the input fields.');
            return;
        }

        // Select a random word from the list of possible words

        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                // Handle success response
                console.log('Data sent successfully:', response);
                // Update input field colors based on response
                updateInputFieldColors(response);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });

    }
    function updateInputFieldColors(response) {
        // Loop through response to update input field colors
        response.forEach(function (item, index) {
            var inputField = $('#otp-input-3' + index);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19');
                inputField.prop('disabled', true)
                // Set background color to green if state is 1
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey'); // Set background color to grey if state is 0
                inputField.prop('disabled', true)
            } else {
                inputField.css('background-color', ''); // Reset background color if state is -1
                inputField.prop('disabled', true)
            }
            setTimeout(function () {
                const count = item.count;
                if (count != 5) {
                    var inputfirst = $('.otp-input-4');
                    inputfirst.each(function () {
                        $(this).prop('disabled', false);
                    });
                }
                else {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'Correct word Guessed',
                        icon: 'success'
                    });
                    var inputfirst = $('.otp-input-4');
                    inputfirst.each(function () {
                        $(this).prop('disabled', true);
                    });
                }
            }, 300);
        });

    }
});


$(document).ready(function () {
    $('.otp-input-4').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendDataToBackend();
        }
    });

    function sendDataToBackend() {
        var inputs = $('.otp-input-4');
        var inputData = [];

        // Check if any input field is empty
        var isEmpty = false;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red'); // Set outline to red for empty input
            } else {
                inputData.push($(this).val());
                $(this).css('outline', ''); // Reset outline for non-empty input
            }
        });

        if (isEmpty) {
            // If any input field is empty, do not send the request
            console.log('Please fill all the input fields.');
            return;
        }

        // Select a random word from the list of possible words

        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                // Handle success response
                console.log('Data sent successfully:', response);
                // Update input field colors based on response
                updateInputFieldColors(response);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });
    }

    function updateInputFieldColors(response) {
        // Loop through response to update input field colors
        response.forEach(function (item, index) {
            var inputField = $('#otp-input-4' + index);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19');
                inputField.prop('disabled', true)
                // Set background color to green if state is 1
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey'); // Set background color to grey if state is 0
                inputField.prop('disabled', true)
            } else {
                inputField.css('background-color', ''); // Reset background color if state is -1
                inputField.prop('disabled', true)
            }
            setTimeout(function () {
                const count = item.count;
                if (count != 5) {
                    Swal.fire({
                        title: randomWord,
                        text: 'Is the correct word',
                        icon: 'warning'
                    });
                }
                else {
                    Swal.fire({
                        title: 'Congratulation!',
                        text: 'Correct word Guessed',
                        icon: 'success'
                    });

                }
            }, 300);
        });



    }
});
