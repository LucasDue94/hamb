CREATE EXTENSION oracle_fdw;
CREATE SERVER wpd FOREIGN DATA WRAPPER oracle_fdw OPTIONS (dbserver '//BD01/PROD');
GRANT USAGE ON FOREIGN SERVER wpd TO ambcor;
CREATE USER MAPPING FOR ambcor SERVER wpd OPTIONS (user 'financeiro', password 'financeiro');

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

drop foreign table paciente_agendado;
create foreign table paciente_agendado
    (
        id varchar(9) options (key 'true') not null,
        nome varchar(70) not null,
        nascimento date,
        convenio_id varchar(3),
        agenda_id varchar(8) not null,
        registro_id varchar(7),
        hora timestamp not null
        )
    server wpd
    options (table '(select ap.COD_PRT_PROV,
       ap.NOME_PAC,
       ap.NASCIMENTO,
       ap.COD_CON,
       exa.cod_agenda,
       trim(exa.COD_PAC),
       exa.hora_ini
from ADMWPD.IMAGNPAC ap left join ADMWPD.IMAGNEXA exa on exa.COD_PRT_PROV = ap.COD_PRT_PROV)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS registro_atendimento;
CREATE FOREIGN TABLE registro_atendimento(
    id VARCHAR(7) OPTIONS (key 'true') NOT NULL,
    origem char(1),
    convenio_id VARCHAR(3) not null,
    paciente_id varchar(9) not null
) SERVER wpd
OPTIONS (table '(select pac.COD_PAC,
       com.ORIGEM,
       pac.COD_CON,
       pac.COD_PRT
from ADMWPD.FAPACCAD pac inner join ADMWPD.FAPACCOM com on com.COD_PAC = pac.COD_PAC)', readonly 'true');

DROP FOREIGN TABLE IF EXISTS convenio;
CREATE FOREIGN TABLE convenio (
  id VARCHAR(6) OPTIONS (key 'true') NOT NULL,
  fantasia varchar (180) NOT NULL
  ) SERVER wpd
  OPTIONS (table '(select COD_CON, FANTASIA from admwpd.FACONCAD)', readonly 'true');


--TODO RUN IN PROD
alter table usuario alter column id set default nextval('usuario_id_seq'::regclass);
alter table usuario alter column version set default 0;
alter table usuario alter column senha_expirada set default false;
alter table usuario alter column expirado set default false;
alter table usuario alter column bloqueado set default false;
alter table atendimento alter column id set default nextval('atendimento_id_seq'::regclass);
alter table atendimento alter column version set default 0;






