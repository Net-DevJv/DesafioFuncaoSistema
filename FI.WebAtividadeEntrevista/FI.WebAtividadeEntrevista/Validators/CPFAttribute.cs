using FI.WebAtividadeEntrevista.Utils;
using System.ComponentModel.DataAnnotations;

namespace FI.WebAtividadeEntrevista.Validators
{
    internal class CPFAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null || string.IsNullOrEmpty(value.ToString()))
                return true;

            return Util.ValidarCPF(value.ToString());
        }
    }
}