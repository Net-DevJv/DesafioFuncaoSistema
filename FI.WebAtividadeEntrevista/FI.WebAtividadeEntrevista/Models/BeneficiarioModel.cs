using FI.WebAtividadeEntrevista.Validators;
using System.ComponentModel.DataAnnotations;

namespace FI.WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Beneficiário
    /// </summary>
    public class BeneficiarioModel
    {
        /// <summary>
        /// Id do Beneficiário
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// CPF do Beneficiário
        /// </summary>
        [Required]
        [StringLength(11)]
        [CPF]
        public string CPF { get; set; }

        /// <summary>
        /// Nome do Beneficiário
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Id do Cliente ao qual o Beneficiário está vinculado
        /// </summary>
        public long IdCliente { get; set; }
    }
}