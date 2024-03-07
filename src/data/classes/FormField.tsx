import { HTMLInputTypeAttribute } from "react"
import FindValue from "../../functions/FindValue"
import IsNil from "../../functions/IsNil"

type Option = {
    Id : number,
    Description : string,
}

export default class FormField
{
    FieldId : string
    Name : string
    Type : HTMLInputTypeAttribute
    PlaceHolder : string
    MaxLen : number
    Nullable : boolean
    Options : Option[] | null
    NeedsSecondConfirmation : boolean

    constructor(data : any) {
        this.FieldId = FindValue(data, ["FieldId"])
        this.Name = FindValue(data, ["Name"])
        this.Type = FindValue(data, ["Type"])
        this.PlaceHolder = FindValue(data, ["PlaceHolder"]) ?? ""
        const maxLen = Number.parseInt(FindValue(data, ["MaxLen"]))
        this.MaxLen = maxLen === 999
            ? Infinity
            : maxLen
        this.Nullable = FindValue(data, ["Nullable"]) ?? false
        this.NeedsSecondConfirmation = FindValue(data, ["NeedsSecondConfirmation"]) ?? false
        this.Options = null
        this.DefineOptions(data)
    }

    private DefineOptions(data : any) {
        const options = FindValue(data, ["Options"])

        if (IsNil(options))
            return

        (options as Option[]).map(option => {
            return this.Options?.push({
                Description: option.Description,
                Id: option.Id,
            })
        })
    }

    BuildField() {
        if (this.Type === "select") {
            return (
                <select
                    name={ this.FieldId }
                    key={ this.FieldId }
                    id={ this.FieldId }
                >
                    { this.Options!.map(option => {
                        return (
                            <option
                                value={ option.Id }
                                key={ option.Id }
                            >
                                { option.Description }
                            </option>
                        )
                    })}
                </select>
            )
        }

        if (this.MaxLen === Infinity) {
            return (
                <div key={ `${this.FieldId}_input` }>
                    <label htmlFor={ this.Name }>
                        { this.Name }
                    </label>
                    <input
                        type={ this.Type }
                        placeholder={ this.PlaceHolder }
                        name={ this.Name }
                        required={ !this.Nullable }
                        id={ this.FieldId }
                    />
                </div>
            )
        }

        return (
            <div key={ `${this.FieldId}_input` }>
                <label htmlFor={ this.Name }>
                    { this.Name }
                </label>
                <input
                    type={ this.Type }
                    placeholder={ this.PlaceHolder }
                    maxLength={ this.MaxLen }
                    max={ this.MaxLen }
                    name={ this.Name }
                    required={ !this.Nullable }
                    id={ this.FieldId }
                />
            </div>
        )
    }
}