package hamb

class Perfil {
    public static final Long ADMIN = 1L
    public static final Long MEDICO = 2L
    String nome

    static constraints = {
        nome nullable: false, blank: false
    }

    static void criarPerfis() {

        if (!exists(ADMIN)) {
            Perfil perfil = new Perfil(nome: 'ADMIN')
            perfil.id = ADMIN
            perfil.save()
        }

        if (!exists(MEDICO)) {
            Perfil perfil = new Perfil(nome: 'MÉDICO')
            perfil.id = MEDICO
            perfil.save()
        }
    }
}
