﻿CREATE PROCEDURE FI_SP_ConsBeneficiarioPorIdCliente
	@IDCLIENTE BIGINT
AS
BEGIN
	SELECT ID, CPF, NOME, IDCLIENTE FROM BENEFICIARIOS (NOLOCK) WHERE IDCLIENTE = @IDCLIENTE
END
GO