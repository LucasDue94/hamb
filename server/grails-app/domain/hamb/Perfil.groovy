package hamb

class Perfil {
    public static final String ADMIN = 'ADMIN'
    public static final String MEDICO = 'MEDICO'
    static belongsTo = [usuario: Usuario]

    static constraints = {
    }
}
