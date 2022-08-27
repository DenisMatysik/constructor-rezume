const fileInput = document.querySelector("#photo"),
  formInput = document.querySelector(".inputs-container"),
  fioInput = document.querySelector("#fio"),
  birthInput = document.querySelector("#birthYear"),
  phoneNumberInput = document.querySelector("#phoneNumber"),
  emailInput = document.querySelector("#email"),
  formInputs = document.querySelectorAll(".input"),
  resumePhoto = document.querySelector("#resume-photo"),
  previewImg = document.querySelector(".previewImg"),
  submitForm = document.querySelector("#submitForm"),
  resumeFio = document.querySelector(".mainInf__item_fio p"),
  resumebirthYear = document.querySelector(".mainInf__item_birthYear p"),
  resumePhoneNumber = document.querySelector(".mainInf__item_phoneNumber p"),
  resumeEmail = document.querySelector(".mainInf__item_email p"),
  mainInf = document.querySelector(".mainInf"),
  addInformationTitle = document.querySelector("#addInformationTitle"),
  addInformationSubtitle = document.querySelector("#addInformationSubtitle"),
  addInformationValue = document.querySelector("#addInformationValue"),
  formNewInf = document.querySelector(".addNewInf"),
  formNewInfInputs = document.querySelectorAll(".addNewInfInput"),
  // 3part
  addNewBlockBtn = document.querySelector(".addNewBlockBtn"),
  newInfForm = document.querySelector(".newInfForm"),
  newInfFormInputs = document.querySelectorAll(".newInfFormInput"),
  newInfFormTitle = document.querySelector("#newInfForm__Title"),
  newInfFormSubtitle = document.querySelector("#newInfForm__Subtitle"),
  newInfFormValue = document.querySelector("#newInfForm__Value"),
  newFieldForm = document.querySelector(".newFieldForm"),
  newFieldFormInputs = document.querySelectorAll(".newFieldFormInput"),
  newFieldFormSubtitle = document.querySelector("#newFieldForm__Subtitle"),
  newFieldFormValue = document.querySelector("#newFieldForm__Value");

document.querySelector(".reload").addEventListener("click", () => {
  location.reload();
});

// показать превью фото
fileInput.addEventListener("change", () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.classList.remove("none");
  previewImg.src = URL.createObjectURL(file);
});

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const emptyInputs = Array.from(formInputs).filter(
    (input) => input.value === ""
  );
  formInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("error");
      console.log(input.id, "empty");
    } else {
      input.classList.remove("error");
    }
  });
  if (emptyInputs.length !== 0) {
    return false; // пока все инпуты не валидны ничего не отправиться
  }
  if (!validFullName(fioInput.value)) {
    fioInput.classList.add("error");
    return false;
  } else {
    fioInput.classList.remove("error");
  }

  if (!validBirth(birthInput.value)) {
    birthInput.classList.add("error");
    return false;
  } else {
    birthInput.classList.remove("error");
  }

  if (!validPhoneNumber(phoneNumberInput.value)) {
    phoneNumberInput.classList.add("error");
    return false;
  } else {
    phoneNumberInput.classList.remove("error");
  }

  if (!validEmail(emailInput.value)) {
    emailInput.classList.add("error");
    return false;
  } else {
    emailInput.classList.remove("error");
  }

  mainInf.classList.remove("none");
  if (fileInput.files.length != 0) {
    resumePhoto.src = URL.createObjectURL(fileInput.files[0]);
  } else resumePhoto.src = "";
  resumeFio.textContent = fioInput.value;
  resumebirthYear.textContent = birthInput.value;
  resumePhoneNumber.textContent = phoneNumberInput.value;
  resumeEmail.textContent = emailInput.value;
  formInput.reset();
  previewImg.classList.add("none");
  addNewBlockBtn.classList.toggle("none");
  document.querySelector(".constuctor").classList.add("none");
});
// функции валидации полей
const validFullName = (fio) => {
  const pattern = /^([a-zа-яё]+[\s]{0,1}[a-zа-яё]+[\s]{0,1}[a-zа-яё]+)$/gi;
  return pattern.test(String(fio).toLocaleLowerCase());
};
const validBirth = (date) => {
  const pattern =
    /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  return pattern.test(String(date).toLocaleLowerCase());
};
const validPhoneNumber = (phone) => {
  const pattern = /^[+]375 [(][0-9]{2}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;
  return pattern.test(String(phone).toLocaleLowerCase());
};
const validEmail = (email) => {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(String(email).toLocaleLowerCase());
};

// 3 part
addNewBlockBtn.addEventListener("click", () => {
  newInfForm.classList.toggle("none");
  if (newInfForm.className.includes("none")) {
    addNewBlockBtn.textContent = "Add new block";
  } else {
    addNewBlockBtn.textContent = "Close";
  }
  newInfForm.reset();
});

newInfForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emptyInputs = Array.from(newInfFormInputs).filter(
    (input) => input.value === ""
  );
  newInfFormInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("error");
      console.log(input.id, "empty");
    } else {
      input.classList.remove("error");
    }
  });
  if (emptyInputs.length !== 0) {
    return false;
  }
  mainInf.insertAdjacentHTML(
    "beforeend",
    `
  <div class="mainInf__item mainInf__item_${newInfFormTitle.value.toLocaleLowerCase()}">
  <h3>${newInfFormTitle.value}</h3>
  <div class="newInfFormInf"><span>${newInfFormSubtitle.value}</span> : <span>${
      newInfFormValue.value
    }</span></div>
  <button type="submit" class="addNewField">Add inf</button>
</div>
  `
  );

  document.querySelectorAll(".addNewField").forEach((input) => {
    let arrParrent = [];
    input.addEventListener("click", (e) => {
      arrParrent.push(e.target.parentNode.childNodes[3]);
      arrNodes = [...new Set(arrParrent)];
      newFieldForm.classList.remove("none");
    });
  });
  addNewBlockBtn.textContent = "Add new block";
  newInfForm.classList.toggle("none");
});
let arrNodes = [];

newFieldForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emptyInputs = Array.from(newFieldFormInputs).filter(
    (input) => input.value === ""
  );
  newFieldFormInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("error");
      console.log(input.id, "empty");
    } else {
      input.classList.remove("error");
    }
  });
  if (emptyInputs.length !== 0) {
    return false;
  }
  arrNodes[arrNodes.length - 1].insertAdjacentHTML(
    "beforeend",
    `
  <div class="newInfFormInf"><span>${newFieldFormSubtitle.value}</span> : <span>${newFieldFormValue.value}</span></div>
  `
  );
  newFieldForm.classList.add("none");
  newFieldForm.reset();
});
