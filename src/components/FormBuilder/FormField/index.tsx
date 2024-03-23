import FormFieldBuilder from "./FormFieldBuilder"

type FormFieldProps = {
    FormField : FormFieldBuilder,
    Disabled : boolean
}

export default function FormField({
    FormField,
    Disabled,
} : FormFieldProps) {
    return FormField.BuildField(Disabled)
}