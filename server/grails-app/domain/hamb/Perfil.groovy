package hamb

class Perfil {
    public static final Long ADMIN = 1L
    public static final Long MEDICO = 2L

    public static final String PERMISSAO_ADMIN = 'ROLE_ADMIN'
    public static final String PERMISSAO_MEDICO = 'ROLE_MEDICO'

    String nome
    String autoridade

    static constraints = {
        nome nullable: false, blank: false
        autoridade nullable: false, blank: false
    }

    static void criarPerfis() {
        withTransaction { transactionStatus ->
            Perfil perfil = get ADMIN

            if (perfil == null) {
                perfil = new Perfil(nome: 'ADMIN', autoridade: PERMISSAO_ADMIN)
                perfil.id = ADMIN
                try {
                    perfil.save()
                } catch (Exception ignored) {
                    transactionStatus.setRollbackOnly()
                }
            } else if (perfil.autoridade != PERMISSAO_ADMIN) {
                perfil.autoridade = PERMISSAO_ADMIN
                try {
                    perfil.save()
                } catch (Exception ignored) {
                    transactionStatus.setRollbackOnly()
                }
            }

            perfil = get MEDICO
            if (perfil == null) {
                perfil = new Perfil(nome: 'MÉDICO', autoridade: PERMISSAO_MEDICO)
                perfil.id = MEDICO
                try {
                    perfil.save()
                } catch (Exception ignored) {
                    transactionStatus.setRollbackOnly()
                }
            } else if (perfil.autoridade != PERMISSAO_MEDICO) {
                perfil.autoridade = PERMISSAO_MEDICO
                try {
                    perfil.save()
                } catch (Exception ignored) {
                    transactionStatus.setRollbackOnly()
                }
            }

            transactionStatus.flush()
        }
    }
}
