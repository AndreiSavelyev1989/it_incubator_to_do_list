import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    changeValue: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
        props.changeValue(title)
    }

    const activatedVeiwMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                onBlur={activatedVeiwMode}
                autoFocus
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={activatedEditMode}>{props.value}</span>
    )

}