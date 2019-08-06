package hamb.auth

import grails.events.annotation.gorm.Listener
import grails.plugin.springsecurity.SpringSecurityService
import groovy.transform.CompileStatic
import hamb.Usuario
import org.grails.datastore.mapping.engine.event.AbstractPersistenceEvent
import org.grails.datastore.mapping.engine.event.PreInsertEvent
import org.grails.datastore.mapping.engine.event.PreUpdateEvent
import org.springframework.beans.factory.annotation.Autowired

@CompileStatic
class CodificadorSenha {

    @Autowired
    SpringSecurityService springSecurityService

    @Listener(Usuario)
    void onPreInsertEvent(PreInsertEvent evento) {
        codificaSenhaParaEvento evento
    }

    @Listener(Usuario)
    void onPreUpdateEvent(PreUpdateEvent evento) {
        codificaSenhaParaEvento evento
    }

    private void codificaSenhaParaEvento(AbstractPersistenceEvent evento) {
        if (evento.entityObject instanceof Usuario) {
            Usuario u = evento.entityObject as Usuario
            if (u.senha && ((evento instanceof PreInsertEvent) ||
                    (evento instanceof PreUpdateEvent && u.isDirty('senha')))) {
                String senhaCodificada = springSecurityService?.passwordEncoder ?
                        springSecurityService.encodePassword(u.senha) : u.senha
                evento.entityAccess.setProperty 'senha', senhaCodificada
            }
        }
    }
}
