import { HTMLInputTypeAttribute } from "react"
import FindValue from "../../../functions/FindValue"
import IsNil from "../../../functions/IsNil"
import { Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField } from "@mui/material"

type Option = {
    Id : string
    Description : string
}

type FormFieldProps = {
    Data : any
}

export default class FormFieldBuilder // TODO input de data e hora
{
    /** Identificador do campo (uso no backend) */
    Id : string
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
        Data, // TODO Verificar se tem chave "Fields" e capturar data dela
    } : FormFieldProps) {
        this.Id = FindValue(Data, ["FieldId"])
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

    BuildField(disabled : boolean) { // TODO reajustar ordem de parametros dos inputs
        if (this.Type === "select") {
            let defaultSelectOptionDescription : string | undefined = undefined

            if (!IsNil(this.DefaultOptionId))
                defaultSelectOptionDescription = this.Options
                    .filter((opt) => opt.Id === this.DefaultOptionId)[0].Description

            return ( // FIXME não troca de valor
                <Select
                    labelId="demo-simple-select-label" // TODO revisar este parametro
                    id={ `${ this.Id }` }
                    key={ `${this.Id}` }
                    name={ `${ this.Name }` }
                    value={ this.DefaultOptionId }
                    label={ defaultSelectOptionDescription }
                    required={ this.Nullable }
                    disabled={ disabled }
                >
                    {
                        this.Options!.map((option, i) => {
                            return (
                                <MenuItem
                                    id={ `${ this.Id }_${ i }` }
                                    key={ `${ this.Id }_${ i }` }
                                    value={ option.Id }
                                    disabled={ disabled }
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
                    id={ `${ this.Id }_radio` }
                    name={ `${ this.Name }_radio` }
                    key={ `${ this.Id }_radio` }
                >
                    {
                        this.Options!.map((option, i) => {
                            return (
                                <FormControlLabel
                                    key={ `${this.Id}_radio_label_${ i }` }
                                    name={ `${ this.Name }_radio_label_${ i }` }
                                    value={ option.Id }
                                    label={ option.Description }
                                    disabled={ disabled }
                                    control={
                                        <Radio
                                            id={ `${ this.Id }_${ i }` }
                                            name={ `${ this.Name }_${ i }` }
                                            key={ `${ this.Id }_${ i }` }
                                            required={ !this.Nullable }
                                            disabled={ disabled }
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
                        id={ `${ this.Id }_switch` }
                        name={ `${ this.Name }_switch` }
                        key={ `${ this.Id }_switch` }
                        disabled={ disabled }
                        control={
                            <Switch
                                id={ this.Id }
                                name={ this.Name }
                                key={ this.Id }
                                required={ !this.Nullable }
                                disabled={ disabled }
                            />
                        }
                    />
                )
            }

            return (
                <Switch
                    key={ this.Id }
                    id={ this.Id }
                    name={ this.Name }
                    required={ !this.Nullable }
                    disabled={ disabled }
                />
            )
        }

        if (this.Type === "checkbox") {
            if (!IsNil(this.PlaceHolder)) {
                return (
                    <FormControlLabel
                        id={ `${ this.Id }_checkbox` }
                        name={ `${ this.Name }_checkbox` }
                        key={ `${ this.Id }_checkbox` }
                        label={ this.PlaceHolder }
                        disabled={ disabled }
                        control={
                            <Checkbox
                                id={ this.Id }
                                key={ this.Id }
                                name={ this.Name }
                                required={ !this.Nullable }
                                disabled={ disabled }
                            />
                        }
                    />
                )
            }
            return (
                <Checkbox
                    id={ this.Id }
                    key={ this.Id }
                    name={ this.Name }
                    required={ !this.Nullable }
                    disabled={ disabled }
                />
            )
        }

        return (
            <TextField
                id={ this.Id }
                key={ this.Id }
                name={ this.Name }
                helperText={ this.PlaceHolder }
                required={ !this.Nullable }
                type={ this.Type }
                label={ this.Name }
                maxRows={ this.MaxLen }
                disabled={ disabled }
            />
        )
    }
}