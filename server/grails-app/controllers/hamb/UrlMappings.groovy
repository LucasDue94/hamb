package hamb

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')


        get "/forgot/$id/$token(.$format)?"(controller: "forgot", action: "show")
        put "/forgot/$id/$token(.$format)?"(controller: "forgot", action: "update")
        put "/usuario/onOff/$id(.$format)?"(controller: "usuario", action: "onOff")
    }
}
