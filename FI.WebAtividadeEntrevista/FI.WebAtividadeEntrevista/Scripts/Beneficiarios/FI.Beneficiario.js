$(document).ready(function (e) {
    var beneficiarios = [];

    var cpf = $("#CPFBeneficiario");
    cpf.mask('000.000.000-00');

    $('#formIncluirBeneficiario').submit(function (e) {
        e.preventDefault();

        var nomeBeneficiario = $('#NomeBeneficiario').val();
        var cpfBeneficiario = $('#CPFBeneficiario').val();

        if (beneficiarios.find(ben => ben.cpfBeneficiario === cpfBeneficiario)) {
            alert('CPF de beneficiário já cadastrado');
            return;
        }

        beneficiarios.push({ nomeBeneficiario, cpfBeneficiario });
        atualizarTabela(beneficiarios);

        $('#NomeBeneficiario').val('');
        $('#CPFBeneficiario').val('');
    })

    function atualizarTabela(lista) {
        const tabelaBody = document.querySelector("#beneficiariosTabela tbody");
        tabelaBody.innerHTML = "";

        lista.forEach((beneficiario, index) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.innerText = beneficiario.cpfBeneficiario;

            const colunaCPF = document.createElement("td");
            colunaCPF.innerText = beneficiario.nomeBeneficiario;

            const colunaAcoes = document.createElement("td");

            const botaoAlterar = document.createElement("button");
            botaoAlterar.textContent = "Alterar";
            botaoAlterar.classList.add("btn", "btn-primary");
            botaoAlterar.onclick = () => alterarBeneficiario(index);

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.classList.add("btn", "btn-primary");
            botaoRemover.onclick = () => removerBeneficiario(index);

            colunaAcoes.appendChild(botaoAlterar);
            colunaAcoes.appendChild(botaoRemover);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaCPF);
            linha.appendChild(colunaAcoes);

            tabelaBody.appendChild(linha);
        });
    }
    function removerBeneficiario(index) {
        beneficiarios.splice(index, 1);
        atualizarTabela(beneficiarios);
    }

    function alterarBeneficiario(index) {
        $('#NomeBeneficiario').val(beneficiarios[index].nomeBeneficiario);
        $('#CPFBeneficiario').val(beneficiarios[index].cpfBeneficiario);
        removerBeneficiario(index);
    }
})