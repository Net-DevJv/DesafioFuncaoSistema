using System.Collections.Generic;

namespace FI.WebAtividadeEntrevista.Models
{
    public class ListaBeneficiariosModel
    {
        public long IdCliente { get; set; }

        public List<BeneficiarioModel> Beneficiarios { get; set; }
    }
}