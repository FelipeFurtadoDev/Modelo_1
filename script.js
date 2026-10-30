/* ==========================================================
   CONFIGURAÇÃO DO WHATSAPP
   Deixe vazio ("") enquanto o site for só demonstração.
   Para ativar, escreva só números, com país e DDD.
   Exemplo (fictício): "5511999999999"
   ========================================================== */
const WHATSAPP_NUMBER = "";

// Mensagem inicial neutra (não pede nenhuma informação pessoal ou de saúde)
const WHATSAPP_MESSAGE = "Olá! Encontrei seu site e gostaria de informações sobre os atendimentos.";

// Avisa o CSS que o JavaScript funcionou (usado no menu móvel)
document.documentElement.classList.add("js");

/* ---------- Menu móvel ---------- */
const botaoMenu = document.querySelector(".menu-toggle");
const listaMenu = document.getElementById("menu-principal");

function abrirMenu(abrir) {
  listaMenu.classList.toggle("aberto", abrir);
  botaoMenu.setAttribute("aria-expanded", String(abrir));
}

botaoMenu.addEventListener("click", () => {
  abrirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
});

// Fecha ao clicar em um link do menu
listaMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) abrirMenu(false);
});

// Fecha com a tecla Esc e devolve o foco ao botão
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
    abrirMenu(false);
    botaoMenu.focus();
  }
});

/* ---------- Botões de WhatsApp ---------- */
const numeroValido = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
const aviso = document.getElementById("whatsapp-aviso");

document.querySelectorAll("[data-whatsapp]").forEach((botao) => {
  if (numeroValido) {
    botao.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
  } else {
    // Sem número: o botão NÃO finge funcionar, apenas explica
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      aviso.textContent = "Contato demonstrativo: nenhum número foi configurado. Em um site real, este botão abriria o WhatsApp da profissional.";
      document.getElementById("contato").scrollIntoView();
    });
  }
});