using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiário
        /// </summary>
        /// <param name="beneficiario">Objeto do beneficiário</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiário existente.
        /// </summary>
        /// <param name="beneficiario">Objeto do beneficiário.</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }

        /// <summary>
        /// Exclui o beneficiário pelo id.
        /// </summary>
        /// <param name="id">Id do beneficiário.</param>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiários de um determinado cliente.
        /// </summary>
        /// <param name="idCliente">Id do cliente.</param>
        public List<Beneficiario> ListarPorIdCliente(long idCliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.ListarPorIdCliente(idCliente);
        }

        /// <summary>
        /// Verifica se já existe um beneficiário com este CPF para o mesmo cliente.
        /// </summary>
        /// <param name="cpf">CPF a verificar.</param>
        /// <param name="idCliente">Id do cliente.</param>
        private bool VerificarExistencia(string cpf, long idCliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.VerificarExistencia(cpf, idCliente);
        }
    }
}
