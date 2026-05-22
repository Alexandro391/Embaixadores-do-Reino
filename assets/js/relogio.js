/* =========================================
   EMBAIXADORES DO REINO — relogio.js
   Hora e data em tempo real
   ========================================= */

function atualizarRelogio() {
  const agora = new Date();
  const diasSemana = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  const diaSemana = diasSemana[agora.getDay()];
  const dia = agora.getDate();
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();

  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');

  const dataFormatada = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  const horaFormatada = `${horas}:${minutos}:${segundos}`;

  const elHora = document.getElementById('relogio-hora');
  const elData = document.getElementById('relogio-data');
  if (elHora) elHora.textContent = horaFormatada;
  if (elData) elData.textContent = dataFormatada;
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
});
