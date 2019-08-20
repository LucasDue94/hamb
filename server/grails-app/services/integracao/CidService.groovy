package integracao

import grails.gorm.services.Service
import hamb.Usuario
import org.hibernate.sql.JoinType

@Service(Cid)
abstract class CidService {

    abstract Cid get(String id)

    List<Cid> list(Usuario usuario, Map args) {
        if (usuario != null && usuario.id != null) {
            String sort = args.sort ?: 'u.contadorUso'
            String sortOrder = args.order ?: 'desc'

            if (args.containsKey('sort') && !args.containsKey('order')) sortOrder = 'asc'

            def criteria = Cid.createCriteria()
            return criteria.list(args) {
                createAlias 'usuarios', 'u', JoinType.LEFT_OUTER_JOIN

                or {
                    eq 'u.usuario', usuario
                    isNull 'u.usuario'
                }

                if (!args.containsKey('sort')) {
                    // Torna os cids já utilizados 'maiores' que os que nunca foram usados
                    order 'u.usuario', 'asc'
                    order 'diagnostico'
                }
                order sort, sortOrder
            } as List<Cid>
        } else {
            return Cid.list(args)
        }
    }

    abstract Long count()
}