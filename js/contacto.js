// ================================================================
// CONFIGURACIÓN EMAILJS
// Documentación: https://www.emailjs.com/docs/
//
// Pasos para configurar:
//  1. Crear cuenta gratuita en https://www.emailjs.com
//  2. Conectar cuenta de Gmail en "Email Services" → copiar el Service ID
//  3. Crear plantilla en "Email Templates":
//       - En el campo "To Email" poner el mail destinatario  ← CAMBIAR ACÁ
//       - Usar las variables: {{from_name}}, {{from_last_name}},
//         {{from_email}}, {{phone}}, {{subject}}, {{message}}
//     → Copiar el Template ID
//  4. Ir a "Account" → "General" → copiar la Public Key
//  5. Reemplazar los tres valores de abajo
// ================================================================

// Public Key de tu cuenta EmailJS (Account → General)
emailjs.init({ publicKey: "TU_PUBLIC_KEY" });

// ID del servicio de email conectado (Email Services)
const SERVICE_ID  = "TU_SERVICE_ID";

// ID de la plantilla creada (Email Templates)
// Recordar: el destinatario (ramirotrevisan@gmail.com u otro) se
// configura en el campo "To Email" dentro de la plantilla en el dashboard.
const TEMPLATE_ID = "TU_TEMPLATE_ID";

// ================================================================

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre  = document.getElementById("from_name").value.trim();
  const email   = document.getElementById("from_email").value.trim();
  const mensaje = document.getElementById("message").value.trim();
  const errorDiv   = document.getElementById("error-mensaje");
  const successDiv = document.getElementById("success-mensaje");

  // Validación
  let errors = "";
  if (!nombre)  errors += "El nombre es obligatorio.<br>";
  if (!email)   errors += "El email es obligatorio.<br>";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors += "El email no es válido.<br>";
  if (!mensaje) errors += "El mensaje es obligatorio.<br>";

  if (errors) {
    errorDiv.innerHTML = errors;
    errorDiv.classList.remove("hidden");
    successDiv.classList.add("hidden");
    return;
  }

  errorDiv.classList.add("hidden");

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
    () => {
      btn.disabled = false;
      btn.textContent = "Enviar mensaje";
      successDiv.classList.remove("hidden");
      this.reset();
    },
    (err) => {
      btn.disabled = false;
      btn.textContent = "Enviar mensaje";
      errorDiv.innerHTML = "Error al enviar. Por favor intente nuevamente.";
      errorDiv.classList.remove("hidden");
      console.error("EmailJS error:", err);
    }
  );
});
