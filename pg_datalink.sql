CREATE EXTENSION oracle_fdw;
CREATE SERVER wpd FOREIGN DATA WRAPPER oracle_fdw OPTIONS (dbserver '//BD01/PROD');
GRANT USAGE ON FOREIGN SERVER wpd TO hamb;
CREATE USER MAPPING FOR hamb SERVER wpd OPTIONS (user 'financeiro', password 'financeiro');

DROP FOREIGN TABLE IF EXISTS paciente;
CREATE FOREIGN TABLE paciente (
  id varchar(9) OPTIONS (key 'true') NOT NULL,
  nome varchar(70) NOT NULL,
  nome_mae varchar(70) NOT NULL,
  nascimento date NOT NULL,
  contato varchar(70) NOT NULL
) SERVER wpd
OPTIONS (table '(select COD_PRT, NOME_PAC, NOME_MAE, NASCIMENTO, CELULAR
from admwpd.FAPRTCAD)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS cid;
CREATE FOREIGN TABLE cid (
  id varchar(6) OPTIONS (key 'true') NOT NULL,
  diagnostico varchar(180) NOT NULL
) SERVER wpd
OPTIONS (table '(select COD_CID, DIAGNOSTICO
from admwpd.URCIDCAD)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS agenda;
CREATE FOREIGN TABLE agenda(
  id VARCHAR(8) OPTIONS (key 'true') NOT NULL,
  data date NOT NULL,
  hora date NOT NULL,
  cod_prov varchar(9) NOT NULL,
  cod_prt varchar(9) NOT NULL,
  cod_reg varchar(7) NOT NULL,
  nome_pac varchar(70) NOT NULL,
  cod_con varchar(3) NOT NULL,
  cod_sala varchar(4) NOT NULL,
  crm varchar(10) NOT NULL
) SERVER wpd
OPTIONS (table '(select IMAGNEXA.COD_AGENDA,
       admwpd.IMAGNCAD.DATA,
       admwpd.IMAGNCAD.HORA_INI,
       admwpd.IMAGNPAC.COD_PRT_PROV,
       admwpd.fapaccad.cod_prt,
       admwpd.IMAGNEXA.cod_pac,
       admwpd.IMAGNPAC.nome_pac,
       admwpd.fapaccad.COD_CON,
       admwpd.IMAGNCAD.COD_SALA,
       admwpd.FAPROCAD.CRM
FROM admwpd.IMAGNEXA
         INNER JOIN admwpd.IMAGNPAC ON admwpd.IMAGNPAC.Cod_Prt_Prov = admwpd.IMAGNEXA.Cod_Prt_Prov
         INNER JOIN admwpd.IMAGNCAD ON admwpd.IMAGNCAD.COD_AGENDA = admwpd.IMAGNEXA.COD_AGENDA
         INNER JOIN admwpd.FAPROCAD ON admwpd.IMAGNCAD.COD_PRO = admwpd.FAPROCAD.COD_PRO
         LEFT JOIN admwpd.fapaccad ON admwpd.fapaccad.COD_PAC = admwpd.IMAGNEXA.COD_PAC
         LEFT JOIN admwpd.faprtcad ON admwpd.faprtcad.cod_prt = admwpd.fapaccad.cod_prt
WHERE trim(admwpd.IMAGNEXA.COD_PAC) IS NOT NULL
ORDER BY admwpd.IMAGNPAC.nome_pac)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS convenio;
CREATE FOREIGN TABLE convenio (
  id VARCHAR(6) OPTIONS (key 'true') NOT NULL,
  fantasia varchar (180) NOT NULL
  ) SERVER wpd
  OPTIONS (table '(select COD_CON, FANTASIA
from admwpd.FACONCAD)', readonly 'true');









