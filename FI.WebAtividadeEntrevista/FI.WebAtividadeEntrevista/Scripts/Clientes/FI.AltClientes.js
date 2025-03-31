var beneficiarios = [];
var beneficiarioIndex = -1;
var alterarBeneficiarioId = -1;

$(document).ready(function () {
    var cpf = $("#CPF");
    cpf.mask('000.000.000-00');

    var cpf = $("#CPFBeneficiario");
    cpf.mask('000.000.000-00');

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #CPF').val(aplicarMascaraCPF(obj.CPF));
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        atualizarTabela(alterarCamposBeneficiario(obj.Beneficiarios));
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "CPF": $(this).find("#CPF").val().replace(/[-.]/g, ''),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Beneficiarios": beneficiarios
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    })

    $('#formIncluirBeneficiario').submit(function (e) {
        e.preventDefault();
        var nome = $('#NomeBeneficiario').val();
        var cpf = $('#CPFBeneficiario').val().replace(/[-.]/g, '');

        if (beneficiarios.find(ben => ben.cpf === cpf)) {
            alert('CPF de beneficiário já cadastrado');
            return;
        }

        if (beneficiarioIndex === -1) {
            beneficiarios.push({ nome, cpf });
        } else {
            beneficiarios.push({ nome, cpf, id: alterarBeneficiarioId });
            beneficiarioIndex = -1;
            alterarBeneficiarioId = -1;
        }
        atualizarTabela(beneficiarios);

        $('#NomeBeneficiario').val('');
        $('#CPFBeneficiario').val('');
    })
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

const aplicarMascaraCPF = cpf => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

function alterarCamposBeneficiario(beneficiarios) {
    var novaListaBeneficiarios = [];

    beneficiarios.forEach(beneficiario => {
        novaListaBeneficiarios.push({ nome: beneficiario.Nome, cpf: beneficiario.CPF, id: beneficiario.Id, idCliente: beneficiario.IdCliente })
    });

    return novaListaBeneficiarios;
}

function atualizarTabela(lista) {
    beneficiarios = lista;
    const tabelaBody = document.querySelector("#beneficiariosTabela tbody");
    tabelaBody.innerHTML = "";

    lista.forEach((beneficiario, index) => {
        const linha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.innerText = aplicarMascaraCPF(beneficiario.cpf);

        const colunaCPF = document.createElement("td");
        colunaCPF.innerText = beneficiario.nome;

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
    $('#NomeBeneficiario').val(beneficiarios[index].nome);
    $('#CPFBeneficiario').val(aplicarMascaraCPF(beneficiarios[index].cpf));
    alterarBeneficiarioId = beneficiarios[index].id;
    removerBeneficiario(index);

    beneficiarioIndex = index;
}