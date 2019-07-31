CREATE EXTENSION oracle_fdw;
CREATE SERVER wpd FOREIGN DATA WRAPPER oracle_fdw OPTIONS (dbserver '//BD01/PROD');
GRANT USAGE ON FOREIGN SERVER wpd TO hamb;
CREATE USER MAPPING FOR hamb SERVER wpd OPTIONS (user 'financeiro', password 'financeiro');

DROP FOREIGN TABLE IF EXISTS paciente;
CREATE FOREIGN TABLE paciente (
  id varchar(9) OPTIONS (key 'true') NOT NULL,
  nome varchar(70) NOT NULL,
  nome_mae varchar(70) NOT NULL,
  data_nasc date NOT NULL,
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

DROP FOREIGN TABLE IF EXISTS sala;
CREATE FOREIGN TABLE sala(
    codigo varchar(4) OPTIONS (key 'true') NOT NULL,
    unidade varchar(6) OPTIONS (key 'true') NOT NULL,
    nome varchar(30) NOT NULL
    ) SERVER wpd
OPTIONS (table '(select COD_SALA, COD_UNI, DESCRICAO from ADMWPD.IMSALCAD)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS agenda;
CREATE FOREIGN TABLE agenda(
  id VARCHAR(8) OPTIONS (key 'true') NOT NULL,
  crm varchar(10) NOT NULL,
  data_hora TIMESTAMP NOT NULL,
  sala_codigo varchar(4) NOT NULL,
  sala_unidade varchar(6) NOT NULL
) SERVER wpd
OPTIONS (table '(select COD_AGENDA,
       CRM,
       TO_DATE(TO_CHAR(DATA, ''DD/MM/YYYY'') || '' '' || TO_CHAR(HORA_INI, ''HH24:MI''), ''DD/MM/YYYY HH24:MI'') as DATA_HORA,
       COD_SALA,
       COD_UNI
from ADMWPD.IMAGNCAD agn
    inner join ADMWPD.FAPROCAD pro on pro.COD_PRO = agn.COD_PRO)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS registro_atendimento;
CREATE FOREIGN TABLE registro_atendimento(
    id VARCHAR(7) OPTIONS (key 'true') NOT NULL,
    origem char(1) not null,
    convenio_id VARCHAR(3) not null,
    paciente_id varchar(9) not null
) SERVER wpd
OPTIONS (table '(select COD_PAC,
       TIP_ATEND,
       COD_CON,
       COD_PRT
from ADMWPD.FAPACCAD)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS convenio;
CREATE FOREIGN TABLE convenio (
  id VARCHAR(6) OPTIONS (key 'true') NOT NULL,
  fantasia varchar (180) NOT NULL
  ) SERVER wpd
  OPTIONS (table '(select COD_CON, FANTASIA from admwpd.FACONCAD)', readonly 'true');









