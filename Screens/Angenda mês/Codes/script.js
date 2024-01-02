document.addEventListener("DOMContentLoaded", function () {

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const hoje = new Date();
    let anoAtual = hoje.getFullYear();
    let mesAtual = hoje.getMonth();

    const mesElement = document.getElementById("mes");
    const anoElement = document.getElementById("ano");
    const diasElement = document.getElementById("dias");

    function diasNoMes(ano, mes) {
        return new Date(ano, mes + 1, 0).getDate();
    }

    // Função para verificar se uma data é um evento
    function isEvento(ano, mes, dia) {
        const eventos = [
            { ano: 2024, mes: 4, dia: 25 },
            { ano: 2023, mes: 12, dia: 24 },
            { ano: 2024, mes: 1, dia: 4 },
            { ano: 2024, mes: 2, dia: 15 }
        ];

        return eventos.some(evento => evento.ano === ano && evento.mes === mes && evento.dia === dia);
    }

    function preencherCalendario(ano, mes) {
        diasElement.innerHTML = "";

        mesElement.textContent = meses[mes];
        anoElement.textContent = ano;

        const primeiroDia = new Date(ano, mes, 1);
        const primeiroDiaSemana = primeiroDia.getDay();

        const ultimoDiaDoMes = diasNoMes(ano, mes);

        const dias = [];

        // Preencher dias do mês anterior
        for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
            const dia = diasNoMes(ano, mes - 1) - i;
            dias.push({ dia, outroMes: true });
        }

        // Preencher dias do mês atual
        for (let i = 1; i <= ultimoDiaDoMes; i++) {
            dias.push({ dia: i, outroMes: false, evento: isEvento(ano, mes, i) });
        }

        // Preencher dias do próximo mês até completar a tabela
        const diasRestantes = 42 - dias.length; // 6 linhas x 7 colunas
        for (let i = 1; i <= diasRestantes; i++) {
            dias.push({ dia: i, outroMes: true, evento: isEvento(ano, mes + 1, i) });
        }

        // Renderizar a tabela
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                const dia = dias[i * 7 + j].dia;
                cell.textContent = dia;
                if (dias[i * 7 + j].outroMes) {
                    cell.classList.add("outro-mes");
                }
                if (dias[i * 7 + j].evento) {
                    cell.classList.add("evento");
                }
                row.appendChild(cell);
            }
            diasElement.appendChild(row);
        }
    }

    function atualizarEventos() {
        const eventosCells = document.querySelectorAll(".evento");
        eventosCells.forEach(cell => {
            const dataEvento = cell.textContent;
            const diaEvento = parseInt(dataEvento);
            if (!isEvento(anoAtual, mesAtual, diaEvento)) {
                cell.classList.remove("evento");
            }
        });
    }

    preencherCalendario(anoAtual, mesAtual);
    atualizarEventos();

    document.getElementById("botaoir").addEventListener("click", function () {
        mesAtual = (mesAtual + 1) % 12;
        if (mesAtual === 0) {
            anoAtual++;
        }
        preencherCalendario(anoAtual, mesAtual);
        atualizarEventos();
    });

    document.getElementById("botaovoltar").addEventListener("click", function () {
        mesAtual = (mesAtual - 1 + 12) % 12;
        if (mesAtual === 11) {
            anoAtual--;
        }
        preencherCalendario(anoAtual, mesAtual);
        atualizarEventos();
    });
});