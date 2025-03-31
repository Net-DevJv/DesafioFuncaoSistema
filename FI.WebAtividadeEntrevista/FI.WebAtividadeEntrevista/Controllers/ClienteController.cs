using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }

            if (model.Beneficiarios == null || !model.Beneficiarios.Any())
            {
                Response.StatusCode = 400;
                return Json("É necessário incluir pelo menos um beneficiário para salvar o cliente.");
            }

            if (boCliente.VerificarExistencia(model.CPF))
            {
                Response.StatusCode = 400;
                return Json("CPF já cadastrado");
            }

            model.Id = boCliente.Incluir(new Cliente()
            {
                CEP = model.CEP,
                Cidade = model.Cidade,
                Email = model.Email,
                Estado = model.Estado,
                Logradouro = model.Logradouro,
                Nacionalidade = model.Nacionalidade,
                Nome = model.Nome,
                Sobrenome = model.Sobrenome,
                CPF = model.CPF,
                Telefone = model.Telefone
            });

            foreach (var beneficiario in model.Beneficiarios)
            {
                boBeneficiario.Incluir(new Beneficiario()
                {
                    CPF = beneficiario.CPF,
                    IdCliente = model.Id,
                    Nome = beneficiario.Nome
                });
            }

            return Json("Cadastro efetuado com sucesso");
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                Cliente clienteExistente = boCliente.Consultar(model.Id);
                if (clienteExistente.CPF != model.CPF && boCliente.VerificarExistencia(model.CPF))
                {
                    Response.StatusCode = 400;
                    return Json("CPF já cadastrado");
                }

                boCliente.Alterar(new Cliente()
                {
                    Id = model.Id,
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    CPF = model.CPF,
                    Telefone = model.Telefone
                });

                List<Beneficiario> beneficiariosExistentes = boBeneficiario.ListarPorIdCliente(model.Id);
                foreach (var beneficiario in beneficiariosExistentes)
                {
                    var beneficiarioSelecionado = model.Beneficiarios?.Where(ben => ben.CPF == beneficiario.CPF).FirstOrDefault();
                    if (beneficiarioSelecionado != null)
                    {
                        boBeneficiario.Alterar(new Beneficiario()
                        {
                            Id = beneficiario.Id,
                            CPF = beneficiario.CPF,
                            IdCliente = model.Id,
                            Nome = beneficiarioSelecionado.Nome
                        });
                    }
                    else
                        boBeneficiario.Excluir(beneficiario.Id);
                }

                if (model.Beneficiarios != null)
                {
                    foreach (var item in model.Beneficiarios.Where(ben => ben.Id == 0))
                    {
                        boBeneficiario.Incluir(new Beneficiario()
                        {
                            CPF = item.CPF,
                            IdCliente = model.Id,
                            Nome = item.Nome
                        });
                    }
                }

                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();
            Cliente cliente = boCliente.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                List<Beneficiario> beneficiarioLista = boBeneficiario.ListarPorIdCliente(cliente.Id);
                List<BeneficiarioModel> beneficiarioModelLista = new List<BeneficiarioModel>();

                foreach (var beneficiario in beneficiarioLista)
                {
                    beneficiarioModelLista.Add(new BeneficiarioModel()
                    {
                        Id = beneficiario.Id,
                        CPF = beneficiario.CPF,
                        IdCliente = beneficiario.IdCliente,
                        Nome = beneficiario.Nome
                    });
                }

                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    CPF = cliente.CPF,
                    Telefone = cliente.Telefone,
                    Beneficiarios = beneficiarioModelLista
                };
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            try
            {
                BoCliente boCliente = new BoCliente();
                BoBeneficiario boBeneficiario = new BoBeneficiario();

                boCliente.Excluir(id);

                var beneficiarios = boBeneficiario.ListarPorIdCliente(id);
                foreach (var beneficiario in beneficiarios)
                {
                    boBeneficiario.Excluir(beneficiario.Id);
                }

                return Json("Cadastro excluído com sucesso");
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return Json(ex.Message);
            }
        }
    }
}