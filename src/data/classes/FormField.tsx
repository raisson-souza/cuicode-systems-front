import { HTMLInputTypeAttribute } from "react"
import FindValue from "../../functions/FindValue"
import IsNil from "../../functions/IsNil"
import { Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField } from "@mui/material"

type Option = {
    Id : string
    Description : string
}

type FormFieldProps = {
    Data : any
}

export default class FormField
{
    /** Identificador do campo (uso no backend) */
    FieldId : string
    /** Título do campo e identificador do controle */
    Name : string
    /** Tipo de input */
    Type : HTMLInputTypeAttribute
    /** Exemplo de valor para o campo */
    PlaceHolder : string
    /** Tamanho máximo para o campo */
    MaxLen : number
    /** Campo nullable */
    Nullable : boolean
    /** Opções de escolha do campo caso SELECT ou RADIO */
    Options : Option[]
    /** Opção default de escolha */
    DefaultOptionId? : string
    /** Necessita de confirmação */
    NeedsSecondConfirmation : boolean // TODO Implementar

    constructor({ // TODO Revisar valores padrões
        Data,
    } : FormFieldProps) {
        this.FieldId = FindValue(Data, ["FieldId"])
        this.Name = FindValue(Data, ["Name"])
        this.Type = FindValue(Data, ["Type"])
        this.PlaceHolder = FindValue(Data, ["PlaceHolder"]) ?? ""
        const maxLen = Number.parseInt(FindValue(Data, ["MaxLen"]))
        this.MaxLen = maxLen === 999 || IsNil(maxLen)
            ? Infinity
            : maxLen
        this.Nullable = FindValue(Data, ["Nullable"]) ?? false
        this.NeedsSecondConfirmation = FindValue(Data, ["NeedsSecondConfirmation"]) ?? false
        this.Options = []
        this.DefineOptions(Data)
        const defaultOptionId = FindValue(Data, ["DefaultOptionId"])
        this.DefaultOptionId = !IsNil(defaultOptionId)
            ? defaultOptionId
            : this.Options.length > 0
                ? this.Options[0].Id
                : undefined
    }

    private DefineOptions(data : any) : void {
        const options : Option[] = FindValue(data, ["Options"])

        if (IsNil(options))
            return

        this.Options = options
    }

    BuildField() { // TODO reajustar ordem de parametros
        if (this.Type === "select") {
            let defaultSelectOptionDescription : string | undefined = undefined

            if (!IsNil(this.DefaultOptionId))
                defaultSelectOptionDescription = this.Options
                    .filter((opt) => opt.Id === this.DefaultOptionId)[0].Description

            return (
                <Select
                    labelId="demo-simple-select-label" // TODO revisar este parametro
                    id={ `${ this.FieldId }` }
                    key={ `${this.FieldId}` }
                    name={ `${ this.Name }` }
                    value={ this.DefaultOptionId }
                    label={ defaultSelectOptionDescription }
                    required={ this.Nullable }
                >
                    {
                        this.Options!.map((option, i) => {
                            return (
                                <MenuItem
                                    id={ `${ this.FieldId }_${ i }` }
                                    key={ `${ this.FieldId }_${ i }` }
                                    value={ option.Id }
                                >
                                    { option.Description }
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            )
        }

        if (this.Type === "radio") {
            return (
                <RadioGroup
                    defaultValue={ this.DefaultOptionId }
                    id={ `${ this.FieldId }_radio` }
                    name={ `${ this.Name }_radio` }
                    key={ `${ this.FieldId }_radio` }
                >
                    {
                        this.Options!.map((option, i) => {
                            return (
                                <FormControlLabel
                                    key={ `${this.FieldId}_radio_label_${ i }` }
                                    name={ `${ this.Name }_radio_label_${ i }` }
                                    value={ option.Id }
                                    label={ option.Description }
                                    control={
                                        <Radio
                                            id={ `${ this.FieldId }_${ i }` }
                                            name={ `${ this.Name }_${ i }` }
                                            key={ `${ this.FieldId }_${ i }` }
                                            required={ !this.Nullable }
                                        />
                                    }
                                />
                            )
                        })
                    }
                </RadioGroup>
            )
        }

        if (this.Type === "switch") {
            if (!IsNil(this.PlaceHolder)) {
                return (
                    <FormControlLabel
                        label={ this.PlaceHolder }
                        id={ `${ this.FieldId }_switch` }
                        name={ `${ this.Name }_switch` }
                        key={ `${ this.FieldId }_switch` }
                        control={
                            <Switch
                                id={ this.FieldId }
                                name={ this.Name }
                                key={ this.FieldId }
                                required={ !this.Nullable }
                            />
                        }
                    />
                )
            }

            return (
                <Switch
                    key={ this.FieldId }
                    id={ this.FieldId }
                    name={ this.Name }
                    required={ !this.Nullable }
                />
            )
        }

        if (this.Type === "checkbox") {
            if (!IsNil(this.PlaceHolder)) {
                return (
                    <FormControlLabel
                        id={ `${ this.FieldId }_checkbox` }
                        name={ `${ this.Name }_checkbox` }
                        key={ `${ this.FieldId }_checkbox` }
                        label={ this.PlaceHolder }
                        control={
                            <Checkbox
                                id={ this.FieldId }
                                key={ this.FieldId }
                                name={ this.Name }
                                required={ !this.Nullable }
                            />
                        }
                    />
                )
            }
            return (
                <Checkbox
                    id={ this.FieldId }
                    key={ this.FieldId }
                    name={ this.Name }
                    required={ !this.Nullable }
                />
            )
        }

        return (
            <TextField
                id={ this.FieldId }
                key={ this.FieldId }
                name={ this.Name }
                helperText={ this.PlaceHolder }
                required={ !this.Nullable }
                type={ this.Type }
                label={ this.Name }
                maxRows={ this.MaxLen }
            />
        )
    }
}