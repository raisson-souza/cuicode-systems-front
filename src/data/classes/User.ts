import FindValue from "../../functions/FindValue"

export default class User
{
    Id? : number
    BirthDate? : Date
    Email? : string
    EmailAproved? : boolean
    ModifiedBy? : number
    Name? : string
    Password? : string
    PasswordHint? : string
    PermissionLevelId? : number
    PermissionLevel? : string
    Phone? : string
    PhotoBase64? : string
    RecoveryEmail? : string
    SexId? : number
    Sex? : string
    Username? : string

    constructor(data : any) {
        this.Id = Number.parseInt(FindValue(data, ["Id", "id"]))
        this.BirthDate = new Date(FindValue(data, ["Birthdate", "birthdate"]))
        this.Email = FindValue(data, ["Email", "email"])
        this.EmailAproved = FindValue(data, ["EmailAproved", "email_approved"])
        this.ModifiedBy = FindValue(data, ["ModifiedBy", "modified_by"])
        this.Name = FindValue(data, ["Name", "name"])
        this.Password = FindValue(data, ["Password", "password"])
        this.PasswordHint = FindValue(data, ["PasswordHint", "password_hint"])
        this.PermissionLevelId = Number.parseInt(FindValue(data["PermissionLevel"] ?? data["permission_level"], ["Value", "value"]))
        this.PermissionLevel = FindValue(data["PermissionLevel"] ?? data["permission_level"], ["Description", "description"])
        this.Phone = FindValue(data, ["Phone", "phone"])
        this.PhotoBase64 = FindValue(data, ["PhotoBase64", "photo_base_64"])
        this.RecoveryEmail = FindValue(data, ["RecoveryEmail", "recovery_email"])
        this.SexId = Number.parseInt(FindValue(data["Sex"] ?? data["sex"], ["Value", "value"]))
        this.Sex = FindValue(data["Sex"] ?? data["sex"], ["Description", "description"])
        this.Username = FindValue(data, ["Username", "username"])
    }
}