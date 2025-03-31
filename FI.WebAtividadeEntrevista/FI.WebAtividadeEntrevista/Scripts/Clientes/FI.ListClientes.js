
$(document).ready(function () {

    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '30%'
                },
                CPF: {
                    title: 'CPF',
                    width: '20%',
                    display: function (data) {
                        // Apply the mask dynamically
                        var cpfMasked = data.record.CPF.replace(
                            /(\d{3})(\d{3})(\d{3})(\d{2})/,
                            "$1.$2.$3-$4"
                        );
                        return `<span>${cpfMasked}</span>`;
                    }
                },
                Email: {
                    title: 'Email',
                    width: '20%'
                },
                Alterar: {
                    width: '5%',
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                },
                Remover: {
                    width: '5%',
                    title: '',
                    display: function (data) {
                        return `
                        <button class="btn btn-danger btn-sm" onclick="confirmarRemocao(${data.record.Id})">Remover</button>
                    `;
                    }
                }
            }
        });


    //Load student list from server
    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable('load');
})

function confirmarRemocao(id) {
    if (confirm("Tem certeza que deseja remover este cliente e seus beneficiários? Essa ação é irreversível!")) {
        // Call the controller action via AJAX
        $.ajax({
            url: `${urlExcluir}/${id}`,
            type: 'POST',
            success: function (response) {
                alert("Cliente removido com sucesso!");
                $('#gridClientes').jtable('reload'); // Reload the jTable to reflect changes
            },
            error: function (xhr, status, error) {
                alert("Ocorreu um erro ao remover o cliente");
            }
        });
    }
}