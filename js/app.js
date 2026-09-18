/* =========================
   CV PHOTO
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

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("দয়া করে একটি ছবি নির্বাচন করুন।");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {

            photoImage.src = event.target.result;

            photoArea.classList.add("has-photo");

            localStorage.setItem(
                "cv_profile_photo",
                event.target.result
            );
        };

        reader.readAsDataURL(file);
    });


    /* Load saved photo */

    const savedPhoto =
        localStorage.getItem("cv_profile_photo");

    if (savedPhoto) {

        photoImage.src = savedPhoto;

        photoArea.classList.add("has-photo");
    }
}


/* =========================
   CV INFORMATION
========================= */

const fields =
    document.querySelectorAll(".cv-field");

fields.forEach((field) => {

    const fieldName =
        field.dataset.field;

    if (!fieldName) {
        return;
    }


    /* Load saved value */

    const savedValue =
        localStorage.getItem("cv_" + fieldName);

    if (savedValue !== null) {
        field.value = savedValue;
    }


    /* Save while typing */

    field.addEventListener("input", () => {

        localStorage.setItem(
            "cv_" + fieldName,
            field.value
        );

    });

});


/* =========================
   PRINT
========================= */

const printButton =
    document.querySelector(".print-btn");

if (printButton) {

    printButton.addEventListener("click", () => {
        window.print();
    });

}


/* =========================
   CLEAR
========================= */

const clearButton =
    document.querySelector(".clear-btn");

if (clearButton) {

    clearButton.addEventListener("click", () => {

        const confirmClear = confirm(
            "CV-এর সব তথ্য ও ছবি মুছে ফেলবেন?"
        );

        if (!confirmClear) {
            return;
        }


        /* Clear text */

        fields.forEach((field) => {

            field.value = "";

            const fieldName =
                field.dataset.field;

            if (fieldName) {

                localStorage.removeItem(
                    "cv_" + fieldName
                );

            }

        });


        /* Clear photo */

        localStorage.removeItem(
            "cv_profile_photo"
        );

        if (photoImage) {
            photoImage.src = "";
        }

        if (photoArea) {
            photoArea.classList.remove(
                "has-photo"
            );
        }

        if (photoInput) {
            photoInput.value = "";
        }

    });

}
