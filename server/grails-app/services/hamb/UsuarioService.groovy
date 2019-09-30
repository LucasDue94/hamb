package hamb

import grails.gorm.services.Service
import grails.gorm.transactions.Transactional

@Service(Usuario)
abstract class UsuarioService {

    abstract Usuario get(Serializable id)

    List<Usuario> list(Map args, String termo) {
        def criteria = Usuario.createCriteria()
        List<Usuario> usuarioList = (List<Usuario>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('crm', "%${termo}%")
                    ilike('nome', "%${termo}%")
                    ilike('login', "%${termo}%")
                }
            }
            order("ativo","desc")
            order("nome","asc")
        }
        return usuarioList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Usuario save(Usuario usuario)

    void onOff(Usuario usuario) {
        usuario.ativo = !usuario.ativo
        usuario.save flush: true
    }

    @Transactional
    void gerarSenhasPadrao() {
        final String DEFAULT_ENCRYPTION_PREFIX = '{bcrypt}$2a$10$%'

        Usuario.findAllBySenhaNotLike(DEFAULT_ENCRYPTION_PREFIX).each {
            it.senha = it.login
            it.save()
        }
    }

}