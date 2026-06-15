// ------ Contact Form: dual-mode (Mail + WhatsApp) ----------------------------
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const mailTab = document.querySelector('[data-mode="mail"]');
  const waTab = document.querySelector('[data-mode="whatsapp"]');
  const pill = document.querySelector(".cf-tab-pill");
  const emailOpt = document.getElementById("cfEmailOpt");
  const contactOpt = document.getElementById("cfContactOpt");
  const subjectBlock = document.getElementById("cfSubjectBlock");
  const submitBtn = document.getElementById("cfSubmitBtn");
  const btnIcon = document.getElementById("cfBtnIcon");
  const btnText = document.getElementById("cfBtnText");
  const toast = document.getElementById("cfToast");
  const toastIcon = document.getElementById("cfToastIcon");
  const toastMsg = document.getElementById("cfToastMsg");
  const toastClose = document.getElementById("cfToastClose");

  // Field refs
  const nameInput = document.getElementById("cf-name");
  const emailInput = document.getElementById("cf-email");
  const contactInput = document.getElementById("cf-contact");
  const subjectInput = document.getElementById("cf-subject");
  const msgInput = document.getElementById("cf-message");

  // Inline error span refs (all fields have one)
  const nameErr = document.getElementById("cf-name-error");
  const emailErr = document.getElementById("cf-email-error");
  const contactErr = document.getElementById("cf-contact-error");
  const subjectErr = document.getElementById("cf-subject-error");
  const msgErr = document.getElementById("cf-message-error");

  let mode = "mail";
  let switching = false;
  let toastTimer;

  // ------ Independent state preservation ----------------------------
  // Each form stores its own field values so switching tabs never
  // loses what the user has already typed.
  const state = {
    mail: { name: "", email: "", subject: "", message: "" },
    whatsapp: { name: "", contact: "", message: "" },
  };

  function saveState() {
    if (mode === "mail") {
      state.mail.name = nameInput.value;
      state.mail.email = emailInput.value;
      state.mail.subject = subjectInput.value;
      state.mail.message = msgInput.value;
    } else {
      state.whatsapp.name = nameInput.value;
      state.whatsapp.contact = contactInput.value;
      state.whatsapp.message = msgInput.value;
    }
  }

  function restoreState(newMode) {
    if (newMode === "mail") {
      nameInput.value = state.mail.name;
      emailInput.value = state.mail.email;
      subjectInput.value = state.mail.subject;
      msgInput.value = state.mail.message;
    } else {
      nameInput.value = state.whatsapp.name;
      contactInput.value = state.whatsapp.contact;
      msgInput.value = state.whatsapp.message;
    }
  }

  function clearState(clearedMode) {
    if (clearedMode === "mail") {
      state.mail = { name: "", email: "", subject: "", message: "" };
    } else {
      state.whatsapp = { name: "", contact: "", message: "" };
    }
    if (clearedMode === mode) {
      nameInput.value =
        emailInput.value =
        contactInput.value =
        subjectInput.value =
        msgInput.value =
          "";
    }
  }

  // ------ Toast ----------------------------
  function showToast(type, msg) {
    clearTimeout(toastTimer);
    toastIcon.className =
      type === "success"
        ? "cf-toast-icon fas fa-check-circle"
        : "cf-toast-icon fas fa-exclamation-circle";
    toastMsg.textContent = msg;
    toast.dataset.type = type;
    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add("cf-toast--in");
    toastTimer = setTimeout(hideToast, 5000);
  }

  function hideToast() {
    toast.classList.remove("cf-toast--in");
    toast.addEventListener(
      "transitionend",
      () => {
        toast.hidden = true;
      },
      { once: true },
    );
  }

  toastClose.addEventListener("click", hideToast);

  // ------ Tab switching ----------------------------
  function switchTo(newMode) {
    if (newMode === mode || switching) return;
    saveState();
    switching = true;
    mode = newMode;
    const toMail = newMode === "mail";

    mailTab.classList.toggle("cf-tab--active", toMail);
    waTab.classList.toggle("cf-tab--active", !toMail);
    mailTab.setAttribute("aria-selected", toMail);
    waTab.setAttribute("aria-selected", !toMail);
    pill.style.transform = toMail ? "translateX(0%)" : "translateX(100%)";

    emailOpt.classList.toggle("cf-partner-opt--active", toMail);
    contactOpt.classList.toggle("cf-partner-opt--active", !toMail);
    subjectBlock.classList.toggle("cf-subject-block--in", toMail);
    subjectBlock.classList.toggle("cf-subject-block--out", !toMail);

    // Clear any leftover error styles from the previous mode
    clearAllErrors();
    restoreState(newMode); // reload saved values for new mode
    resetBtn();

    setTimeout(() => {
      switching = false;
    }, 700);
  }

  mailTab.addEventListener("click", () => switchTo("mail"));
  waTab.addEventListener("click", () => switchTo("whatsapp"));

  // ------ Error helpers ----------------------------
  function setFieldError(input, msgEl, message, shake = true) {
    input.closest(".cf-field").classList.add("cf-error");
    if (msgEl && message) {
      msgEl.textContent = message;
      msgEl.classList.add("cf-field-error--visible");
    }
    if (!shake) return;
    // Shake only on submit (caller controls this)
    input.classList.remove("cf-shake");
    void input.offsetWidth;
    input.classList.add("cf-shake");
    input.addEventListener(
      "animationend",
      () => input.classList.remove("cf-shake"),
      { once: true },
    );
  }

  function clearFieldError(input, msgEl) {
    input.closest(".cf-field")?.classList.remove("cf-error");
    if (msgEl) {
      msgEl.textContent = "";
      msgEl.classList.remove("cf-field-error--visible");
    }
  }

  function clearAllErrors() {
    form
      .querySelectorAll(".cf-field")
      .forEach((f) => f.classList.remove("cf-error"));
    [nameErr, emailErr, contactErr, subjectErr, msgErr].forEach((el) => {
      if (el) {
        el.textContent = "";
        el.classList.remove("cf-field-error--visible");
      }
    });
  }

  // ------ Field validators ----------------------------
  // Pure functions: { valid: boolean, message?: string }
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const WA_VALID_RE = /^\+?[0-9]*$/;

  // Each "word" is alphabetic, optionally containing internal
  // apostrophes/hyphens (e.g. "O'Brien", "Anne-Marie"). At least two
  // such words, separated by single spaces, are required.
  const NAME_WORD_RE = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;

  function validateFullName(raw) {
    const normalized = raw.trim().replace(/\s+/g, " ");
    if (!normalized) {
      return { valid: false, message: "Full name is required." };
    }
    const words = normalized.split(" ");
    if (words.length < 2 || !words.every((w) => NAME_WORD_RE.test(w))) {
      return {
        valid: false,
        message: "Please enter your first and last name.",
      };
    }
    return { valid: true };
  }

  function validateEmail(raw) {
    const val = raw.trim();
    if (!val) return { valid: false, message: "Email is required" };
    if (!EMAIL_RE.test(val)) {
      const message = !val.includes("@")
        ? "Missing @ sign"
        : !val.split("@")[1]?.includes(".")
          ? "Missing domain (e.g. gmail.com)"
          : "Enter a valid email address";
      return { valid: false, message };
    }
    return { valid: true };
  }

  function validateWhatsApp(raw) {
    const val = raw.trim();
    if (!val) {
      return { valid: false, message: "WhatsApp number is required" };
    }
    if (val.length < 7) {
      return { valid: false, message: "Number too short" };
    }
    if (!WA_VALID_RE.test(val)) {
      return {
        valid: false,
        message: "Only digits and a leading + are allowed",
      };
    }
    return { valid: true };
  }

  function validateSubject(raw) {
    return raw.trim()
      ? { valid: true }
      : { valid: false, message: "Subject is required" };
  }

  function validateMessage(raw) {
    return raw.trim()
      ? { valid: true }
      : { valid: false, message: "Message is required" };
  }

  // ------ Submit-button gating ----------------------------
  // The "Send Message" button stays disabled until every required
  // field for the active mode passes validation, and re-disables the
  // instant any field becomes invalid again.
  function isFormValid() {
    if (!validateFullName(nameInput.value).valid) return false;
    if (!validateMessage(msgInput.value).valid) return false;

    if (mode === "mail") {
      if (!validateEmail(emailInput.value).valid) return false;
      if (!validateSubject(subjectInput.value).valid) return false;
    } else {
      if (!validateWhatsApp(contactInput.value).valid) return false;
    }
    return true;
  }

  function updateSubmitState() {
    submitBtn.disabled = !isFormValid();
  }

  // ------ Real-time validation ----------------------------

  // Full Name: live strict validation as the user types.
  nameInput.addEventListener("input", () => {
    const val = nameInput.value;
    if (!val.trim()) {
      clearFieldError(nameInput, nameErr);
    } else {
      const { valid, message } = validateFullName(val);
      if (!valid) {
        nameInput.closest(".cf-field").classList.add("cf-error");
        nameErr.textContent = message;
        nameErr.classList.add("cf-field-error--visible");
      } else {
        clearFieldError(nameInput, nameErr);
      }
    }
    updateSubmitState();
  });

  // Normalize spacing once the user leaves the field.
  nameInput.addEventListener("blur", () => {
    const normalized = nameInput.value.trim().replace(/\s+/g, " ");
    if (normalized !== nameInput.value) nameInput.value = normalized;
  });

  // Email: clear error once value is valid; flag immediately on bad input
  emailInput.addEventListener("input", () => {
    const val = emailInput.value;
    if (!val) {
      clearFieldError(emailInput, emailErr);
    } else {
      const { valid, message } = validateEmail(val);
      if (!valid) {
        emailInput.closest(".cf-field").classList.add("cf-error");
        emailErr.textContent = message;
        emailErr.classList.add("cf-field-error--visible");
      } else {
        clearFieldError(emailInput, emailErr);
      }
    }
    updateSubmitState();
  });

  // WhatsApp: strip invalid characters in real-time + show error
  contactInput.addEventListener("input", () => {
    const raw = contactInput.value;
    const cleaned = raw
      .replace(/[^0-9+]/g, "") // strip non-digit/non-+
      .replace(/(?!^\+)\+/g, ""); // keep + only at index 0
    if (cleaned !== raw) contactInput.value = cleaned;

    if (!cleaned) {
      clearFieldError(contactInput, contactErr);
    } else if (!WA_VALID_RE.test(cleaned)) {
      contactInput.closest(".cf-field").classList.add("cf-error");
      contactErr.textContent = "Only digits and a leading + are allowed";
      contactErr.classList.add("cf-field-error--visible");
    } else {
      clearFieldError(contactInput, contactErr);
    }
    updateSubmitState();
  });

  // Generic: clear error once field has content (subject, message),
  // and keep the submit button state in sync for every keystroke.
  form.addEventListener("input", (e) => {
    const t = e.target;
    if (t === nameInput || t === emailInput || t === contactInput) return;
    if (t.value.trim()) clearFieldError(t, null);
    updateSubmitState();
  });

  // ------ Submit-time validation ----------------------------
  function validate() {
    let ok = true;

    const nameCheck = validateFullName(nameInput.value);
    if (!nameCheck.valid) {
      setFieldError(nameInput, nameErr, nameCheck.message);
      ok = false;
    }

    const msgCheck = validateMessage(msgInput.value);
    if (!msgCheck.valid) {
      setFieldError(msgInput, msgErr, msgCheck.message);
      ok = false;
    }

    if (mode === "mail") {
      const emailCheck = validateEmail(emailInput.value);
      if (!emailCheck.valid) {
        setFieldError(emailInput, emailErr, emailCheck.message);
        ok = false;
      }
      const subjectCheck = validateSubject(subjectInput.value);
      if (!subjectCheck.valid) {
        setFieldError(subjectInput, subjectErr, subjectCheck.message);
        ok = false;
      }
    } else {
      const waCheck = validateWhatsApp(contactInput.value);
      if (!waCheck.valid) {
        setFieldError(contactInput, contactErr, waCheck.message);
        ok = false;
      }
    }

    return ok;
  }

  // ------ Button helpers ----------------------------
  function resetBtn() {
    submitBtn.classList.remove("cf-btn--success");
    btnIcon.className = "fas fa-paper-plane";
    btnText.textContent = "Send Message";
    updateSubmitState();
  }

  function setBtnLoading() {
    submitBtn.disabled = true;
    btnIcon.className = "fas fa-spinner fa-spin";
    btnText.textContent = "Sending\u2026";
  }

  function setBtnSuccess() {
    submitBtn.disabled = false;
    submitBtn.classList.add("cf-btn--success");
    btnIcon.className = "fas fa-check";
    btnText.textContent = "Sent!";
  }

  // ------ Submit ----------------------------
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validate()) return;

    const submittedMode = mode;

    // ------ WhatsApp path ------
    if (submittedMode === "whatsapp") {
      const name = nameInput.value.trim();
      const tel = contactInput.value.trim();
      const msg = msgInput.value.trim();
      const text = encodeURIComponent(
        `Hi Ubaid,\n\nMy name is ${name}.\n\n${msg}\n\n— My WhatsApp: ${tel}`,
      );
      window.open(`https://wa.me/923360973607?text=${text}`, "_blank");
      clearState("whatsapp");
      clearAllErrors();
      showToast(
        "success",
        "Redirected to WhatsApp! If it didn\u2019t open automatically, please try again.",
      );
      updateSubmitState();
      return;
    }

    // ------ Mail path ------
    setBtnLoading();

    const formData = new FormData(form);
    let success = false;
    try {
      const res = await fetch("https://formspree.io/f/maqagzyg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      success = res.ok;
    } catch (_) {
      success = false;
    }

    await new Promise((r) => setTimeout(r, 3000));

    if (success) {
      setBtnSuccess();
      showToast(
        "success",
        "Message sent successfully. You will receive a reply within 24 hours or possibly longer. We appreciate your patience.",
      );
      setTimeout(() => {
        clearState("mail");
        clearAllErrors();
        resetBtn();
      }, 3000);
    } else {
      resetBtn();
      showToast(
        "error",
        "Something went wrong and your message could not be sent. Please try again or email me directly.",
      );
    }
  });

  // ------ Initial state ----------------------------
  // Covers browser autofill pre-populating fields before scripts run.
  updateSubmitState();
})();
