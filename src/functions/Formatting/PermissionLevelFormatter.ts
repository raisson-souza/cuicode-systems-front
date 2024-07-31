export default function PermissionLevelFormatter(level? : string) : string {
    switch (level) {
        case "Guest":
            return "convidado"
        case "Member":
            return "membro"
        case "Adm":
            return "administrador"
        case "Root":
            return "administrador root"
        default:
            return ""
    }
}