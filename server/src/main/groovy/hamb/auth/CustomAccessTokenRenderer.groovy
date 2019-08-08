package hamb.auth

import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.rendering.AccessTokenJsonRenderer
import groovy.json.JsonBuilder

class CustomAccessTokenRenderer implements AccessTokenJsonRenderer {

    @Override
    String generateJson(AccessToken accessToken) {
        UserDetail principal = accessToken.principal as UserDetail
        
        Map response = [
                id: principal.id,
                nome: principal.nome,
                crm: principal.crm,
                perfil: principal.perfil,
                login: principal.username,
                access_token: accessToken.accessToken,
                roles: principal.authorities.collect{ it.authority }
        ]

        return new JsonBuilder(response).toPrettyString()
    }
}
