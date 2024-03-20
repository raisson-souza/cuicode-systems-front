import React from "react"
import FindValue from "../../functions/FindValue"
import IsNil from "../../functions/IsNil"
import FormField from "./FormField"
import { Button } from "@mui/material"

type FormBuilderProps = { // TODO parametros iniciando maiusculo
    Data : any[],
    FormId : string,
    FormSubmitButtonMsg? : string,
}

type FormFieldBasic = {
    Id : string
    Value : any
    Name : string
    Type : string
    OptionsLen? : number
    MaxLen : number
}

/*
Componente que recebe os dados dos campos e monta o form
*/

export default class FormBuilder
{
    /** Lista de campos de um form. */
    Fields : FormField[]
    /** Lista de ID e nome dos campos.  */
    FieldsNames : FormFieldBasic[] // TODO mudar nome
    /** ID do botão de submit do form. */
    FormId : string
    /** Mensagem no botão de submit */
    FormSubmitButtonMsg : string
    /** Botão de submit para uso de desabilitação */
    SubmitButtonFormFieldBasic : FormFieldBasic

    constructor({
        Data,
        FormId,
        FormSubmitButtonMsg = "Enviar",
    } : FormBuilderProps) {
        this.FormId = FormId
        this.FormSubmitButtonMsg = FormSubmitButtonMsg

        this.Fields = []
        this.FieldsNames = []

        Data.forEach(_field => {
            const field = new FormField({
                Data: _field,
            })
            this.FieldsNames.push({
                Id: field.FieldId,
                Name: field.Name,
                Type: field.Type,
                Value: undefined,
                OptionsLen: field.Options.length,
                MaxLen: field.MaxLen,
            })
            this.Fields.push(field)
        })

        this.SubmitButtonFormFieldBasic = {
            Id: `${ this.FormId }_submit`,
            Name: "",
            Type: "submit",
            Value: undefined,
            OptionsLen: 0
        } as FormFieldBasic
    }

    BuildForm(fetchApi : (body : FormFieldBasic[]) => void) {
        /** Função que habilita / desabilita um node. */
        const disableInputAction = (formField : FormFieldBasic, action : boolean = true) => {
            if (formField.Type === "radio") {
                for (let i = 0; i < formField.OptionsLen!; i++) {
                    const node = document.getElementById(`${ formField.Id }_${ i }`) as any
                    node.disabled = action
                }
                return
            }
            const node = document.getElementById(formField.Id) as any
            node.disabled = action
        }

        /** Recebe a função a ser executada após o submit. */
        const submitForm = async (event : React.FormEvent) => {
            event.preventDefault()
            disableInputAction(this.SubmitButtonFormFieldBasic)

            // Armazena os campos puros do NODE.
            const fields = (event.target as any).elements as HTMLFormControlsCollection[]

            this.FieldsNames.forEach((fieldName, i) => {
                let value : any = undefined

                switch (fieldName.Type) {
                    case "radio":
                        const radioFieldsControls : FormFieldBasic[] = []

                        // O "radio" não possui obj padrão no return do form event
                        // necessita buscar individualmente seus controles
                        // exemplo; Name_0 Name_1
                        for (let i = 0; i < fieldName.OptionsLen!; i++) {
                            const name = `${ fieldName.Name }_${ i }`

                            const foundField = FindValue(fields, [name])

                            // Caso o valor do radio encontrado NÃO esteja marcado, seu valor será undefined
                            value = this.DefineFieldNameSubmitValue(fieldName.Type, foundField)

                            radioFieldsControls.push({
                                ...fieldName,
                                Name: name,
                                Value: value
                            })
                        }

                        // Apenas o radio marcado possui valor, por isso, apenas este é extraido
                        const radioFieldValue = radioFieldsControls
                            .filter(radioFieldControl => !IsNil(radioFieldControl.Value) )
                            .map(radioFieldControlFiltered => { return radioFieldControlFiltered.Value} )[0]

                        value = radioFieldValue
                        break
                    default:
                        const foundField = FindValue(fields, [fieldName.Name])
                        value = this.DefineFieldNameSubmitValue(fieldName.Type, foundField)
                        break
                }

                this.FieldsNames[i].Value = value
            })

            const formValidation = this.ValidateForm()

            if (!formValidation)
                return

            // Desabilita todos os campos, chama a função de submit e depois habilita novamente.
            this.FieldsNames.forEach(_formFieldValue => {
                disableInputAction(_formFieldValue)
            })

            await fetchApi(this.FieldsNames)

            this.FieldsNames.forEach(_formFieldValue => {
                disableInputAction(_formFieldValue, false)
            })

            disableInputAction(this.SubmitButtonFormFieldBasic, false)
        }

        return (
            <form
                onSubmit={ submitForm }
                id={ this.FormId }
            >
                {
                    this.Fields!.map(field => {
                        return field.BuildField()
                    })
                }
                <Button
                    variant="contained"
                    color="success"
                    id={ `${ this.FormId }_submit` }
                    type="submit"
                >
                    { this.FormSubmitButtonMsg }
                </Button>
            </form>
        )
    }

    /** Captura o valor do controle */
    private DefineFieldNameSubmitValue(type : string, field : any) {
        switch (type) {
            case "checkbox":
            case "switch":
                return field.checked
            case "radio":
                return field.checked
                    ? field.value
                    : undefined
            default:
                return field.value
        }
    }

    private ValidateForm() : boolean { // FIXME Form não responde após primeiro erro
        try {
            console.log('validateForm')
            this.FieldsNames.forEach(fieldName => {
                if (String(fieldName.Value).length > fieldName.MaxLen)
                    throw new Error(`O campo ${ fieldName.Name } ultrapassou o limite de ${ fieldName.MaxLen } caracteres.`)
            })
            return true
        }
        catch (ex) {
            alert((ex as Error).message)
            return false
        }
    }
}

export type { FormFieldBasic }