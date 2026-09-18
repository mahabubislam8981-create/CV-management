document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       PHOTO UPLOAD
    ========================= */

    const photoArea = document.querySelector(".photo-area");
    const photoInput = document.querySelector(".photo-input");
    const photoImage = document.querySelector(".photo-area img");

    if (photoArea && photoInput && photoImage) {

        photoArea.addEventListener("click", () => {
            photoInput.click();
        });

        photoInput.addEventListener("change", (event) => {
            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("দয়া করে একটি ছবি নির্বাচন করুন।");
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                photoImage.src = e.target.result;
                photoArea.classList.add("has-photo");
            };

            reader.readAsDataURL(file);
        });
    }


    /* =========================
       CAMERA SUPPORT
    ========================= */

    const cameraButton = document.querySelector(".camera-btn");

    if (cameraButton && photoInput) {

        cameraButton.addEventListener("click", () => {
            photoInput.setAttribute("capture", "environment");
            photoInput.click();
        });
    }


    /* =========================
       FILE UPLOAD SUPPORT
    ========================= */

    const fileButton = document.querySelector(".file-btn");

    if (fileButton && photoInput) {

        fileButton.addEventListener("click", () => {
            photoInput.removeAttribute("capture");
            photoInput.click();
        });
    }


    /* =========================
       AUTO SAVE FORM DATA
    ========================= */

    const fields = document.querySelectorAll(".cv-field");

    fields.forEach((field) => {

        const fieldName = field.dataset.field;

        if (!fieldName) return;

        const savedValue = localStorage.getItem(
            "cv_" + fieldName
        );

        if (savedValue !== null) {
            field.value = savedValue;
        }

        field.addEventListener("input", () => {
            localStorage.setItem(
                "cv_" + fieldName,
                field.value
            );
        });
    });


    /* =========================
       CLEAR CV DATA
    ========================= */

    const clearButton = document.querySelector(".clear-btn");

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            const confirmClear = confirm(
                "আপনি কি CV-এর সব তথ্য মুছে ফেলতে চান?"
            );

            if (!confirmClear) return;

            fields.forEach((field) => {
                field.value = "";

                const fieldName = field.dataset.field;

                if (fieldName) {
                    localStorage.removeItem(
                        "cv_" + fieldName
                    );
                }
            });

            if (photoImage) {
                photoImage.src = "";
            }

            if (photoArea) {
                photoArea.classList.remove("has-photo");
            }

            if (photoInput) {
                photoInput.value = "";
            }
        });
    }


    /* =========================
       PRINT CV
    ========================= */

    const printButton = document.querySelector(".print-btn");

    if (printButton) {

        printButton.addEventListener("click", () => {
            window.print();
        });
    }

});
