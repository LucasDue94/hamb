enum Origem {
    CONSULTA('I' as Character),
    RETORNO('L' as Character)

    final Character id
    Origem(Character id) { this.id = id }
}
