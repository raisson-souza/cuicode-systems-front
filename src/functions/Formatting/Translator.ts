export default function KnownTranslation(prop : string) : string {
    switch (prop) {
        case "Root":
            return "Root"
        case "Adm":
            return "Administrador"
        case "Member":
            return "Membro"
        case "Guest":
            return "Convidado"
        case "Male":
            return "Masculino"
        case "Female":
            return "Feminino"
        default:
            return prop;
    }
}