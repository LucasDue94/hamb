package hamb

class Perfil {
    public static final Long ADMIN = 1L
    public static final Long MEDICO = 2L
    String nome

    static constraints = {
        nome nullable: false, blank: false
    }

    static void criarPerfis() {
        withTransaction { transactionStatus ->
            if (!exists(ADMIN)) {
                Perfil perfil = new Perfil(nome: 'ADMIN')
                perfil.id = ADMIN
                try {
                    perfil.save()
                } catch (Exception ignored) {
                    transactionStatus.setRollbackOnly()
                }
            }

            if (!exists(MEDICO)) {
                Perfil perfil = new Perfil(nome: 'MÉDICO')
                perfil.id = MEDICO
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
